import {
  MojosTokenFactory,
  MojosAuctionHouseFactory,
  MojosDescriptorFactory,
  MojosSeederFactory,
  MojosDaoLogicV1Factory,
} from '@mojos/contracts';
import type { Signer } from 'ethers';
import type { Provider } from '@ethersproject/providers';
import { getContractAddressesForChainOrThrow } from './addresses';
import { Contracts } from './types';

/**
 * Get contract instances that target the Ethereum mainnet
 * or a supported testnet. Throws if there are no known contracts
 * deployed on the corresponding chain.
 * @param chainId The desired chain id
 * @param signerOrProvider The ethers v5 signer or provider
 */
export const getContractsForChainOrThrow = (
  chainId: number,
  signerOrProvider?: Signer | Provider,
): Contracts => {
  const addresses = getContractAddressesForChainOrThrow(chainId);

  return {
    mojosTokenContract: MojosTokenFactory.connect(
      addresses.mojosToken,
      signerOrProvider as Signer | Provider,
    ),
    mojosAuctionHouseContract: MojosAuctionHouseFactory.connect(
      addresses.mojosAuctionHouseProxy,
      signerOrProvider as Signer | Provider,
    ),
    mojosDescriptorContract: MojosDescriptorFactory.connect(
      addresses.mojosDescriptor,
      signerOrProvider as Signer | Provider,
    ),
    mojosSeederContract: MojosSeederFactory.connect(
      addresses.mojosSeeder,
      signerOrProvider as Signer | Provider,
    ),
    mojosDaoContract: MojosDaoLogicV1Factory.connect(
      addresses.mojosDAOProxy,
      signerOrProvider as Signer | Provider,
    ),
  };
};
