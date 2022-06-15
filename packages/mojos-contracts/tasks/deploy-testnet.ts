import { TASK_COMPILE, TASK_NODE } from 'hardhat/builtin-tasks/task-names';
import { task } from 'hardhat/config';

task(
  'deploy-testnet',
  'deploy contracts, and execute setup transactions',
).setAction(async (_, { ethers, run }) => {
  // await run(TASK_COMPILE);

  // await Promise.race([run(TASK_NODE), new Promise(resolve => setTimeout(resolve, 20_000))]);

  const contracts = await run('deploy-contracts');

  await run('populate-descriptor', {
    nftDescriptor: contracts.NFTDescriptor.instance.address,
    mojosDescriptor: contracts.MojosDescriptor.instance.address,
  });

  await contracts.MojosAuctionHouse.instance
    .attach(contracts.MojosAuctionHouseProxy.instance.address)
    .unpause({
      gasLimit: 1_000_000,
    });

  // await run('create-proposal', {
  //   mojosDaoProxy: contracts.MojosDAOProxy.instance.address,
  // });

  console.log("---DONE---")

});
