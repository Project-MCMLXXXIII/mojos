export enum ExternalURL {
  discord,
  twitter,
}

export const externalURL = (externalURL: ExternalURL) => {
  switch (externalURL) {
    case ExternalURL.discord:
      return 'http://discord.gg/mojos';
    case ExternalURL.twitter:
      return 'https://twitter.com/mojosdao';
  }
};
