import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import { BigNumber, BigNumberish } from '@ethersproject/bignumber';
import { MojoSeed, MojoData } from './types';
// import { images, bgcolors } from './image-data.json';
import { bgcolors, partcolors, parts } from './encoded-layers.json';

// const { bodies, accessories, heads, glasses } = images;

const [bodies, bodyAccessories, faces, headAccessories] = parts;

/**
 * Get encoded part and background information using a Mojo seed
 * @param seed The Mojo seed
 */
export const getMojoData = (seed: MojoSeed): MojoData => {
  const bodies_data = bodies.map(({ data }) => data);
  return {
    parts: [
      bodies[seed.body],
      bodyAccessories[seed.bodyAccessory],
      faces[seed.face],
      headAccessories[seed.headAccessory],
    ],
    background: bgcolors[seed.background],
  };
};

/**
 * Generate a random Mojo seed
 * @param seed The Mojo seed
 */
export const getRandomMojoSeed = (): MojoSeed => {
  return {
    background: Math.floor(Math.random() * bgcolors.length),
    body: Math.floor(Math.random() * bodies.length),
    bodyAccessory: Math.floor(Math.random() * bodyAccessories.length),
    face: Math.floor(Math.random() * faces.length),
    headAccessory: Math.floor(Math.random() * headAccessories.length),
  };
};

/**
 * Emulate bitwise right shift and uint cast
 * @param value A Big Number
 * @param shiftAmount The amount to right shift
 * @param uintSize The uint bit size to cast to
 */
export const shiftRightAndCast = (
  value: BigNumberish,
  shiftAmount: number,
  uintSize: number,
): string => {
  const shifted = BigNumber.from(value).shr(shiftAmount).toHexString();
  return `0x${shifted.substring(shifted.length - uintSize / 4)}`;
};

/**
 * Emulates the MojosSeeder.sol methodology for pseudorandomly selecting a part
 * @param pseudorandomness Hex representation of a number
 * @param partCount The number of parts to pseudorandomly choose from
 * @param shiftAmount The amount to right shift
 * @param uintSize The size of the unsigned integer
 */
export const getPseudorandomPart = (
  pseudorandomness: string,
  partCount: number,
  shiftAmount: number,
  uintSize: number = 48,
): number => {
  const hex = shiftRightAndCast(pseudorandomness, shiftAmount, uintSize);
  return BigNumber.from(hex).mod(partCount).toNumber();
};

/**
 * Emulates the MojosSeeder.sol methodology for generating a Mojo seed
 * @param mojoId The Mojo tokenId used to create pseudorandomness
 * @param blockHash The block hash use to create pseudorandomness
 */
export const getMojoSeedFromBlockHash = (mojoId: BigNumberish, blockHash: string): MojoSeed => {
  const pseudorandomness = solidityKeccak256(['bytes32', 'uint256'], [blockHash, mojoId]);
  return {
    background: getPseudorandomPart(pseudorandomness, bgcolors.length, 0),
    body: getPseudorandomPart(pseudorandomness, bodies.length, 48),
    bodyAccessory: getPseudorandomPart(pseudorandomness, bodyAccessories.length, 96),
    face: getPseudorandomPart(pseudorandomness, faces.length, 144),
    headAccessory: getPseudorandomPart(pseudorandomness, headAccessories.length, 192),
  };
};
