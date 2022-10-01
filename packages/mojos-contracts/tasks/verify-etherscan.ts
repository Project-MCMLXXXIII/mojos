import { task } from 'hardhat/config';

type ContractName =
  | 'NFTDescriptor'
  | 'MojosDescriptor'
  | 'MojosSeeder'
  | 'UniversalMojo'
  | 'MojosAuctionHouse'
  | 'MojosAuctionHouseProxyAdmin'
  | 'MojosDAOExecutor'
  | 'MojosDAOLogicV1'
  | 'MojosDAOProxy'
  | 'MojosAuctionHouseProxy';

interface VerifyArgs {
  address: string;
  constructorArguments?: (string | number)[];
  libraries?: Record<string, string>;
}

const contracts: Record<ContractName, VerifyArgs> = {
  NFTDescriptor: {
    address: '0x9644aF501919CeF99926E36cA087CF0A7D98f47f',
  },
  MojosDescriptor: {
    address: '0x56a20B894FDbA2E30eb597C2Ee5DeE343872054B',
    libraries: {
      NFTDescriptor: '0x9644aF501919CeF99926E36cA087CF0A7D98f47f',
    },
  },
  MojosSeeder: {
    address: '0xd9DB73FD804f5407F4fF2290309ac43C2349C49a',
  },
  UniversalMojo: {
    address: '0x01961e8d0a2dA0c6AFCcB95D86E84F80bD5Bc338',
    constructorArguments: [
      '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90',
      '0xAdE76D1C45F8487E4717CbB22ae8C677e7402d04',
      '0x56a20B894FDbA2E30eb597C2Ee5DeE343872054B',
      '0xd9DB73FD804f5407F4fF2290309ac43C2349C49a',
      '0xf57b2c51ded3a29e6891aba85459d600256cf317',
      0,
      6000
    ],
  },
  MojosAuctionHouse: {
    address: '0x27516cD023ed66E3C6b1677B0f647464513B39eF',
  },
  MojosAuctionHouseProxyAdmin: {
    address: '0xc7cae9F2B3273A287407e2FB30BE44226690CF8B',
  },
  MojosAuctionHouseProxy: {
    address: '0xAdE76D1C45F8487E4717CbB22ae8C677e7402d04',
    constructorArguments: [
      '0x27516cD023ed66E3C6b1677B0f647464513B39eF',
      '0xc7cae9F2B3273A287407e2FB30BE44226690CF8B',
      'b53127684a568b3173ae13b9f8a6016e243e63b6e8ee1178d6a717850b5d6103360894a13ba1a3210667c828492db98dca3e2076cc3735a920a3ca505d382bbc416464726573733a206c6f772d6c6576656c2064656c65676174652063616c6c206661696c656400000000000000000000000027516cd023ed66e3c6b1677b0f647464513b39ef000000000000000000000000c7cae9f2b3273a287407e2fb30be44226690cf8b000000000000000000000000000000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000000e4a3dc281800000000000000000000000001961e8d0a2da0c6afccb95d86e84f80bd5bc3380000000000000000000000004200000000000000000000000000000000000006000000000000000000000000000000000000000000000000000000000000012c00000000000000000000000000000000000000000000000000000000000000010000000000000000000000000000000000000000000000000000000000000005000000000000000000000000000000000000000000000000000000000000a8c0000000000000000000000000c5cab4c37d7c00b36de99c32b1f4462b8d923d9000000000000000000000000000000000000000000000000000000000',
    ],
  },
  MojosDAOExecutor: {
    address: '0x5329256a062B682C9c0A50d1EC4F6a5258b29719',
    constructorArguments: ['0x6f3E6272A167e8AcCb32072d08E0957F9c79223d', 172800],
  },
  MojosDAOLogicV1: {
    address: '0x3fCD1b9bd06fBeCC177564B9be7f9cA1041C7F4a',
  },
  MojosDAOProxy: {
    address: '0x7d347cb7473dA7f64f9Ea940a6F9b5e1b3f89559',
    constructorArguments: [
      '0x5329256a062B682C9c0A50d1EC4F6a5258b29719',
      '0x01961e8d0a2dA0c6AFCcB95D86E84F80bD5Bc338',
      '0xc5cab4c37D7C00B36DE99C32b1f4462B8d923d90',
      '0x5329256a062B682C9c0A50d1EC4F6a5258b29719',
      '0x3fCD1b9bd06fBeCC177564B9be7f9cA1041C7F4a',
      19710,
      13140,
      500,
      1000,
    ],
  },
};

task('verify-etherscan', 'Verify the Solidity contracts on Etherscan').setAction(async (_, hre) => {
  for (const [name, args] of Object.entries(contracts)) {
    console.log(`verifying ${name}...`);
    try {
      await hre.run('verify:verify', {
        ...args,
      });
    } catch (e) {
      console.error(e);
    }
  }
});
