import axios from 'axios';
import * as R from 'ramda';
import config from '../src/config';
import { bigNumbersEqual } from './utils';

export interface NormalizedVote {
  proposalId: number;
  supportDetailed: number;
}

export interface Seed {
  background: number;
  body: number;
  accessory: number;
  head: number;
  glasses: number;
}

export interface NormalizedMojo {
  id: number;
  owner: string;
  delegatedTo: null | string;
  votes: NormalizedVote[];
  seed: Seed;
}

const mojosGql = `
{
  mojos {
    id
    owner {
      id
	    delegate {
		    id
	    }
    }
    votes {
      proposal {
        id
      }
      supportDetailed
    }
    seed {
      background
      body
      accessory
      head
      glasses
    }
  }
}
`;

export const normalizeVote = (vote: any): NormalizedVote => ({
  proposalId: Number(vote.proposal.id),
  supportDetailed: Number(vote.supportDetailed),
});

export const normalizeSeed = (seed: any): Seed => ({
  background: Number(seed.background),
  body: Number(seed.body),
  glasses: Number(seed.glasses),
  accessory: Number(seed.accessory),
  head: Number(seed.head),
});

export const normalizeMojo = (mojo: any): NormalizedMojo => ({
  id: Number(mojo.id),
  owner: mojo.owner.id,
  delegatedTo: mojo.owner.delegate?.id,
  votes: normalizeVotes(mojo.votes),
  seed: normalizeSeed(mojo.seed),
});

export const normalizeMojos = R.map(normalizeMojo);

export const normalizeVotes = R.map(normalizeVote);

export const ownerFilterFactory = (address: string) =>
  R.filter((mojo: any) => bigNumbersEqual(address, mojo.owner));

export const isMojoOwner = (address: string, mojos: NormalizedMojo[]) =>
  ownerFilterFactory(address)(mojos).length > 0;

export const delegateFilterFactory = (address: string) =>
  R.filter((mojo: any) => mojo.delegatedTo && bigNumbersEqual(address, mojo.delegatedTo));

export const isMojoDelegate = (address: string, mojos: NormalizedMojo[]) =>
  delegateFilterFactory(address)(mojos).length > 0;

export const mojosQuery = async () =>
  normalizeMojos(
    (await axios.post(config.app.subgraphApiUri, { query: mojosGql })).data.data.mojos,
  );
