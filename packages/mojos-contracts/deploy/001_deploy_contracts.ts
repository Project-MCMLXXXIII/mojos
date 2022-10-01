import { address } from './../test/utils';
import { default as MojosAuctionHouseABI } from '../abi/contracts/MojosAuctionHouse.sol/MojosAuctionHouse.json';
import { Interface } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Contract as EthersContract } from 'ethers';
import { DeployFunction } from 'hardhat-deploy/types';

const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json');

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, run } = hre;
  const { deploy } = deployments;

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

  let MojosAuctionHouseInstance: EthersContract;

  const MOJOS_DAO_ADDRESS = '0xBC4B7840DF8f2232239f30955042844e06F9527b';
  const WETH_ADDRESS = '0xc778417e063141139fce010982780140aa0cd5ab';
  const AUCTION_TIME_BUFFER = 5 * 60;
  const AUCTION_RESERVE_PRICE = 1;
  const AUCTION_MIN_INCREMENT_BID_PERCENTAGE = 5;
  const AUCTION_DURATION = 60 * 60 * 12;
  const MULTISIG_ADDRESS = '0xBC4B7840DF8f2232239f30955042844e06F9527b';

  const TIMELOCK_DELAY = 60 * 60 * 24 * 2;

  const VOTING_PERIOD = 4 * 60 * 24 * 3;
  const VOTING_DELAY = 1;
  const PROPOSAL_THRESHOLD_BPS = 500;
  const QUORUM_VOTES_BPS = 1_000;

  const NFTDescriptorLibrary = await deploy('NFTDescriptor', {
    from: deployer.address,
  });

  const mojosDescriptor = await deploy('MojosDescriptor', {
    from: deployer.address,
    libraries: {
      NFTDescriptor: NFTDescriptorLibrary.address as string,
    },
  });

  const mojosSeeder = await deploy('MojosSeeder', {
    from: deployer.address,
  });

  const lzEndpointAddress = LZ_ENDPOINTS[hre.network.name];

  const mojosToken = await deploy('UniversalMojo', {
    from: deployer.address,
    args: [
      MOJOS_DAO_ADDRESS,
      expectedAuctionHouseProxyAddress,
      mojosDescriptor.address,
      mojosSeeder.address,
      lzEndpointAddress,
      0,
      6000,
    ],
  });

  console.log(
    `MojosTokenParams ${MOJOS_DAO_ADDRESS} - ${expectedMojosDAOProxyAddress} - ${mojosDescriptor.address} - ${mojosSeeder.address} - ${lzEndpointAddress} - 0 - 6000`,
  );

  const mojosAuctionHouse = await deploy('MojosAuctionHouse', {
    from: deployer.address,
  });

  // const MojosAuctionHouse = await ethers.getContractFactory('MojosAuctionHouse');

  // const mojosAuctionHouse = await MojosAuctionHouse.deploy();

  // MojosAuctionHouseInstance = await mojosAuctionHouse.deployed();

  const mojosAuctionHouseProxyAdmin = await deploy('MojosAuctionHouseProxyAdmin', {
    from: deployer.address,
  });

  // const mojosAuctionHouseProxy = await deploy('MojosAuctionHouseProxy', {
  //   from: deployer.address,
  //   proxy:true,
  //   args: [
  //     mojosAuctionHouse.address,
  //     mojosAuctionHouseProxyAdmin.address,
  //     new Interface(MojosAuctionHouseABI).encodeFunctionData('initialize', [
  //       mojosToken.address,
  //       mojosToken.address,
  //       WETH_ADDRESS,
  //       AUCTION_TIME_BUFFER,
  //       AUCTION_RESERVE_PRICE,
  //       AUCTION_MIN_INCREMENT_BID_PERCENTAGE,
  //       AUCTION_DURATION,
  //       MULTISIG_ADDRESS,
  //     ]),
  //   ],
  // });

  const MojosAuctionHouseProxy = await ethers.getContractFactory('MojosAuctionHouseProxy');

  const mojosAuctionHouseProxy = await MojosAuctionHouseProxy.deploy(
    mojosAuctionHouse.address,
    mojosAuctionHouseProxyAdmin.address,
    new Interface(MojosAuctionHouseABI).encodeFunctionData('initialize', [
      mojosToken.address,
      WETH_ADDRESS,
      AUCTION_TIME_BUFFER,
      AUCTION_RESERVE_PRICE,
      AUCTION_MIN_INCREMENT_BID_PERCENTAGE,
      AUCTION_DURATION,
      MULTISIG_ADDRESS,
    ]),
  );

  await mojosAuctionHouseProxy.deployed();

  // const mojosAuctionHouseProxy = await deploy('MojosAuctionHouseProxy', {
  //   from: deployer.address,
  //   args: [
  //     mojosAuctionHouse.address,
  //     mojosAuctionHouseProxyAdmin.address,
  //     new Interface(MojosAuctionHouseABI).encodeFunctionData('initialize', [
  //       mojosToken.address,
  //       WETH_ADDRESS,
  //       AUCTION_TIME_BUFFER,
  //       AUCTION_RESERVE_PRICE,
  //       AUCTION_MIN_INCREMENT_BID_PERCENTAGE,
  //       AUCTION_DURATION,
  //       MULTISIG_ADDRESS,
  //     ]),
  //   ],
  // });

  const mojosDAOExecutor = await deploy('MojosDAOExecutor', {
    from: deployer.address,
    args: [expectedMojosDAOProxyAddress, TIMELOCK_DELAY],
  });

  const mojosDAOLogicV1 = await deploy('MojosDAOLogicV1', {
    from: deployer.address,
  });

  const mojosDAOProxy = await deploy('MojosDAOProxy', {
    from: deployer.address,
    args: [
      mojosDAOExecutor.address,
      mojosToken.address,
      MOJOS_DAO_ADDRESS,
      mojosDAOExecutor.address,
      mojosDAOLogicV1.address,
      VOTING_PERIOD,
      VOTING_DELAY,
      PROPOSAL_THRESHOLD_BPS,
      QUORUM_VOTES_BPS,
    ],
  });

  console.log(`Contracts deployed to ${network.name} using address ${deployer.address}`);
  console.log(`---`);
  console.log(`NFTDescriptor Library deployed to ${NFTDescriptorLibrary.address}`);
  console.log(`---`);
  console.log(`MojosDescriptor deployed to ${mojosDescriptor.address}`);
  console.log(`---`);
  console.log(`MojosSeeder deployed to ${mojosSeeder.address}`);
  console.log(`---`);
  console.log(`MojosToken deployed to ${mojosToken.address}`);
  console.log(`---`);
  console.log(`MojosAuctionHouse deployed to ${mojosAuctionHouse.address}`);
  console.log(`---`);
  console.log(`MojosAuctionHouseProxyAdmin deployed to ${mojosAuctionHouseProxyAdmin.address}`);
  console.log(`---`);
  console.log(`MojosAuctionHouseProxy deployed to ${mojosAuctionHouseProxy.address}`);
  console.log(`---`);
  console.log(`MojosDAOExecutor deployed to ${mojosDAOExecutor.address}`);
  console.log(`---`);
  console.log(`MojosDAOLogicV1 deployed to ${mojosDAOLogicV1.address}`);
  console.log(`---`);
  console.log(`MojosDAOProxy deployed to ${mojosDAOProxy.address}`);
  console.log(`---`);

  await run('populate-descriptor', {
    nftDescriptor: NFTDescriptorLibrary.address,
    mojosDescriptor: mojosDescriptor.address,
  });

  const AUCTION_HOUSE = await ethers.getContractFactory('MojosAuctionHouse');

  const MojosAuctionHouse = await AUCTION_HOUSE.attach(mojosAuctionHouseProxy.address);

  let TX;

  TX = await MojosAuctionHouse.unpause({
    gasLimit: 1_000_000,
  });

  await TX.wait();

  const DESCRIPTOR_CONTRACT = await ethers.getContractFactory('MojosDescriptor', {
    libraries: {
      NFTDescriptor: NFTDescriptorLibrary.address as string,
    },
  });

  const MojosDescriptor = await DESCRIPTOR_CONTRACT.attach(mojosDescriptor.address);

  TX = await MojosDescriptor.transferOwnership(mojosDescriptor.address, {
    gasLimit: 1_000_000,
  });

  await TX.wait();

  const PROXY_ADMIN_CONTRACT = await ethers.getContractFactory('MojosAuctionHouseProxyAdmin');

  const ProxyAdmin = await PROXY_ADMIN_CONTRACT.attach(mojosAuctionHouseProxyAdmin.address);

  TX = await ProxyAdmin.transferOwnership(mojosDescriptor.address, {
    gasLimit: 1_000_000,
  });

  await TX.wait();

  TX = await MojosAuctionHouse.transferOwnership(mojosDescriptor.address, {
    gasLimit: 1_000_000,
  });

  await TX.wait();

  console.log(
    'Started the first auction and transferred ownership of the auction house to the executor.',
  );

  console.log(`*** Deploy Completed ✅ ***`);
};

module.exports.tags = ['Source'];
