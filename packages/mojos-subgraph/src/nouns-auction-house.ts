import { BigInt, log } from '@graphprotocol/graph-ts';
import {
  AuctionBid,
  AuctionCreated,
  AuctionExtended,
  AuctionSettled,
} from './types/MojosAuctionHouse/MojosAuctionHouse';
import { Auction, Mojo, Bid } from './types/schema';
import { getOrCreateAccount } from './utils/helpers';

export function handleAuctionCreated(event: AuctionCreated): void {
  let mojoId = event.params.mojoId.toString();

  let mojo = Mojo.load(mojoId);
  if (mojo == null) {
    log.error('[handleAuctionCreated] Mojo #{} not found. Hash: {}', [
      mojoId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  let auction = new Auction(mojoId);
  auction.mojo = mojo.id;
  auction.amount = BigInt.fromI32(0);
  auction.startTime = event.params.startTime;
  auction.endTime = event.params.endTime;
  auction.settled = false;
  auction.save();
}

export function handleAuctionBid(event: AuctionBid): void {
  let mojoId = event.params.mojoId.toString();
  let bidderAddress = event.params.sender.toHex();

  let bidder = getOrCreateAccount(bidderAddress);

  let auction = Auction.load(mojoId);
  if (auction == null) {
    log.error('[handleAuctionBid] Auction not found for Mojo #{}. Hash: {}', [
      mojoId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.amount = event.params.value;
  auction.bidder = bidder.id;
  auction.save();

  // Save Bid
  let bid = new Bid(event.transaction.hash.toHex());
  bid.bidder = bidder.id;
  bid.amount = auction.amount;
  bid.mojo = auction.mojo;
  bid.txIndex = event.transaction.index;
  bid.blockNumber = event.block.number;
  bid.blockTimestamp = event.block.timestamp;
  bid.auction = auction.id;
  bid.save();
}

export function handleAuctionExtended(event: AuctionExtended): void {
  let mojoId = event.params.mojoId.toString();

  let auction = Auction.load(mojoId);
  if (auction == null) {
    log.error('[handleAuctionExtended] Auction not found for Mojo #{}. Hash: {}', [
      mojoId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.endTime = event.params.endTime;
  auction.save();
}

export function handleAuctionSettled(event: AuctionSettled): void {
  let mojoId = event.params.mojoId.toString();

  let auction = Auction.load(mojoId);
  if (auction == null) {
    log.error('[handleAuctionSettled] Auction not found for Mojo #{}. Hash: {}', [
      mojoId,
      event.transaction.hash.toHex(),
    ]);
    return;
  }

  auction.settled = true;
  auction.save();
}
