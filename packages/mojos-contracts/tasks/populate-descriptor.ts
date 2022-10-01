import { task, types } from 'hardhat/config';
//import ImageData from '../files/image-data.json';
import { bgcolors, partcolors, parts } from '../files/encoded-layers.json';
import { chunkArray } from '../utils';

task('populate-descriptor', 'Populates the descriptor with color palettes and Mojo parts')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptor` contract address',
    '0x8C945b1EA7f123bE7bb5b7c190004f5Da218efBA',
    types.string,
  )
  .addOptionalParam(
    'mojosDescriptor',
    'The `MojosDescriptor` contract address',
    '0x734C8ac4AC8264a5E623861117E3042DC994Fe25',
    types.string,
  )
  .setAction(async ({ nftDescriptor, mojosDescriptor }, { ethers }) => {
    const descriptorFactory = await ethers.getContractFactory('MojosDescriptor', {
      libraries: {
        NFTDescriptor: nftDescriptor,
      },
    });
    const descriptorContract = descriptorFactory.attach(mojosDescriptor);

    const [bodies, bodyAccessories, faces, headAccessories] = parts;

    console.log('Populating Descriptor');

    let TX;
    // Chunk head and bodyAccessory population due to high gas usage
    TX = await descriptorContract.addManyBackgrounds(bgcolors);
    console.log('Backgrounds Added');
    await TX.wait();
    TX = await descriptorContract.addManyColorsToPalette(0, partcolors);
    console.log('Colors Palette Added');
    await TX.wait();
    TX = await descriptorContract.addManyBodies(bodies.map(({ data }) => data));
    console.log('Bodies Added');
    await TX.wait();

    const bodyAccessoryChunk = chunkArray(bodyAccessories, 10);
    for (const chunk of bodyAccessoryChunk) {
      TX = await descriptorContract.addManyBodyAccessories(chunk.map(({ data }) => data));
      await TX.wait();
    }

    console.log('Body Accessories');

    const headChunk = chunkArray(faces, 10);
    for (const chunk of headChunk) {
      TX = await descriptorContract.addManyFaces(chunk.map(({ data }) => data));

      await TX.wait();
    }

    console.log('Faces');

    const headAccessoriesChunk = chunkArray(headAccessories, 10);
    for (const headAccessoryChunk of headAccessoriesChunk) {
      TX = await descriptorContract.addManyHeadAccessories(
        headAccessoryChunk.map(({ data }) => data),
      );

      await TX.wait();
    }

    // const data = headAccessories.map(({ data }) => data);

    // TX = await descriptorContract.addManyHeadAccessories(data, { gasLimit: 10_000_000 });
    // await TX.wait();

    console.log('Head Accessories');

    console.log('Descriptor populated with palettes and parts');
  });
