import { useContractCall } from '@usedapp/core';
import { BigNumber as EthersBN, utils } from 'ethers';
import { MojosAuctionHouseABI } from '@mojos/sdk';
import config from '../config';
import BigNumber from 'bignumber.js';
import { isMojoderMojo } from '../utils/mojosMojo';
import { useAppSelector } from '../hooks';
import { AuctionState } from '../state/slices/auction';

export enum AuctionHouseContractFunction {
  auction = 'auction',
  duration = 'duration',
  minBidIncrementPercentage = 'minBidIncrementPercentage',
  mojos = 'mojos',
  createBid = 'createBid',
  settleCurrentAndCreateNewAuction = 'settleCurrentAndCreateNewAuction',
}

export interface Auction {
  amount: EthersBN;
  bidder: string;
  endTime: EthersBN;
  startTime: EthersBN;
  mojoId: EthersBN;
  settled: boolean;
}

const abi = new utils.Interface(MojosAuctionHouseABI);

export const useAuction = (auctionHouseProxyAddress: string) => {
  const auction = useContractCall<Auction>({
    abi,
    address: auctionHouseProxyAddress,
    method: 'auction',
    args: [],
  });
  return auction as Auction;
};

export const useAuctionMinBidIncPercentage = () => {
  const minBidIncrement = useContractCall({
    abi,
    address: config.addresses.mojosAuctionHouseProxy,
    method: 'minBidIncrementPercentage',
    args: [],
  });

  if (!minBidIncrement) {
    return;
  }

  return new BigNumber(minBidIncrement[0]);
};

/**
 * Computes timestamp after which a Mojo could vote
 * @param mojoId TokenId of Mojo
 * @returns Unix timestamp after which Mojo could vote
 */
export const useMojoCanVoteTimestamp = (mojoId: number) => {
  const nextMojoId = mojoId + 1;

  const nextMojoIdForQuery = isMojoderMojo(EthersBN.from(nextMojoId)) ? nextMojoId + 1 : nextMojoId;

  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  const maybeMojoCanVoteTimestamp = pastAuctions.find((auction: AuctionState, i: number) => {
    const maybeMojoId = auction.activeAuction?.mojoId;
    return maybeMojoId ? EthersBN.from(maybeMojoId).eq(EthersBN.from(nextMojoIdForQuery)) : false;
  })?.activeAuction?.startTime;

  if (!maybeMojoCanVoteTimestamp) {
    // This state only occurs during loading flashes
    return EthersBN.from(0);
  }

  return EthersBN.from(maybeMojoCanVoteTimestamp);
};
