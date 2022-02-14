import { Handler } from '@netlify/functions';
import { mojosQuery, Seed } from '../theGraph';
import * as R from 'ramda';
import { sharedResponseHeaders } from '../utils';

interface SeededNoun {
  id: number;
  seed: Seed;
}

const buildSeededNoun = R.pick(['id', 'seed']);

const buildSeededmojos = R.map(buildSeededNoun);

const handler: Handler = async (event, context) => {
  const mojos = await mojosQuery();
  const seededmojos: SeededNoun[] = buildSeededmojos(mojos);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify(seededmojos),
  };
};

export { handler };
