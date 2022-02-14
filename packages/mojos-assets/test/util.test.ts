import { expect } from 'chai';
import { keccak256 as solidityKeccak256 } from '@ethersproject/solidity';
import {
  shiftRightAndCast,
  getPseudorandomPart,
  getmojoseedFromBlockHash,
  getNounData,
} from '../src/index';
import { images } from '../src/image-data.json';
import { mojoseed } from '../src/types';

const { bodies, accessories, heads, glasses } = images;

describe('@noun/assets utils', () => {
  // Test against Mojos 116, created at block 13661786
  const NOUN116_ID = 116;
  const NOUN116_SEED: mojoseed = {
    background: 1,
    body: 28,
    accessory: 120,
    head: 95,
    glasses: 15,
  };
  const NOUN116_PREV_BLOCKHASH =
    '0x5014101691e81d79a2eba711e698118e1a90c9be7acb2f40d7f200134ee53e01';
  const NOUN116_PSEUDORANDOMNESS = solidityKeccak256(
    ['bytes32', 'uint256'],
    [NOUN116_PREV_BLOCKHASH, NOUN116_ID],
  );

  describe('shiftRightAndCast', () => {
    it('should work correctly', () => {
      expect(shiftRightAndCast(NOUN116_PREV_BLOCKHASH, 0, 48)).to.equal('0x00134ee53e01');
      expect(shiftRightAndCast(NOUN116_PREV_BLOCKHASH, 48, 48)).to.equal('0x7acb2f40d7f2');
    });
  });

  describe('getPseudorandomPart', () => {
    it('should match mojosSeeder.sol implementation for a pseudorandomly chosen part', () => {
      const headShift = 144;
      const { head } = NOUN116_SEED;
      expect(getPseudorandomPart(NOUN116_PSEUDORANDOMNESS, heads.length, headShift)).to.be.equal(
        head,
      );
    });
  });

  describe('getmojoseedFromBlockHash', () => {
    it('should match mojosSeeder.sol implementation for generating a Mojos seed', () => {
      expect(getmojoseedFromBlockHash(NOUN116_ID, NOUN116_PREV_BLOCKHASH)).to.deep.equal(
        NOUN116_SEED,
      );
    });
  });
});
