import fs from 'fs';
import { task } from 'hardhat/config';

task('deploy-ci', 'Deploy contracts (automated by CI)')
  .addOptionalParam('mojosdao', 'The mojos DAO contract address')
  .addOptionalParam(
    'weth',
    'The WETH contract address',
    '0xc778417e063141139fce010982780140aa0cd5ab',
  )
  .setAction(async ({ mojosdao, weth }, { ethers, run }) => {
    const [deployer] = await ethers.getSigners();
    const contracts = await run('deploy-contracts', {
      weth,
      mojosDAO: mojosdao || deployer.address,
    });

    if (!fs.existsSync('logs')) {
      fs.mkdirSync('logs');
    }
    fs.writeFileSync(
      'logs/deploy.json',
      JSON.stringify({
        contractAddresses: {
          NFTDescriptor: contracts.NFTDescriptor.address,
          MojosDescriptor: contracts.MojosDescriptor.address,
          MojosSeeder: contracts.MojosSeeder.address,
          MojosToken: contracts.MojosToken.address,
        },
        gitHub: {
          // Get the commit sha when running in CI
          sha: process.env.GITHUB_SHA,
        },
      }),
      { flag: 'w' },
    );
  });
