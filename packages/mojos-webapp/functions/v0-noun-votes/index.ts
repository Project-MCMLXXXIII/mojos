import { Handler } from '@netlify/functions';
import { NormalizedVote, mojosQuery } from '../theGraph';
import * as R from 'ramda';
import { sharedResponseHeaders } from '../utils';

interface MojoVote {
  id: number;
  owner: string;
  delegatedTo: null | string;
  votes: NormalizedVote[];
}

const buildMojoVote = R.pick(['id', 'owner', 'delegatedTo', 'votes']);

const buildMojoVotes = R.map(buildMojoVote);

const handler: Handler = async (event, context) => {
  const mojos = await mojosQuery();
  const mojoVotes: MojoVote[] = buildMojoVotes(mojos);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify(mojoVotes),
  };
};

export { handler };
