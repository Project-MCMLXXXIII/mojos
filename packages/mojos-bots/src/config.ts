import dotenv from 'dotenv';

dotenv.config();

export const config = {
  redisPort: Number(process.env.REDIS_PORT ?? 6379),
  redisHost: process.env.REDIS_HOST ?? 'localhost',
  redisDb: Number(process.env.REDIS_DB ?? 0),
  redisPassword: process.env.REDIS_PASSWORD,
  mojosSubgraph:
    process.env.MOJOS_SUBGRAPH_URL ??
    'https://api.thegraph.com/subgraphs/name/kingassune/mojos',
  twitterEnabled: process.env.TWITTER_ENABLED === 'true',
  twitterAppKey: process.env.TWITTER_APP_KEY ?? '',
  twitterAppSecret: process.env.TWITTER_APP_SECRET ?? '',
  twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN ?? '',
  twitterAccessSecret: process.env.TWITTER_ACCESS_SECRET ?? '',
  mojosTokenAddress:
    process.env.MOJOS_TOKEN_ADDRESS ?? '0x01961e8d0a2dA0c6AFCcB95D86E84F80bD5Bc338',
  jsonRpcUrl: process.env.JSON_RPC_URL ?? 'https://opt-mainnet.g.alchemy.com/v2/49G2s-oOGfb1sFWiqk7y1QzHiDaYjij5',
  discordEnabled: process.env.DISCORD_ENABLED === 'true',
  discordWebhookToken: process.env.DISCORD_WEBHOOK_TOKEN ?? '',
  discordWebhookId: process.env.DISCORD_WEBHOOK_ID ?? '',
  discordPublicWebhookToken: process.env.DISCORD_PUBLIC_WEBHOOK_TOKEN ?? '',
  discordPublicWebhookId: process.env.DISCORD_PUBLIC_WEBHOOK_ID ?? '',
  pinataEnabled: process.env.PINATA_ENABLED === 'true',
  pinataApiKey: process.env.PINATA_API_KEY ?? '',
  pinataApiSecretKey: process.env.PINATA_API_SECRET_KEY ?? '',
};
