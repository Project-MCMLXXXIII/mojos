import { task, types } from 'hardhat/config';
//import ImageData from '../files/image-data.json';
import { bgcolors, partcolors, parts } from '../files/encoded-layers.json';
import { chunkArray } from '../utils';

task('populate-descriptor', 'Populates the descriptor with color palettes and Mojo parts')
  .addOptionalParam(
    'nftDescriptor',
    'The `NFTDescriptor` contract address',
    '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    types.string,
  )
  .addOptionalParam(
    'mojosDescriptor',
    'The `MojosDescriptor` contract address',
    '0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512',
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

    // Chunk head and bodyAccessory population due to high gas usage
    await descriptorContract.addManyBackgrounds(bgcolors);
    await descriptorContract.addManyColorsToPalette(0, partcolors);
    await descriptorContract.addManyBodies(bodies.map(({ data }) => data));

    const bodyAccessoryChunk = chunkArray(bodyAccessories, 10);
    for (const chunk of bodyAccessoryChunk) {
      await descriptorContract.addManyBodyAccessories(chunk.map(({ data }) => data));
    }

    const headChunk = chunkArray(faces, 10);
    for (const chunk of headChunk) {
      await descriptorContract.addManyFaces(chunk.map(({ data }) => data));
    }

    await descriptorContract.addManyHeadAccessories(headAccessories.map(({ data }) => data));

    console.log('Descriptor populated with palettes and parts');
  });
