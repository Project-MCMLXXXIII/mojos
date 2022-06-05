import { task, types } from 'hardhat/config';

const CHAIN_ID = require('../constants/chainIds.json');
const { getDeploymentAddresses } = require('../utils/readStatic');

task(
  "onftSend",
  "send an ONFT nftId from one chain to another",
)
  .addParam("targetNetwork", "the chainId to transfer to")
  .addParam("tokenId", "the tokenId of ONFT")
  .setAction(async function (taskArgs, hre) {
    
    const signers = await hre.ethers.getSigners();
    const owner = signers[0];
    const dstChainId = CHAIN_ID[taskArgs.targetNetwork];
    const tokenId = taskArgs.tokenId;
    const network = await hre.ethers.provider.getNetwork();
    const srcAddress = getDeploymentAddresses(network.chainId)['UniversalMojo'];
    const UniversalMojoNFT = await hre.ethers.getContractAt('UniversalMojo', srcAddress);
    console.log(`[source] exampleUniversalONFT.address: ${UniversalMojoNFT.address}`);

    let adapterParams = hre.ethers.utils.solidityPack(['uint16', 'uint256'], [1, 200000]); // default adapterParams example

    try {
      let tx = await(
        await UniversalMojoNFT.send(
          dstChainId,
          owner.address,
          tokenId,
          owner.address,
          hre.ethers.constants.AddressZero,
          adapterParams,
          {
            value: hre.ethers.utils.parseEther('1'),
          },
        )
      ).wait();
      console.log(`✅ [${hre.network.name}] send(${dstChainId}, ${tokenId})`);
      console.log(` tx: ${tx.transactionHash}`);
    } catch (e:any) {
      if (e.error.message.includes('Message sender must own the Universal Mojo.')) {
        console.log('*Message sender must own the Universal Mojo.*');
      } else if (e.error.message.includes('This chain is not a trusted source source.')) {
        console.log('*This chain is not a trusted source source.*');
      } else {
        console.log(e);
      }
    }
  });
