import {
  ContractAddresses as MojosContractAddresses,
  getContractAddressesForChainOrThrow,
} from '@mojos/sdk';
import { ChainId } from '@usedapp/core';

interface ExternalContractAddresses {
  lidoToken: string | undefined;
}

export type ContractAddresses = MojosContractAddresses & ExternalContractAddresses;

interface AppConfig {
  jsonRpcUri: string;
  wsRpcUri: string;
  subgraphApiUri: string;
  enableHistory: boolean;
}

type SupportedChains = ChainId.Rinkeby | ChainId.Mainnet | ChainId.Hardhat | ChainId.Fantom | ChainId.Optimism | ChainId.OptimismKovan;

export const CHAIN_ID: SupportedChains = parseInt(process.env.REACT_APP_CHAIN_ID ?? '4');

export const ETHERSCAN_API_KEY = process.env.REACT_APP_ETHERSCAN_API_KEY ?? '';

const INFURA_PROJECT_ID = process.env.REACT_APP_INFURA_PROJECT_ID;

export const createNetworkHttpUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_JSONRPC`];
  return custom || `https://${network}.infura.io/v3/${INFURA_PROJECT_ID}`;
};

export const createNetworkWsUrl = (network: string): string => {
  const custom = process.env[`REACT_APP_${network.toUpperCase()}_WSRPC`];
  return custom || `wss://${network}.infura.io/ws/v3/${INFURA_PROJECT_ID}`;
};

const app: Record<SupportedChains, AppConfig> = {
  [ChainId.Rinkeby]: {
    jsonRpcUri: createNetworkHttpUrl('rinkeby'),
    wsRpcUri: createNetworkWsUrl('rinkeby'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/pavelespitia/mojo-rinkeby',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Mainnet]: {
    jsonRpcUri: createNetworkHttpUrl('mainnet'),
    wsRpcUri: createNetworkWsUrl('mainnet'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/mojosdao/mojos-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Hardhat]: {
    jsonRpcUri: 'http://localhost:8545',
    wsRpcUri: 'ws://localhost:8545',
    subgraphApiUri: '',
    enableHistory: false,
  },
  [ChainId.Fantom]: {
    jsonRpcUri: createNetworkHttpUrl('fantom'),
    wsRpcUri: createNetworkWsUrl('fantom'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/mojosdao/mojos-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.Optimism]: {
    jsonRpcUri: createNetworkHttpUrl('optimism'),
    wsRpcUri: createNetworkWsUrl('optimism'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/kingassune/mojos',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
  [ChainId.OptimismKovan]: {
    jsonRpcUri: createNetworkHttpUrl('optimismkovan'),
    wsRpcUri: createNetworkWsUrl('optimismkovan'),
    subgraphApiUri: 'https://api.thegraph.com/subgraphs/name/mojosdao/mojos-subgraph',
    enableHistory: process.env.REACT_APP_ENABLE_HISTORY === 'true',
  },
};

const externalAddresses: Record<SupportedChains, ExternalContractAddresses> = {
  [ChainId.Rinkeby]: {
    lidoToken: '0xF4242f9d78DB7218Ad72Ee3aE14469DBDE8731eD',
  },
  [ChainId.Mainnet]: {
    lidoToken: '0xae7ab96520DE3A18E5e111B5EaAb095312D7fE84',
  },
  [ChainId.Hardhat]: {
    lidoToken: undefined,
  },
  [ChainId.Fantom]: {
    lidoToken: undefined,
  },
  [ChainId.Optimism]: {
    lidoToken: undefined,
  },
  [ChainId.OptimismKovan]: {
    lidoToken: undefined,
  },
};

const getAddresses = (): ContractAddresses => {
  let mojosAddresses = {} as MojosContractAddresses;
  try {
    mojosAddresses = getContractAddressesForChainOrThrow(CHAIN_ID);
  } catch {}
  return { ...mojosAddresses, ...externalAddresses[CHAIN_ID] };
};

const config = {
  app: app[CHAIN_ID],
  addresses: getAddresses(),
};

export default config;
