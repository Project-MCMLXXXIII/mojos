import { expect } from 'chai';
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import {
  shiftRightAndCast,
  getPseudorandomPart,
  getMojoSeedFromBlockHash,
  getMojoData,
} from '../src/index';
import { images } from '../src/image-data.json';
import { MojoSeed } from '../src/types';

const { bodies, bodyAccessories, faces, headAccessories } = images;

describe('@mojo/assets utils', () => {
  // Test against Mojo 116, created at block 13661786
  const MOJO116_ID = 116;
  const MOJO116_SEED: MojoSeed = {
    background: 1,
    body: 8,
    bodyAccessory: 22,
    face: 33,
    headAccessory: 4,
  };
  const MOJO116_PREV_BLOCKHASH =
    '0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01';
  const MOJO116_PSEUDORANDOMNESS = solidityKeccak256(
    ['bytes32', 'uint256'],
    [MOJO116_PREV_BLOCKHASH, MOJO116_ID],
  );

  describe('shiftRightAndCast', () => {
    it('should work correctly', () => {
      expect(shiftRightAndCast(MOJO116_PREV_BLOCKHASH, 0, 48)).to.equal('0x00134ee53e01');
      expect(shiftRightAndCast(MOJO116_PREV_BLOCKHASH, 48, 48)).to.equal('0x7acb2f40d7f2');
    });
  });

  describe('getPseudorandomPart', () => {
    it('should match MojosSeeder.sol implementation for a pseudorandomly chosen part', () => {
      const headShift = 144;
      const { face } = MOJO116_SEED;
      expect(getPseudorandomPart(MOJO116_PSEUDORANDOMNESS, faces.length, headShift)).to.be.equal(
        face,
      );
    });
  });

  describe('getMojoSeedFromBlockHash', () => {
    it('should match MojosSeeder.sol implementation for generating a Mojo seed', () => {
      expect(getMojoSeedFromBlockHash(MOJO116_ID, MOJO116_PREV_BLOCKHASH)).to.deep.equal(
        MOJO116_SEED,
      );
    });
  });
});
