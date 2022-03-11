export enum ExternalURL {
  discord,
  twitter,
  notion,
  discourse,
}

export const externalURL = (externalURL: ExternalURL) => {
  switch (externalURL) {
    case ExternalURL.discord:
      return 'http://discord.gg/mojos';
    case ExternalURL.twitter:
      return 'https://twitter.com/MojosHQ';
    case ExternalURL.notion:
      return 'https://getmojos.com/';
    case ExternalURL.discourse:
      return 'https://getmojos.com/';
  }
};
