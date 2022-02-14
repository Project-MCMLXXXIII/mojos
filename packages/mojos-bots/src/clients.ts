import { config } from './config';
import Redis from 'ioredis';
import TwitterApi from 'twitter-api-v2';
import { Contract, providers } from 'ethers';
import { mojosTokenABI } from '@mojos/contracts';
import Discord from 'discord.js';
import axios from 'axios';

/**
 * Redis Client
 */
export const redis = new Redis(config.redisPort, config.redisHost, {
  db: config.redisDb,
  password: config.redisPassword,
});

/**
 * Twitter Client
 */
export const twitter = new TwitterApi({
  appKey: config.twitterAppKey,
  appSecret: config.twitterAppSecret,
  accessToken: config.twitterAccessToken,
  accessSecret: config.twitterAccessSecret,
});

/**
 * Ethers JSON RPC Provider
 */
export const jsonRpcProvider = new providers.JsonRpcProvider(config.jsonRpcUrl);

/**
 * mojos ERC721 Token Contract
 */
export const mojosTokenContract = new Contract(
  config.mojosTokenAddress,
  mojosTokenABI,
  jsonRpcProvider,
);

/**
 * Discord webhook client for sending messages to the private
 * Discord channel
 */
export const internalDiscordWebhook = new Discord.WebhookClient(
  config.discordWebhookId,
  config.discordWebhookToken,
);

/**
 * Discord webhook client for sending messages to the public
 * Discord channel
 */
export const publicDiscordWebhook = new Discord.WebhookClient(
  config.discordPublicWebhookId,
  config.discordPublicWebhookToken,
);

/**
 * Increment one of the mojos infra counters
 * @param counterName counter name to increment
 * @returns
 */
export const incrementCounter = (counterName: string) =>
  axios.post(`https://simple-counter.mojos.tools/count/inc/${counterName}`);
