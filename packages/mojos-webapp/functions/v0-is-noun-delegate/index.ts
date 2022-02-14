import { Handler } from '@netlify/functions';
import { isNounDelegate, mojosQuery } from '../theGraph';
import { sharedResponseHeaders } from '../utils';

const handler: Handler = async (event, context) => {
  const mojos = await mojosQuery();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify(isNounDelegate(event.body, mojos)),
  };
};

export { handler };
