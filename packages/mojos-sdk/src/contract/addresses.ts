import { ChainId, ContractAddresses } from './types';

const chainIdToAddresses: { [chainId: number]: ContractAddresses } = {
  [ChainId.Mainnet]: {
    mojosToken: '0x9C8fF314C9Bc7F6e59A9d9225Fb22946427eDC03',
    mojosSeeder: '0xCC8a0FB5ab3C7132c1b2A0109142Fb112c4Ce515',
    mojosDescriptor: '0x0Cfdb3Ba1694c2bb2CFACB0339ad7b1Ae5932B63',
    nftDescriptor: '0x0BBAd8c947210ab6284699605ce2a61780958264',
    mojosAuctionHouse: '0xF15a943787014461d94da08aD4040f79Cd7c124e',
    mojosAuctionHouseProxy: '0x830BD73E4184ceF73443C15111a1DF14e495C706',
    mojosAuctionHouseProxyAdmin: '0xC1C119932d78aB9080862C5fcb964029f086401e',
    mojosDaoExecutor: '0x0BC3807Ec262cB779b38D65b38158acC3bfedE10',
    mojosDAOProxy: '0x6f3E6272A167e8AcCb32072d08E0957F9c79223d',
    mojosDAOLogicV1: '0xa43aFE317985726E4e194eb061Af77fbCb43F944',
  },
  [ChainId.Rinkeby]: {
    mojosToken: '0xc236c04A37297e4B6BB1ff9Fad4D2423a31EE27e',
    mojosSeeder: '0x2633d7A612B43471501b2326707f9dbe20A558c9',
    mojosDescriptor: '0xC351C458e4AdAd145730b0efb6E5fC0AE94F733A',
    nftDescriptor: '0x593E4697373Ee5206C28Ac8D311Cf6d185ab5065',
    mojosAuctionHouse: '0x855d0E36170664f72e6FFb40DC33E881BEDC2F7D',
    mojosAuctionHouseProxy: '0x624e68624Fdb5F50780724942133a9C79fd8C6c6',
    mojosAuctionHouseProxyAdmin: '0x08C1bfB8635d4a944e96FE1E688a58E0E6222fa1',
    mojosDaoExecutor: '0x3d7297d668Ac1E8af5B2F0Faa62d69f4a27Ec791',
    mojosDAOProxy: '0xc1b47390F59122358fDc6Ab2237D4079ed4F454e',
    mojosDAOLogicV1: '0x31D4aeF622032492b395A0d885BB2AD4F121D60B',
  },
  [ChainId.Local]: {
    mojosToken: '0x9A676e781A523b5d0C0e43731313A708CB607508',
    mojosSeeder: '0x0DCd1Bf9A1b36cE34237eEaFef220932846BCD82',
    mojosDescriptor: '0xA51c1fc2f0D1a1b8494Ed1FE312d7C3a78Ed91C0',
    nftDescriptor: '0xB7f8BC63BbcaD18155201308C8f3540b07f84F5e',
    mojosAuctionHouse: '0x0B306BF915C4d645ff596e518fAf3F9669b97016',
    mojosAuctionHouseProxy: '0x9A9f2CCfdE556A7E9Ff0848998Aa4a0CFD8863AE',
    mojosAuctionHouseProxyAdmin: '0x959922bE3CAee4b8Cd9a407cc3ac1C251C2007B1',
    mojosDaoExecutor: '0x68B1D87F95878fE05B998F19b66F4baba5De1aed',
    mojosDAOProxy: '0xc6e7DF5E7b4f2A278906862b61205850344D4e7d',
    mojosDAOLogicV1: '0x3Aa5ebB10DC797CAC828524e59A333d0A371443c',
  },
  [4002]: {
    mojosToken: '0x15D352fB9FA2214DFC61Fb28145cFc2BC93A751D',
    mojosSeeder: '0xcCf9E95ecBC347bdCB1B081ED6013a1da295286c',
    mojosDescriptor: '0xde79A5C5690db27EDCD12192c9a058764894c2DE',
    nftDescriptor: '0xbE4f66d3a6Bfe872D66C67941C7D9fFfe781c24C',
    mojosAuctionHouse: '0x3377B1bdFB24Df84CfA712B770864eD1abd81c29',
    mojosAuctionHouseProxy: '0x93E05bA2d0683b61208AEC6D1f85e0991a02828e',
    mojosAuctionHouseProxyAdmin: '0xF44dbbCD6Cb9AEefbbD989655e31Fd6E92c3cF8d',
    mojosDaoExecutor: '0x28E2E3a25de36e4Cd542D0c87aC1FC42dC5db8C4',
    mojosDAOProxy: '0xDf8461abc484FEc6C96739D1F74d7859368f20D3',
    mojosDAOLogicV1: '0xfd91E231A553115B31A6444383661db35bd40B40',
  },
  [ChainId.Fantom]: {
    mojosToken: '0xBecC447bf7C197290D8d6Ac1553E5f3aB2Fc3998',
    mojosSeeder: '0x8D6f90E99c4E6f9377FfA8bb26F696dc15dc5f67',
    mojosDescriptor: '0x0809cb55cD13a52f54346936d7d8bBE3e7D835FB',
    nftDescriptor: '0x03790D1569Bf72DCaCa9C4f160dcD83CD36F5a04',
    mojosAuctionHouse: '0x048bc82948ce852131fAEA071d79288AD279Cd9A',
    mojosAuctionHouseProxy: '0x5B7147d5C850CdcD6A2094aDe867a35b429cBA06',
    mojosAuctionHouseProxyAdmin: '0x30dEaEB2b4e0c0035F0074F735bab8257956c75c',
    mojosDaoExecutor: '0x630c4B0D3f10Db00Cf1083F7775D62eFEecB9fdE',
    mojosDAOProxy: '0x4F7983ECEf1a6C7D08075A3F8b81Ca2fead036d5',
    mojosDAOLogicV1: '0xc7e08c0BCF41875C538629b538e254e1E9377241',
  },
  [ChainId.OptimisticTest]: {
    mojosToken: '0xC85273c398ca70d755DD6dE5798A08f376fed902',
    mojosSeeder: '0x57F54c6f321Ed544D86065590c32C5b361fAF732',
    mojosDescriptor: '0xcFb7D3f7c502a709cDad7fC9758370b59F9833b7',
    nftDescriptor: '0x33ad143e81CaF6B8CcE297D1F5b2553Cfd78eD5C',
    mojosAuctionHouse: '0xEe049Eb969ba2ef0a3Cc5a0Df86D143f5d4dbCA0',
    mojosAuctionHouseProxy: '0xe4f046A04d43DA1f7eD0E6efaeb6dc5F7b9498a2',
    mojosAuctionHouseProxyAdmin: '0xaF28086602DCb5c8691c9d6AA9E1d128E97E033C',
    mojosDaoExecutor: '0xF74FC3890a30D6E120FE108551b785E433E3AF7a',
    mojosDAOProxy: '0xE73778B2262f4aa4a679FFFBA7647Fe7497C1740',
    mojosDAOLogicV1: '0x01AcFE6E191980874018b29E32011f261586e4b6',
  },
  [ChainId.Optimistic]: {
    mojosToken: '0xBF05748c0e5d4bD45187336584D8E8c616C57787',
    mojosSeeder: '0x7d183AC20B846c45169e608a80511EAcca88C0B2',
    mojosDescriptor: '0x0515c9976078E5d556cEd8Fd67e1C2125E53D324',
    nftDescriptor: '0x2C78A928b938cd4352522c9FC91440Ca4ae6cF24',
    mojosAuctionHouse: '0xdBBf6573a70CA1Ef2cE7eD3F1a6050b654D9Df70',
    mojosAuctionHouseProxy: '0x439002ddB1E269A1a231D8968c919CB3f98850F8',
    mojosAuctionHouseProxyAdmin: '0x6e0daCFaf7D817bcdce9f3fFD00035254e967C45',
    mojosDaoExecutor: '0x2eb183b5Edf11Ec5fE4435f40be75B73856ab64a',
    mojosDAOProxy: '0x8f5a41cB4550126a59A33abfaa1Cd7cd2F51A82f',
    mojosDAOLogicV1: '0x9C974f1870Cc98117138b9A9BB0107995B364734',
  },
};

/**
 * Get addresses of contracts that have been deployed to the
 * Ethereum mainnet or a supported testnet. Throws if there are
 * no known contracts deployed on the corresponding chain.
 * @param chainId The desired chainId
 */
export const getContractAddressesForChainOrThrow = (chainId: number): ContractAddresses => {
  if (!chainIdToAddresses[chainId]) {
    throw new Error(
      `Unknown chain id (${chainId}). No known contracts have been deployed on this chain.`,
    );
  }
  return chainIdToAddresses[chainId];
};
