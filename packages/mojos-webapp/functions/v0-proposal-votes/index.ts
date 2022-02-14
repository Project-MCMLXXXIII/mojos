import { Handler } from '@netlify/functions';
import { NormalizedNoun, NormalizedVote, mojosQuery } from '../theGraph';
import { sharedResponseHeaders } from '../utils';

interface ProposalVote {
  nounId: number;
  owner: string;
  delegatedTo: null | string;
  supportDetailed: number;
}

interface ProposalVotes {
  [key: number]: ProposalVote[];
}

const builtProposalVote = (noun: NormalizedNoun, vote: NormalizedVote): ProposalVote => ({
  nounId: noun.id,
  owner: noun.owner,
  delegatedTo: noun.delegatedTo,
  supportDetailed: vote.supportDetailed,
});

const reduceProposalVotes = (mojos: NormalizedNoun[]) =>
  mojos.reduce((acc: ProposalVotes, noun: NormalizedNoun) => {
    for (let i in noun.votes) {
      const vote = noun.votes[i];
      if (!acc[vote.proposalId]) acc[vote.proposalId] = [];
      acc[vote.proposalId].push(builtProposalVote(noun, vote));
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
