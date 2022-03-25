import { BigNumber } from '@ethersproject/bignumber';
import { useAppSelector } from '../hooks';
import { generateEmptyMojoderAuction, isMojoderMojo } from '../utils/mojosMojo';
import { Bid, BidEvent } from '../utils/types';
import { Auction } from './mojosAuction';

const deserializeAuction = (reduxSafeAuction: Auction): Auction => {
  return {
    amount: BigNumber.from(reduxSafeAuction.amount),
    bidder: reduxSafeAuction.bidder,
    startTime: BigNumber.from(reduxSafeAuction.startTime),
    endTime: BigNumber.from(reduxSafeAuction.endTime),
    mojoId: BigNumber.from(reduxSafeAuction.mojoId),
    settled: false,
  };
};

const deserializeBid = (reduxSafeBid: BidEvent): Bid => {
  return {
    mojoId: BigNumber.from(reduxSafeBid.mojoId),
    sender: reduxSafeBid.sender,
    value: BigNumber.from(reduxSafeBid.value),
    extended: reduxSafeBid.extended,
    transactionHash: reduxSafeBid.transactionHash,
    timestamp: BigNumber.from(reduxSafeBid.timestamp),
  };
};
const deserializeBids = (reduxSafeBids: BidEvent[]): Bid[] => {
  return reduxSafeBids
    .map(bid => deserializeBid(bid))
    .sort((a: Bid, b: Bid) => {
      return b.timestamp.toNumber() - a.timestamp.toNumber();
    });
};

const useOnDisplayAuction = (): Auction | undefined => {
  const lastAuctionMojoId = useAppSelector(state => state.auction.activeAuction?.mojoId);
  const onDisplayAuctionMojoId = useAppSelector(
    state => state.onDisplayAuction.onDisplayAuctionMojoId,
  );
  const currentAuction = useAppSelector(state => state.auction.activeAuction);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  if (
    onDisplayAuctionMojoId === undefined ||
    lastAuctionMojoId === undefined ||
    currentAuction === undefined ||
    !pastAuctions
  )
    return undefined;

  // current auction
  if (BigNumber.from(onDisplayAuctionMojoId).eq(lastAuctionMojoId)) {
    return deserializeAuction(currentAuction);
  } else {
    // mojoder auction
    if (isMojoderMojo(BigNumber.from(onDisplayAuctionMojoId))) {
      const emptyMojoderAuction = generateEmptyMojoderAuction(
        BigNumber.from(onDisplayAuctionMojoId),
        pastAuctions,
      );

      return deserializeAuction(emptyMojoderAuction);
    } else {
      // past auction
      const reduxSafeAuction: Auction | undefined = pastAuctions.find(auction => {
        const mojoId = auction.activeAuction && BigNumber.from(auction.activeAuction.mojoId);
        return mojoId && mojoId.toNumber() === onDisplayAuctionMojoId;
      })?.activeAuction;

      return reduxSafeAuction ? deserializeAuction(reduxSafeAuction) : undefined;
    }
  }
};

export const useAuctionBids = (auctionMojoId: BigNumber): Bid[] | undefined => {
  const lastAuctionMojoId = useAppSelector(state => state.onDisplayAuction.lastAuctionMojoId);
  const lastAuctionBids = useAppSelector(state => state.auction.bids);
  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);

  // auction requested is active auction
  if (lastAuctionMojoId === auctionMojoId.toNumber()) {
    return deserializeBids(lastAuctionBids);
  } else {
    // find bids for past auction requested
    const bidEvents: BidEvent[] | undefined = pastAuctions.find(auction => {
      const mojoId = auction.activeAuction && BigNumber.from(auction.activeAuction.mojoId);
      return mojoId && mojoId.eq(auctionMojoId);
    })?.bids;

    return bidEvents && deserializeBids(bidEvents);
  }
};

export default useOnDisplayAuction;
