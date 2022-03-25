import { Handler } from '@netlify/functions';
import { verifyMessage } from '@ethersproject/wallet';
import { has } from 'ramda';
import { bigNumbersEqual, sharedResponseHeaders } from '../utils';
import { isMojoDelegate, isMojoOwner, mojosQuery } from '../theGraph';

interface ErrorReason {
  error: string;
  message: string;
}

const errorBuilder = (error: string, message: string) => ({ error, message });

const invalidBodyCheck = (body: string | undefined | null): false | ErrorReason => {
  if (!body || body.length === 0)
    return {
      error: 'empty_body',
      message: 'Request body is missing or empty',
    };
  if (!has('msg')) return errorBuilder('missing_msg', 'Request is missing msg');
  if (!has('sig')) return errorBuilder('missing_sig', 'Request is missing signature');
  if (!has('signer')) return errorBuilder('missing_signer', 'Request is missing signer');
  return false;
};

const handler: Handler = async (event, context) => {
  const checkResult = invalidBodyCheck(event.body);
  if (checkResult) {
    return {
      statusCode: 400,
      body: JSON.stringify(checkResult),
    };
  }
  const { message, signature, signer } = JSON.parse(event.body);
  const recoveredAddress = verifyMessage(message, signature);
  const validSignature = bigNumbersEqual(signer, recoveredAddress);

  // check for ownership and delegation
  let participantData = {};
  if (event.queryStringParameters.fetchParticipation && validSignature) {
    const normalizedMojos = await mojosQuery();
    participantData = {
      isMojoDelegate: isMojoDelegate(signer, normalizedMojos),
      isMojoOwner: isMojoOwner(signer, normalizedMojos),
    };
  }

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify({
      message,
      signature,
      providedSigner: signer,
      recoveredAddress,
      validSignature,
      ...participantData,
    }),
  };
};

export { handler };
