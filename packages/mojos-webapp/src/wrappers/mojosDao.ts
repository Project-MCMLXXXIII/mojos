import { MojosDAOABI, MojosDaoLogicV1Factory } from '@mojos/sdk';
import { useContractCall, useContractCalls, useContractFunction, useEthers } from '@usedapp/core';
import { utils, BigNumber as EthersBN } from 'ethers';
import { defaultAbiCoder } from 'ethers/lib/utils';
import { useMemo } from 'react';
import { useLogs } from '../hooks/useLogs';
import * as R from 'ramda';
import config from '../config';

export enum Vote {
  AGAINST = 0,
  FOR = 1,
  ABSTAIN = 2,
}

export enum ProposalState {
  UNDETERMINED = -1,
  PENDING,
  ACTIVE,
  CANCELED,
  DEFEATED,
  SUCCEEDED,
  QUEUED,
  EXPIRED,
  EXECUTED,
  VETOED,
}

interface ProposalCallResult {
  id: EthersBN;
  abstainVotes: EthersBN;
  againstVotes: EthersBN;
  forVotes: EthersBN;
  canceled: boolean;
  vetoed: boolean;
  executed: boolean;
  startBlock: EthersBN;
  endBlock: EthersBN;
  eta: EthersBN;
  proposalThreshold: EthersBN;
  proposer: string;
  quorumVotes: EthersBN;
}

interface ProposalDetail {
  target: string;
  value: string;
  functionSig: string;
  callData: string;
}

export interface Proposal {
  id: string | undefined;
  title: string;
  description: string;
  status: ProposalState;
  forCount: number;
  againstCount: number;
  abstainCount: number;
  createdBlock: number;
  startBlock: number;
  endBlock: number;
  eta: Date | undefined;
  proposer: string | undefined;
  proposalThreshold: number;
  quorumVotes: number;
  details: ProposalDetail[];
  transactionHash: string;
}

interface ProposalData {
  data: Proposal[];
  loading: boolean;
}

export interface ProposalTransaction {
  address: string;
  value: string;
  signature: string;
  calldata: string;
}

const abi = new utils.Interface(MojosDAOABI);
const mojosDaoContract = new MojosDaoLogicV1Factory().attach(config.addresses.mojosDAOProxy);
const proposalCreatedFilter = mojosDaoContract.filters?.ProposalCreated(
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
  null,
);

export const useHasVotedOnProposal = (proposalId: string | undefined): boolean => {
  const { account } = useEthers();

  // Fetch a voting receipt for the passed proposal id
  const [receipt] =
    useContractCall<[any]>({
      abi,
      address: mojosDaoContract.address,
      method: 'getReceipt',
      args: [proposalId, account],
    }) || [];
  return receipt?.hasVoted ?? false;
};

export const useProposalCount = (): number | undefined => {
  const [count] =
    useContractCall<[EthersBN]>({
      abi,
      address: mojosDaoContract.address,
      method: 'proposalCount',
      args: [],
    }) || [];
  return count?.toNumber();
};

export const useProposalThreshold = (): number | undefined => {
  const [count] =
    useContractCall<[EthersBN]>({
      abi,
      address: mojosDaoContract.address,
      method: 'proposalThreshold',
      args: [],
    }) || [];
  return count?.toNumber();
};

const useVotingDelay = (mojosDao: string): number | undefined => {
  const [blockDelay] =
    useContractCall<[EthersBN]>({
      abi,
      address: mojosDao,
      method: 'votingDelay',
      args: [],
    }) || [];
  return blockDelay?.toNumber();
};

const countToIndices = (count: number | undefined) => {
  return typeof count === 'number' ? new Array(count).fill(0).map((_, i) => [i + 1]) : [];
};

const useFormattedProposalCreatedLogs = () => {
  const useLogsResult = useLogs(proposalCreatedFilter);

  return useMemo(() => {
    return useLogsResult?.logs?.map(log => {
      const { args: parsed } = abi.parseLog(log);
      return {
        description: parsed.description,
        transactionHash: log.transactionHash,
        details: parsed.targets.map((target: string, i: number) => {
          const signature = parsed.signatures[i];
          const value = parsed[3][i];
          const [name, types] = signature.substr(0, signature.length - 1)?.split('(');
          if (!name || !types) {
            return {
              target,
              functionSig: name === '' ? 'transfer' : name === undefined ? 'unknown' : name,
              callData: types ? types : value ? `${utils.formatEther(value)} ETH` : '',
            };
          }
          const calldata = parsed.calldatas[i];
          const decoded = defaultAbiCoder.decode(types.split(','), calldata);
          return {
            target,
            functionSig: name,
            callData: decoded.join(),
            value: value.gt(0) ? `{ value: ${utils.formatEther(value)} ETH }` : '',
          };
        }),
      };
    });
  }, [useLogsResult]);
};

