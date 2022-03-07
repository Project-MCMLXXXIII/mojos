import { useContractCall, useEthers } from '@usedapp/core';
import { BigNumber as EthersBN, utils } from 'ethers';
import { MojosTokenABI } from '@mojos/contracts';
import config from '../config';

interface MojoToken {
  name: string;
  description: string;
  image: string;
}

export interface IMojoSeed {
  accessory: number;
  background: number;
  body: number;
  glasses: number;
  head: number;
}

const abi = new utils.Interface(MojosTokenABI);

export const useMojoToken = (mojoId: EthersBN) => {
  const [mojo] =
    useContractCall<[string]>({
      abi,
      address: config.addresses.mojosToken,
      method: 'dataURI',
      args: [mojoId],
    }) || [];

  if (!mojo) {
    return;
  }

  const mojoImgData = mojo.split(';base64,').pop() as string;
  const json: MojoToken = JSON.parse(atob(mojoImgData));

  return json;
};

export const useMojoSeed = (mojoId: EthersBN) => {
  const seed = useContractCall<IMojoSeed>({
    abi,
    address: config.addresses.mojosToken,
    method: 'seeds',
    args: [mojoId],
  });
  debugger;
  return seed;
};

export const useUserVotes = (): number | undefined => {
  const { account } = useEthers();
  const [votes] =
    useContractCall<[EthersBN]>({
      abi,
      address: config.addresses.mojosToken,
      method: 'getCurrentVotes',
      args: [account],
    }) || [];
  return votes?.toNumber();
};

export const useUserDelegatee = (): string | undefined => {
  const { account } = useEthers();
  const [delegate] =
    useContractCall<[string]>({
      abi,
      address: config.addresses.mojosToken,
      method: 'delegates',
      args: [account],
    }) || [];
  return delegate;
};

export const useUserVotesAsOfBlock = (block: number | undefined): number | undefined => {
  const { account } = useEthers();

  // Check for available votes
  const [votes] =
    useContractCall<[EthersBN]>({
      abi,
      address: config.addresses.mojosToken,
      method: 'getPriorVotes',
      args: [account, block],
    }) || [];
  return votes?.toNumber();
};
