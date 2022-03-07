import { Handler } from '@netlify/functions';
import { mojosQuery, Seed } from '../theGraph';
import * as R from 'ramda';
import { sharedResponseHeaders } from '../utils';

interface SeededMojo {
  id: number;
  seed: Seed;
}

const buildSeededMojo = R.pick(['id', 'seed']);

const buildSeededMojos = R.map(buildSeededMojo);

const handler: Handler = async (event, context) => {
  const mojos = await mojosQuery();
  const seededMojos: SeededMojo[] = buildSeededMojos(mojos);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify(seededMojos),
  };
};

export { handler };
