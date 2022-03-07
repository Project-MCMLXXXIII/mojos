import { config } from './config';
import { Contract, providers } from 'ethers';
import { NFTStorage } from 'nft.storage';
import { MojosTokenABI } from '@mojos/contracts';
import Redis from 'ioredis';

/**
 * IFPS Storage Client
 */
export const storage = new NFTStorage({ token: config.nftStorageApiKey });

/**
 * Redis Client
 */
export const redis = new Redis(config.redisPort, config.redisHost);

/**
 * Ethers JSON RPC Provider
 */
export const jsonRpcProvider = new providers.JsonRpcProvider(config.jsonRpcUrl);

/**
 * Mojos ERC721 Token Contract
 */
export const mojosTokenContract = new Contract(
  config.mojosTokenAddress,
  MojosTokenABI,
  jsonRpcProvider,
);
