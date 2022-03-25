import { Handler } from '@netlify/functions';
import { NormalizedMojo, NormalizedVote, mojosQuery } from '../theGraph';
import { sharedResponseHeaders } from '../utils';

interface ProposalVote {
  mojoId: number;
  owner: string;
  delegatedTo: null | string;
  supportDetailed: number;
}

interface ProposalVotes {
  [key: number]: ProposalVote[];
}

const builtProposalVote = (mojo: NormalizedMojo, vote: NormalizedVote): ProposalVote => ({
  mojoId: mojo.id,
  owner: mojo.owner,
  delegatedTo: mojo.delegatedTo,
  supportDetailed: vote.supportDetailed,
});

const reduceProposalVotes = (mojos: NormalizedMojo[]) =>
  mojos.reduce((acc: ProposalVotes, mojo: NormalizedMojo) => {
    for (let i in mojo.votes) {
      const vote = mojo.votes[i];
      if (!acc[vote.proposalId]) acc[vote.proposalId] = [];
      acc[vote.proposalId].push(builtProposalVote(mojo, vote));
    }
    return acc;
  }, {});

const handler: Handler = async (event, context) => {
  const mojos = await mojosQuery();
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      ...sharedResponseHeaders,
    },
    body: JSON.stringify(reduceProposalVotes(mojos)),
  };
};

export { handler };
