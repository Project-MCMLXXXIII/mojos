import { Auction } from '../wrappers/mojosAuction';
import { AuctionState } from '../state/slices/auction';
import { BigNumber } from '@ethersproject/bignumber';

export const isMojoderMojo = (mojoId: BigNumber) => {
  return mojoId.mod(10).eq(0) || mojoId.eq(0);
};

const emptyMojoderAuction = (onDisplayAuctionId: number): Auction => {
  return {
    amount: BigNumber.from(0).toJSON(),
    bidder: '',
    startTime: BigNumber.from(0).toJSON(),
    endTime: BigNumber.from(0).toJSON(),
    mojoId: BigNumber.from(onDisplayAuctionId).toJSON(),
    settled: false,
  };
};

const findAuction = (id: BigNumber, auctions: AuctionState[]): Auction | undefined => {
  return auctions.find(auction => {
    return BigNumber.from(auction.activeAuction?.mojoId).eq(id);
  })?.activeAuction;
};

/**
 *
 * @param mojoId
 * @param pastAuctions
 * @returns empty `Auction` object with `startTime` set to auction after param `mojoId`
 */
export const generateEmptyMojoderAuction = (
  mojoId: BigNumber,
  pastAuctions: AuctionState[],
): Auction => {
  const mojoderAuction = emptyMojoderAuction(mojoId.toNumber());
  // use mojoderAuction.mojoId + 1 to get mint time
  const auctionAbove = findAuction(mojoId.add(1), pastAuctions);
  const auctionAboveStartTime = auctionAbove && BigNumber.from(auctionAbove.startTime);
  if (auctionAboveStartTime) mojoderAuction.startTime = auctionAboveStartTime.toJSON();

  return mojoderAuction;
};
