import { TASK_COMPILE, TASK_NODE } from 'hardhat/builtin-tasks/task-names';
import { task } from 'hardhat/config';

task('deploy-testnet', 'deploy contracts, and execute setup transactions').setAction(
  async (_, { ethers, run }) => {
    // await run(TASK_COMPILE);

    // await Promise.race([run(TASK_NODE), new Promise(resolve => setTimeout(resolve, 20_000))]);

    const contracts = await run('deploy-contracts');

    await run('populate-descriptor', {
      nftDescriptor: contracts.NFTDescriptor.instance.address,
      mojosDescriptor: contracts.MojosDescriptor.instance.address,
    });

    const executorAddress = contracts.MojosDAOExecutor.instance.address;
    console.log(`Contracts ${JSON.stringify(contracts.MojosDAOExecutor.instance.address)}`);
    console.log(`DAO Executor Address ${executorAddress}`);

    // await contracts.MojosDescriptor.instance.transferOwnership(executorAddress);
    await contracts.UniversalMojo.instance.transferOwnership(executorAddress);
    await contracts.MojosAuctionHouseProxyAdmin.instance.transferOwnership(executorAddress);

    console.log(
      'Transferred ownership of the descriptor, token, and proxy admin contracts to the executor.',
    );
    await contracts.MojosAuctionHouse.instance
      .attach(contracts.MojosAuctionHouseProxy.instance.address)
      .unpause({
        gasLimit: 1_000_000,
      });

    // await contracts.MojosAuctionHouse.instance
    //   .attach(contracts.MojosAuctionHouseProxy.instance.address)
    //   .transferOwnership(executorAddress);
      
    console.log(
      'Started the first auction and transferred ownership of the auction house to the executor.',
    );

    // await run('create-proposal', {
    //   mojosDaoProxy: contracts.MojosDAOProxy.instance.address,
    // });

    console.log('---DONE---');
  },
);
