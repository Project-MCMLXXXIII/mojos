import {
  MojosTokenFactory,
  MojosAuctionHouseFactory,
  MojosDescriptorFactory,
  MojosSeederFactory,
  MojosDaoLogicV1Factory,
} from '@mojos/contracts';

export interface ContractAddresses {
  mojosToken: string;
  mojosSeeder: string;
  mojosDescriptor: string;
  nftDescriptor: string;
  mojosAuctionHouse: string;
  mojosAuctionHouseProxy: string;
  mojosAuctionHouseProxyAdmin: string;
  mojosDaoExecutor: string;
  mojosDAOProxy: string;
  mojosDAOLogicV1: string;
}

export interface Contracts {
  mojosTokenContract: ReturnType<typeof MojosTokenFactory.connect>;
  mojosAuctionHouseContract: ReturnType<typeof MojosAuctionHouseFactory.connect>;
  mojosDescriptorContract: ReturnType<typeof MojosDescriptorFactory.connect>;
  mojosSeederContract: ReturnType<typeof MojosSeederFactory.connect>;
  mojosDaoContract: ReturnType<typeof MojosDaoLogicV1Factory.connect>;
}

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Kovan = 42,
  Local = 31337,
  Fantom = 250,
  Optimistic=10,
  OptimisticTest=69
}
