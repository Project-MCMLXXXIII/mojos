import { task, types } from 'hardhat/config';

const CHAIN_ID = require('../constants/chainIds.json');
const { getDeploymentAddresses } = require('../utils/readStatic');

task('onftSend', 'send an ONFT nftId from one chain to another')
  .addParam('targetNetwork', 'the chainId to transfer to')
  .addParam('tokenId', 'the tokenId of ONFT')
  .setAction(async function (taskArgs, hre) {
    const signers = await hre.ethers.getSigners();
    console.log(JSON.stringify(signers));
    const owner = signers[0];
    const dstChainId = CHAIN_ID[taskArgs.targetNetwork];
    const tokenId = taskArgs.tokenId;
    const network = hre.network.name;
    const srcAddress = getDeploymentAddresses(network)['UniversalMojo'];
    const UniversalMojoNFT = await hre.ethers.getContractAt('UniversalMojo', srcAddress);
    console.log(`[source] exampleUniversalONFT.address: ${UniversalMojoNFT.address}`);

    let seed = await UniversalMojoNFT.seeds(tokenId);
    console.log(`Seed ${JSON.stringify(seed)}`);

    let adapterParams = hre.ethers.utils.solidityPack(['uint16', 'uint256'], [1, 200000]); // default adapterParams example

    console.log(`Owner ${owner.address}`);
    try {
      let estimateGasTX = await UniversalMojoNFT.estimateSendFee(
        dstChainId,
        owner.address,
        tokenId,
        false,
        adapterParams,
      );

      const gas = hre.ethers.utils.formatEther(hre.ethers.BigNumber.from(estimateGasTX[0]).mul(2).toString()).toString();
      console.log(`Estimated Gas ${gas}`);

      let tx = await(
        await UniversalMojoNFT.sendFrom(
          owner.address,
          dstChainId,
          owner.address,
          tokenId,
          owner.address,
          hre.ethers.constants.AddressZero,
          adapterParams,
          {
            value: hre.ethers.utils.parseEther(gas),
          },
        )
      ).wait();
      console.log(`✅ [${hre.network.name}] send(${dstChainId}, ${tokenId})`);
      console.log(` tx: ${tx.transactionHash}`);
    } catch (e: any) {
      // if (e.error.message.includes('Message sender must own the Universal Mojo.')) {
      //   console.log('*Message sender must own the Universal Mojo.*');
      // } else if (e.error.message.includes('This chain is not a trusted source source.')) {
      //   console.log('*This chain is not a trusted source source.*');
      // } else {
      console.log(e);
      // }
    }
  });
