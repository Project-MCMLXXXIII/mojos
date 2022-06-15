import { task, types } from 'hardhat/config';

const CHAIN_ID = require('../constants/chainIds.json');
const { getDeploymentAddresses } = require('../utils/readStatic');

task(
  'onftSetTrustedRemote',
  'setTrustedRemote(chainId, sourceAddr) to allow the local contract to send/receive messages from known source contracts',
)
  .addParam('targetNetwork', 'the target network to let this instance receive messages from')
  // .setAction(async function (taskArgs, hre) {
  .setAction(async (taskArgs, hre) => {
    const dstChainId = CHAIN_ID[taskArgs.targetNetwork];
    const dstAddr = getDeploymentAddresses(taskArgs.targetNetwork)['UniversalMojo'];
    const network = await hre.ethers.provider.getNetwork();
    const srcAddress = getDeploymentAddresses(network.chainId)['UniversalMojo'];
    const UniversalMojoNFT = await hre.ethers.getContractAt('UniversalMojo', srcAddress);
    console.log(`[source] UniversalMojo.address: ${UniversalMojoNFT.address}`);

    // setTrustedRemote() on the local contract, so it can receive message from the source contract
    try {
      let tx = await (await UniversalMojoNFT.setTrustedRemote(dstChainId, dstAddr)).wait();
      console.log(`✅ [${hre.network.name}] setTrustedRemote(${dstChainId}, ${dstAddr})`);
      console.log(` tx: ${tx.transactionHash}`);
    } catch (e: any) {
      if (
        e.error.message.includes('The trusted source address has already been set for the chainId')
      ) {
        console.log('*trusted source already set*');
      } else {
        console.log(e);
      }
    }
  });
