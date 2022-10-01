import { default as MojosAuctionHouseABI } from '../abi/contracts/MojosAuctionHouse.sol/MojosAuctionHouse.json';
import { Interface } from 'ethers/lib/utils';
import { task, types } from 'hardhat/config';
import promptjs from 'prompt';
import { Contract as EthersContract } from 'ethers';

const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json');

type ContractName =
  | 'NFTDescriptor'
  | 'MojosDescriptor'
  | 'MojosSeeder'
  | 'UniversalMojo';

interface Contract {
  args?: (string | number | (() => string | undefined))[];
  instance?: EthersContract;
  address?: string;
  libraries?: () => Record<string, string>;
  waitForConfirmation?: boolean;
}

task('deploy-only-bridge', 'Deploys NFTDescriptor, MojosDescriptor, MojosSeeder, and MojosToken')
  .addOptionalParam(
    'mojosdao',
    'The mojos DAO contract address',
    '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90',
    types.string,
  )
  .addOptionalParam(
    'weth',
    'The WETH contract address',
    '0x4200000000000000000000000000000000000006',
    types.string,
  )
  .addOptionalParam('auctionTimeBuffer', 'The auction time buffer (seconds)', 5 * 60, types.int)
  .addOptionalParam('auctionReservePrice', 'The auction reserve price (wei)', 1, types.int)
  .addOptionalParam(
    'auctionMinIncrementBidPercentage',
    'The auction min increment bid percentage (out of 100)',
    5,
    types.int,
  )
  .addOptionalParam('auctionDuration', 'The auction duration (seconds)', 60 * 60 * 12, types.int) // Default: 12 hours
  .addOptionalParam('timelockDelay', 'The timelock delay (seconds)', 60 * 60 * 24 * 2, types.int) // Default: 2 days
  .addOptionalParam('votingPeriod', 'The voting period (blocks)', 4 * 60 * 24 * 3, types.int) // Default: 3 days
  .addOptionalParam('votingDelay', 'The voting delay (blocks)', 1, types.int) // Default: 1 block
  .addOptionalParam('proposalThresholdBps', 'The proposal threshold (basis points)', 500, types.int) // Default: 5%
  .addOptionalParam('quorumVotesBps', 'Votes required for quorum (basis points)', 1_000, types.int) // Default: 10%
  .addOptionalParam(
    'multiSigFeeWallet',
    'MultiSig wallet for fees',
    '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90',
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

    const lzEndpointAddress = LZ_ENDPOINTS[network.name];

    const contracts: Record<ContractName, Contract> = {
      NFTDescriptor: { waitForConfirmation: true },
      MojosDescriptor: {
        libraries: () => ({
          NFTDescriptor: contracts['NFTDescriptor'].instance?.address as string,
        }),
      },
      MojosSeeder: {},

      UniversalMojo: {
        args: [
          args.mojosdao || deployer.address,
          expectedAuctionHouseProxyAddress,
          () => contracts['MojosDescriptor'].instance?.address,
          () => contracts['MojosSeeder'].instance?.address,
          proxyRegistryAddress,
          lzEndpointAddress,
          6001,
          12001,
        ],
      }
    };

    for (const [name, contract] of Object.entries(contracts)) {
      const factory = await ethers.getContractFactory(name, {
        libraries: contract?.libraries?.(),
      });

      const deployedContract = await factory.deploy(
        ...(contract.args?.map(a => (typeof a === 'function' ? a() : a)) ?? []),
      );

      if (contract.waitForConfirmation) {
        await deployedContract.deployed();
      }

      contracts[name as ContractName].instance = deployedContract;

      console.log(`${name} contract deployed to ${deployedContract.address}`);
    }

    return contracts;
  });
