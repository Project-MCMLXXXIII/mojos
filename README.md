# mojos-monorepo

Mojos DAO is a generative avatar art collective run by a group of crypto misfits.

## Contributing

If you're interested in contributing to Mojos DAO repos we're excited to have you. Please discuss any changes in `#developers` in [discord.gg/mojos.TODO](https://discord.gg/mojos) prior to contributing to reduce duplication of effort and in case there is any prior art that may be useful to you.

## Packages

### mojos-contracts

The [mojos contracts](packages/mojos-contracts) is the suite of Solidity contracts powering Mojos DAO.

### mojos-subgraph

In order to make retrieving more complex data from the auction history, [mojos-subgraph](packages/mojos-subgraph) contains subgraph manifests that are deployed onto [The Graph](https://thegraph.com).

### mojos-webapp

The [mojos-webapp](packages/mojos-webapp) is the frontend for interacting with Mojo auctions as hosted at [1980.network](https://1980.network).

## Quickstart

### Install dependencies

```sh
yarn
```

### Build all packages

```sh
yarn build
```

### Run Linter

```sh
yarn lint
```

### Run Prettier

```sh
yarn format
```


[Got My Mojo Working](https://www.youtube.com/watch?v=8hEYwk0bypY)
