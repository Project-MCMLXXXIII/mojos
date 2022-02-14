import { Handler } from '@netlify/functions';
import { NormalizedVote, mojosQuery } from '../theGraph';
import * as R from 'ramda';
import { sharedResponseHeaders } from '../utils';

interface NounVote {
  id: number;
  owner: string;
  delegatedTo: null | string;
  votes: NormalizedVote[];
}

const buildNounVote = R.pick(['id', 'owner', 'delegatedTo', 'votes']);

const buildNounVotes = R.map(buildNounVote);

const handler: Handler = async (event, context) => {
  const mojos = await mojosQuery();
  const nounVotes: NounVote[] = buildNounVotes(mojos);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify(nounVotes),
  };
};

export { handler };
