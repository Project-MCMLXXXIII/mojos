import { address } from '../test/utils';
import { default as MojosAuctionHouseABI } from '../abi/contracts/MojosAuctionHouse.sol/MojosAuctionHouse.json';
import { Interface } from 'ethers/lib/utils';
import { ethers } from 'hardhat';
import { HardhatRuntimeEnvironment } from 'hardhat/types';
import { Console } from 'console';
import { Contract as EthersContract } from 'ethers';

const LZ_ENDPOINTS = require('../constants/layerzeroEndpoints.json');

module.exports = async function (hre: HardhatRuntimeEnvironment) {
  const { deployments, run } = hre;
  const { deploy } = deployments;

  const network = await ethers.provider.getNetwork();


  const AUCTION_HOUSE_PROXY_NONCE_OFFSET = 6;
  const GOVERNOR_N_DELEGATOR_NONCE_OFFSET = 9;

  const [deployer] = await ethers.getSigners();
  const nonce = await deployer.getTransactionCount();

  const expectedAuctionHouseProxyAddress = ethers.utils.getContractAddress({
    from: deployer.address,
    nonce: nonce + AUCTION_HOUSE_PROXY_NONCE_OFFSET,
  });

  const MOJOS_DAO_ADDRESS = '0xBC4B7840DF8f2232239f30955042844e06F9527b';

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
  console.log(`1 ${hre.network.name}`);
  const mojosToken = await deploy('UniversalMojo', {
    from: deployer.address,
    args: [
      MOJOS_DAO_ADDRESS,
      expectedAuctionHouseProxyAddress,
      mojosDescriptor.address,
      mojosSeeder.address,
      lzEndpointAddress,
      6001,
      12001,
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
  await run('populate-descriptor', {
    nftDescriptor: NFTDescriptorLibrary.address,
    mojosDescriptor: mojosDescriptor.address,
  });
  console.log(`*** Deploy Completed ✅ ***`);
};

module.exports.tags = ['Destination'];
