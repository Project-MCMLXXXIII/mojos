import { default as MojosAuctionHouseABI } from '../abi/contracts/MojosAuctionHouse.sol/MojosAuctionHouse.json';
import { Interface } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';
import promptjs from 'prompt';

promptjs.colors = true;
promptjs.message = '> ';
promptjs.delimiter = '';

type ContractName =
  | 'NFTDescriptor'
  | 'MojosDescriptor'
  | 'MojosSeeder'
  | 'MojosToken'
  | 'MojosAuctionHouse'
  | 'MojosAuctionHouseProxyAdmin'
  | 'MojosAuctionHouseProxy'
  | 'MojosDAOExecutor'
  | 'MojosDAOLogicV1'
  | 'MojosDAOProxy';

interface Contract {
  args?: (string | number | (() => string | undefined))[];
  address?: string;
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
}

task('deploy-contracts', 'Deploys NFTDescriptor, MojosDescriptor, MojosSeeder, and MojosToken')
  .addOptionalParam('mojosdao', 'The mojos DAO contract address', undefined, types.string)
  .addOptionalParam('weth', 'The WETH contract address', undefined, types.string)
  .addOptionalParam('auctionTimeBuffer', 'The auction time buffer (seconds)', 5 * 60, types.int)
  .addOptionalParam('auctionReservePrice', 'The auction reserve price (wei)', 1, types.int)
  .addOptionalParam(
    'auctionMinIncrementBidPercentage',
    'The auction min increment bid percentage (out of 100)',
    5,
    types.int,
  )
  .addOptionalParam('auctionDuration', 'The auction duration (seconds)', 60 * 60 * 24, types.int) // Default: 24 hours
  .addOptionalParam('timelockDelay', 'The timelock delay (seconds)', 60 * 60 * 24 * 2, types.int) // Default: 2 days
  .addOptionalParam('votingPeriod', 'The voting period (blocks)', 4 * 60 * 24 * 3, types.int) // Default: 3 days
  .addOptionalParam('votingDelay', 'The voting delay (blocks)', 1, types.int) // Default: 1 block
  .addOptionalParam('proposalThresholdBps', 'The proposal threshold (basis points)', 500, types.int) // Default: 5%
  .addOptionalParam('quorumVotesBps', 'Votes required for quorum (basis points)', 1_000, types.int) // Default: 10%
  .addOptionalParam(
    'multiSigFeeWallet',
    'MultiSig wallet for fees',
    '0x50779Ecf871ba1a1BD97a5C7379fd8e3c35b2abB',
  ) // Must change
  .setAction(async (args, { ethers }) => {
    const network = await ethers.provider.getNetwork();
    const proxyRegistryAddress =
      network.chainId === 1
        ? '0xa5409ec958c83c3f309868babaca7c86dcb077c1'
        : '0xf57b2c51ded3a29e6891aba85459d600256cf317';

    const AUCTION_HOUSE_PROXY_NONCE_OFFSET = 6;
    const GOVERNOR_N_DELEGATOR_NONCE_OFFSET = 9;

    const [deployer] = await ethers.getSigners();
    const nonce = await deployer.getTransactionCount();
    const expectedAuctionHouseProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: nonce + AUCTION_HOUSE_PROXY_NONCE_OFFSET,
    });
    const expectedMojosDAOProxyAddress = ethers.utils.getContractAddress({
      from: deployer.address,
      nonce: nonce + GOVERNOR_N_DELEGATOR_NONCE_OFFSET,
    });
    const contracts: Record<ContractName, Contract> = {
      NFTDescriptor: {},
      MojosDescriptor: {
        libraries: () => ({
          NFTDescriptor: contracts['NFTDescriptor'].address as string,
        }),
      },
      MojosSeeder: {},
      MojosToken: {
        args: [
          args.mojosdao || deployer.address,
          expectedAuctionHouseProxyAddress,
          () => contracts['MojosDescriptor'].address,
          () => contracts['MojosSeeder'].address,
          proxyRegistryAddress,
        ],
      },
      MojosAuctionHouse: {
        waitForConfirmation: true,
      },
      MojosAuctionHouseProxyAdmin: {},
      MojosAuctionHouseProxy: {
        args: [
          () => contracts['MojosAuctionHouse'].address,
          () => contracts['MojosAuctionHouseProxyAdmin'].address,
          () =>
            new Interface(MojosAuctionHouseABI).encodeFunctionData('initialize', [
              contracts['MojosToken'].address,
              args.weth,
              args.auctionTimeBuffer,
              args.auctionReservePrice,
              args.auctionMinIncrementBidPercentage,
              args.auctionDuration,
              args.multiSigFeeWallet,
            ]),
        ],
      },
      MojosDAOExecutor: {
        args: [expectedMojosDAOProxyAddress, args.timelockDelay],
      },
      MojosDAOLogicV1: {
        waitForConfirmation: true,
      },
      MojosDAOProxy: {
        args: [
          () => contracts['MojosDAOExecutor'].address,
          () => contracts['MojosToken'].address,
          args.mojosdao || deployer.address,
          () => contracts['MojosDAOExecutor'].address,
          () => contracts['MojosDAOLogicV1'].address,
          args.votingPeriod,
          args.votingDelay,
          args.proposalThresholdBps,
          args.quorumVotesBps,
        ],
      },
    };

    let gasPrice = await ethers.provider.getGasPrice();
    const gasInGwei = Math.round(Number(ethers.utils.formatUnits(gasPrice, 'gwei')));

    promptjs.start();

    let result = await promptjs.get([
      {
        properties: {
          gasPrice: {
            type: 'integer',
            required: true,
            description: `${deployer.address} - ${network.chainId} - Enter a gas price (gwei)`,
            default: gasInGwei,
          },
        },
      },
    ]);

    gasPrice = ethers.utils.parseUnits(result.gasPrice.toString(), 'gwei');

    for (const [name, contract] of Object.entries(contracts)) {
      const factory = await ethers.getContractFactory(name, {
        libraries: contract?.libraries?.(),
      });

      const deploymentGas = await factory.signer.estimateGas(
        factory.getDeployTransaction(
          ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
          {
            gasPrice,
          },
        ),
      );
      const deploymentCost = deploymentGas.mul(gasPrice);

      console.log(
        `Estimated cost to deploy ${name}: ${ethers.utils.formatUnits(
          deploymentCost,
          'ether',
        )} FTM`,
      );

      result = await promptjs.get([
        {
          properties: {
            confirm: {
              type: 'string',
              description: 'Type "DEPLOY" to confirm:',
            },
          },
        },
      ]);

      if (result.confirm != 'DEPLOY') {
        console.log('Exiting');
        return;
      }

      try {
        console.log('Deploying...');
        const deployedContract = await factory.deploy(
          ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
          {
            gasPrice,
          },
        );

        // if (contract.waitForConfirmation) {
        await deployedContract.deployed();
        // }

        contracts[name as ContractName].address = deployedContract.address;

        console.log(`${name} contract deployed to ${deployedContract.address}`);
      } catch (error) {
        console.error(`Error Deploying ${error}`);
      }
    }

    return contracts;
  });
