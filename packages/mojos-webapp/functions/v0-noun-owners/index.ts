import { Handler } from '@netlify/functions';
import { mojosQuery } from '../theGraph';
import * as R from 'ramda';
import { sharedResponseHeaders } from '../utils';

export interface LiteMojo {
  id: number;
  owner: string;
  delegatedTo: null | string;
}

const lightenMojo = R.pick(['id', 'owner', 'delegatedTo']);

const lightenMojos = R.map(lightenMojo);

const handler: Handler = async (event, context) => {
  const mojos = await mojosQuery();
  const liteMojos: LiteMojo[] = lightenMojos(mojos);
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify(liteMojos),
  };
};

export { handler };
