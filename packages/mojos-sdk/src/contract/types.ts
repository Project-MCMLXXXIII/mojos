import {
  mojosTokenFactory,
  mojosAuctionHouseFactory,
  mojosDescriptorFactory,
  mojosSeederFactory,
  mojosDaoLogicV1Factory,
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
  mojosTokenContract: ReturnType<typeof mojosTokenFactory.connect>;
  mojosAuctionHouseContract: ReturnType<typeof mojosAuctionHouseFactory.connect>;
  mojosDescriptorContract: ReturnType<typeof mojosDescriptorFactory.connect>;
  mojosSeederContract: ReturnType<typeof mojosSeederFactory.connect>;
  mojosDaoContract: ReturnType<typeof mojosDaoLogicV1Factory.connect>;
}

export enum ChainId {
  Mainnet = 1,
  Ropsten = 3,
  Rinkeby = 4,
  Kovan = 42,
  Local = 31337,
}
