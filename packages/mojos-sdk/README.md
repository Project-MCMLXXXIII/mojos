# @mojos/sdk

## Development

### Install dependencies

```sh
yarn
```

### Run tests

```sh
yarn test
```

## Usage

The Mojos SDK contains useful tooling for interacting with the Mojos protocol.

### Contracts

**Get Contract Addresses**

```ts
import { ChainId, getContractAddressesForChainOrThrow } from '@mojos/sdk';

const { mojosToken } = getContractAddressesForChainOrThrow(ChainId.Mainnet);
```

**Get Contract Instances**

```ts
import { ChainId, getContractsForChainOrThrow } from '@mojos/sdk';

const provider = new providers.JsonRpcProvider(RPC_URL);

const { mojosTokenContract } = getContractsForChainOrThrow(ChainId.Mainnet, provider);
```

**Get Contract ABIs**

```ts
import { MojosTokenABI } from '@mojos/sdk';
```

### Images

**Run-length Encode Images**

```ts
import { PNGCollectionEncoder } from '@mojos/sdk';
import { readPngFile } from 'node-libpng';
import { promises as fs } from 'fs';
import path from 'path';

const DESTINATION = path.join(__dirname, './output/image-data.json');

const encode = async () => {
  const encoder = new PNGCollectionEncoder();

  const folders = ['bodies', 'bodyAccessories', 'faces', 'headAccessories'];
  for (const folder of folders) {
    const folderpath = path.join(__dirname, './images', folder);
    const files = await fs.readdir(folderpath);
    for (const file of files) {
      const image = await readPngFile(path.join(folderpath, file));
      encoder.encodeImage(file.replace(/\.png$/, ''), image, folder);
    }
  }
  await encoder.writeToFile(DESTINATION);
};

encode();
```

**Create SVGs from Run-length Encoded Data**

```ts
import { buildSVG } from '@mojos/sdk';

const svg = buildSVG(RLE_PARTS, PALETTE_COLORS, BACKGROUND_COLOR);
```