export const useAllProposals = (): ProposalData => {
  const proposalCount = useProposalCount();
  const votingDelay = useVotingDelay(mojosDaoContract.address);

  const govProposalIndexes = useMemo(() => {
    return countToIndices(proposalCount);
  }, [proposalCount]);

  const proposals = useContractCalls<ProposalCallResult>(
    govProposalIndexes.map(index => ({
      abi,
      address: mojosDaoContract.address,
      method: 'proposals',
      args: [index],
    })),
  );

  const proposalStates = useContractCalls<[ProposalState]>(
    govProposalIndexes.map(index => ({
      abi,
      address: mojosDaoContract.address,
      method: 'state',
      args: [index],
    })),
  );

  const formattedLogs = useFormattedProposalCreatedLogs();

  // Early return until events are fetched
  return useMemo(() => {
    const logs = formattedLogs ?? [];
    if (proposals.length && !logs.length) {
      return { data: [], loading: true };
    }

    const hashRegex = /^\s*#{1,6}\s+([^\n]+)/;
    const equalTitleRegex = /^\s*([^\n]+)\n(={3,25}|-{3,25})/;

    /**
     * Extract a markdown title from a proposal body that uses the `# Title` format
     * Returns null if no title found.
     */
    const extractHashTitle = (body: string) => body.match(hashRegex);
    /**
     * Extract a markdown title from a proposal body that uses the `Title\n===` format.
     * Returns null if no title found.
     */
    const extractEqualTitle = (body: string) => body.match(equalTitleRegex);

    /**
     * Extract title from a proposal's body/description. Returns null if no title found in the first line.
     * @param body proposal body
     */
    const extractTitle = (body: string | undefined): string | null => {
      if (!body) return null;
      const hashResult = extractHashTitle(body);
      const equalResult = extractEqualTitle(body);
      return hashResult ? hashResult[1] : equalResult ? equalResult[1] : null;
    };

    const removeBold = (text: string | null): string | null =>
      text ? text.replace(/\*\*/g, '') : text;
    const removeItalics = (text: string | null): string | null =>
      text ? text.replace(/__/g, '') : text;

    const removeMarkdownStyle = R.compose(removeBold, removeItalics);

    return {
      data: proposals.map((proposal, i) => {
        const description = logs[i]?.description?.replace(/\\n/g, '\n');
        return {
          id: proposal?.id.toString(),
          title: R.pipe(extractTitle, removeMarkdownStyle)(description) ?? 'Untitled',
          description: description ?? 'No description.',
          proposer: proposal?.proposer,
          status: proposalStates[i]?.[0] ?? ProposalState.UNDETERMINED,
          proposalThreshold: parseInt(proposal?.proposalThreshold?.toString() ?? '0'),
          quorumVotes: parseInt(proposal?.quorumVotes?.toString() ?? '0'),
          forCount: parseInt(proposal?.forVotes?.toString() ?? '0'),
          againstCount: parseInt(proposal?.againstVotes?.toString() ?? '0'),
          abstainCount: parseInt(proposal?.abstainVotes?.toString() ?? '0'),
          createdBlock: parseInt(proposal?.startBlock.sub(votingDelay ?? 0)?.toString() ?? ''),
          startBlock: parseInt(proposal?.startBlock?.toString() ?? ''),
          endBlock: parseInt(proposal?.endBlock?.toString() ?? ''),
          eta: proposal?.eta ? new Date(proposal?.eta?.toNumber() * 1000) : undefined,
          details: logs[i]?.details,
          transactionHash: logs[i]?.transactionHash,
        };
      }),
      loading: false,
    };
  }, [formattedLogs, proposalStates, proposals, votingDelay]);
};

export const useProposal = (id: string | number): Proposal | undefined => {
  const { data } = useAllProposals();
  return data?.find(p => p.id === id.toString());
};

export const useCastVote = () => {
  const { send: castVote, state: castVoteState } = useContractFunction(
    mojosDaoContract,
    'castVote',
  );
  return { castVote, castVoteState };
};

export const usePropose = () => {
  const { send: propose, state: proposeState } = useContractFunction(mojosDaoContract, 'propose');
  return { propose, proposeState };
};

export const useQueueProposal = () => {
  const { send: queueProposal, state: queueProposalState } = useContractFunction(
    mojosDaoContract,
    'queue',
  );
  return { queueProposal, queueProposalState };
};

export const useExecuteProposal = () => {
  const { send: executeProposal, state: executeProposalState } = useContractFunction(
    mojosDaoContract,
    'execute',
  );
  return { executeProposal, executeProposalState };
};
