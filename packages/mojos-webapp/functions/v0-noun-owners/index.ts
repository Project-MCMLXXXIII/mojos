import { Handler } from '@netlify/functions';
import { mojosQuery } from '../theGraph';
import * as R from 'ramda';
import { sharedResponseHeaders } from '../utils';

export interface LiteNoun {
  id: number;
  owner: string;
  delegatedTo: null | string;
}

const lightenNoun = R.pick(['id', 'owner', 'delegatedTo']);

const lightenmojos = R.map(lightenNoun);

const handler: Handler = async (event, context) => {
  const mojos = await mojosQuery();
  const litemojos: LiteNoun[] = lightenmojos(mojos);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify(litemojos),
  };
};

export { handler };
