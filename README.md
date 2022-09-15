# mojos-monorepo

Mojos DAO is a generative avatar art collective run by a group of crypto misfits.

## Contributing

If you're interested in contributing to Mojos DAO repos we're excited to have you. Please discuss any changes in `#developers` in [discord.gg/mojos](https://discord.gg/mojos) prior to contributing to reduce duplication of effort and in case there is any prior art that may be useful to you.

## Packages

### mojos-api

The [mojos api](packages/mojos-api) is an HTTP webserver that hosts token metadata. This is currently unused because on-chain, data URIs are enabled.

### mojos-assets

The [mojos assets](packages/mojos-assets) package holds the Mojo PNG and run-length encoded image data.

### mojos-bots

The [mojos bots](packages/mojos-bots) package contains a bot that monitors for changes in Mojo auction state and notifies everyone via Twitter and Discord.

### mojos-contracts

The [mojos contracts](packages/mojos-contracts) is the suite of Solidity contracts powering Mojos DAO.

### mojos-sdk

The [mojos sdk](packages/mojos-sdk) exposes the Mojos contract addresses, ABIs, and instances as well as image encoding and SVG building utilities.

### mojos-subgraph

In order to make retrieving more complex data from the auction history, [mojos subgraph](packages/mojos-subgraph) contains subgraph manifests that are deployed onto [The Graph](https://thegraph.com).

### mojos-webapp

The [mojos webapp](packages/mojos-webapp) is the frontend for interacting with Mojo auctions as hosted at [mojos.wtf](https://mojos.wtf).

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

### General commands


-- Deploy to Destination network (LayerZero)
```
npx hardhat deploy --network fantom_test --tags Destination --reset
```

-- Deploy to Source network (LayerZero)
```
npx hardhat deploy --network rinkeby --tags Source --reset
```


-- Generate Trusted relationship between deployed contracts
```
npx hardhat --network fantom_test onftSetTrustedRemote --target-network rinkeby

npx hardhat --network rinkeby onftSetTrustedRemote --target-network fantom_test
```


-- Mint a MOJO with a specific Seed, needs to specify the network and the MojosToken Address
```
npx hardhat mint-mojo --network rinkeby --mojos-token 0xc236c04A37297e4B6BB1ff9Fad4D2423a31EE27e

npx hardhat mint-mojo --network fantom_test --mojos-token 0x5138483611Df47336934daB1019a846934E63b79
```


-- Send a MOJO between networks, needs to specify the source network, target network and MOJO ID
```
npx hardhat --network rinkeby onftSend --target-network fantom_test --token-id 3

npx hardhat --network fantom_test onftSend --target-network rinkeby --token-id 6005
```