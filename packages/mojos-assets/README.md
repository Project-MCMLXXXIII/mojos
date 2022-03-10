# @mojos/assets

## Development

### Install dependencies

```sh
yarn
```

## Usage

**Access Mojo RLE Image Data**

```ts
import { ImageData } from '@mojos/assets';

const { bgcolors, palette, images } = ImageData;
const { bodies, bodyAccessories, faces, headAccessories } = images;
```

**Get Mojo Part & Background Data**

```ts
import { getMojoData } from '@mojos/assets';

const seed = {
  background: 0,
  body: 17,
  bodyAccessory: 41,
  face: 71,
  headAccessory: 2,
};
const { parts, background } = getMojoData(seed);
```

**Emulate `MojoSeeder.sol` Pseudorandom seed generation**

```ts
import { getMojoSeedFromBlockHash } from '@mojos/assets';

const blockHash = '0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01';
const mojoId = 116;

/**
 {
    background: 1,
    body: 28,
    bodyAccessory: 120,
    face: 95,
    headAccessory: 15
  }
*/
const seed = getMojoSeedFromBlockHash(mojoId, blockHash);
```

## Examples

**Almost off-chain Mojo Crystal Ball**
Generate a Mojo using only a block hash, which saves calls to `MojoSeeder` and `MojoDescriptor` contracts. This can be used for a faster crystal ball.

```ts
/**
 * For you to implement:
   - hook up providers with ether/web3.js
   - get currently auctioned Mojo Id from the MojosAuctionHouse contract
   - add 1 to the current Mojo Id to get the next Mojo Id (named `nextMojoId` below)
   - get the latest block hash from your provider (named `latestBlockHash` below)
*/

import { ImageData, getMojoSeedFromBlockHash, getMojoData } from '@mojos/assets';
import { buildSVG } from '@mojos/sdk';
const { palette } = ImageData; // Used with `buildSVG``

/**
 * OUTPUT:
   {
      background: 1,
      body: 28,
      bodyAccessory: 120,
      face: 95,
      headAccessory: 15
    }
*/
const seed = getMojoSeedFromBlockHash(nextMojoId, latestBlockHash);

/** 
 * OUTPUT:
   {
     parts: [
       {
         filename: 'body-teal',
         data: '...'
       },
       {
         filename: 'accessory-txt-mojo-multicolor',
         data: '...'
       },
       {
         filename: 'head-goat',
         data: '...'
       },
       {
         filename: 'glasses-square-red',
         data: '...'
       }
     ],
     background: 'e1d7d5'
   }
*/
const { parts, background } = getMojoData(seed);

const svgBinary = buildSVG(parts, palette, background);
const svgBase64 = btoa(svgBinary);
```

The Mojo SVG can then be displayed. Here's a dummy example using React

```ts
function SVG({ svgBase64 }) {
  return <img src={`data:image/svg+xml;base64,${svgBase64}`} />;
}
```
