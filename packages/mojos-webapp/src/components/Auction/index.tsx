import { Col } from 'react-bootstrap';
import { StandaloneMojoWithSeed } from '../StandaloneMojo';
import AuctionActivity from '../AuctionActivity';
import { Row, Container } from 'react-bootstrap';
import { LoadingMojo } from '../Mojo';
import { Auction as IAuction } from '../../wrappers/mojosAuction';
import classes from './Auction.module.css';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { auctionQuery } from '../../wrappers/subgraph';
import { BigNumber } from 'ethers';
import { IMojoSeed } from '../../wrappers/mojoToken';
import FounderMojoContent from '../FounderMojoContent';
import { ApolloError } from '@apollo/client';

const isFounderMojo = (mojoId: BigNumber) => {
  return mojoId.mod(10).eq(0) || mojoId.eq(0);
};

const prevAuctionsAvailable = (
  loadingPrev: boolean,
  errorPrev: ApolloError | undefined,
  prevAuction: IAuction,
) => {
  return !loadingPrev && prevAuction !== undefined && !errorPrev;
};

const createAuctionObj = (data: any): IAuction => {
  const auction: IAuction = {
    amount: BigNumber.from(data.auction.amount),
    bidder: data.auction?.bidder?.id,
    endTime: data.auction.endTime,
    startTime: data.auction.startTime,
    length: data.auction.endTime - data.auction.startTime,
    mojoId: data.auction.id,
    settled: data.auction.settled,
  };
  return auction;
};

const Auction: React.FC<{ auction: IAuction; bgColorHandler: (useGrey: boolean) => void }> =
  props => {
    const { auction: currentAuction, bgColorHandler } = props;

    const [onDisplayMojoId, setOnDisplayMojoId] = useState(currentAuction && currentAuction.mojoId);
    const [lastAuctionId, setLastAuctionId] = useState(currentAuction && currentAuction.mojoId);
    const [isLastAuction, setIsLastAuction] = useState(true);
    const [isFirstAuction, setIsFirstAuction] = useState(false);

    // Query onDisplayMojoId auction. Used to display past auctions' data.
    const { data: dataCurrent } = useQuery(
      auctionQuery(onDisplayMojoId && onDisplayMojoId.toNumber()),
    );
    // Query onDisplayMojoId auction plus one. Used to determine founder mojo timestamp.
    const { data: dataNext } = useQuery(
      auctionQuery(onDisplayMojoId && onDisplayMojoId.add(1).toNumber()),
    );

    // Query onDisplayMojoId auction minus one. Used to cache prev auction + check if The Graph queries are functional.
    const {
      loading: loadingPrev,
      data: dataPrev,
      error: errorPrev,
    } = useQuery(auctionQuery(onDisplayMojoId && onDisplayMojoId.sub(1).toNumber()), {
      pollInterval: 10000,
    });

    /**
     * Auction derived from `onDisplayMojoId` query
     */
    const auction: IAuction = dataCurrent && dataCurrent.auction && createAuctionObj(dataCurrent);
    /**
     * Auction derived from `onDisplayMojoId.add(1)` query
     */
    const nextAuction: IAuction = dataNext && dataNext.auction && createAuctionObj(dataNext);
    /**
     * Auction derived from `onDisplayMojoId.sub(1)` query
     */
    const prevAuction: IAuction = dataPrev && dataPrev.auction && createAuctionObj(dataPrev);

    const loadedMojoHandler = (seed: IMojoSeed) => {
      bgColorHandler(seed.background === 0);
    };

    useEffect(() => {
      if (!onDisplayMojoId || (currentAuction && currentAuction.mojoId.gt(lastAuctionId))) {
        setOnDisplayMojoId(currentAuction && currentAuction.mojoId);
        setLastAuctionId(currentAuction && currentAuction.mojoId);
      }
    }, [onDisplayMojoId, currentAuction, lastAuctionId]);

    const auctionHandlerFactory = (mojoIdMutator: (prev: BigNumber) => BigNumber) => () => {
      setOnDisplayMojoId(prev => {
        const updatedMojoId = mojoIdMutator(prev);
        setIsFirstAuction(updatedMojoId.eq(0) ? true : false);
        setIsLastAuction(updatedMojoId.eq(currentAuction && currentAuction.mojoId) ? true : false);
        return updatedMojoId;
      });
    };

    const prevAuctionHandler = auctionHandlerFactory((prev: BigNumber) => prev.sub(1));
    const nextAuctionHandler = auctionHandlerFactory((prev: BigNumber) => prev.add(1));

    const mojoContent = (
      <div className={classes.mojoWrapper}>
        <StandaloneMojoWithSeed mojoId={onDisplayMojoId} onLoadSeed={loadedMojoHandler} />
      </div>
    );

    const loadingMojo = (
      <div className={classes.mojoWrapper}>
        <LoadingMojo />
      </div>
    );

    const auctionActivityContent = (auction: IAuction, displayGraphDepComps: boolean) => (
      <AuctionActivity
        auction={auction}
        isFirstAuction={isFirstAuction}
        isLastAuction={isLastAuction}
        onPrevAuctionClick={prevAuctionHandler}
        onNextAuctionClick={nextAuctionHandler}
        displayGraphDepComps={displayGraphDepComps}
      />
    );

    const currentAuctionActivityContent =
      currentAuction &&
      auctionActivityContent(
        currentAuction,
        onDisplayMojoId && prevAuctionsAvailable(loadingPrev, errorPrev, prevAuction), // else check if prev auct is avail
      );

    const pastAuctionActivityContent =
      auction &&
      auctionActivityContent(auction, prevAuctionsAvailable(loadingPrev, errorPrev, prevAuction));

    const founderMojoContent = nextAuction && (
      <FounderMojoContent
        mintTimestamp={nextAuction.startTime}
        mojoId={onDisplayMojoId}
        isFirstAuction={isFirstAuction}
        isLastAuction={isLastAuction}
        onPrevAuctionClick={prevAuctionHandler}
        onNextAuctionClick={nextAuctionHandler}
      />
    );

    return (
      <Container fluid="lg">
        <Row>
          <Col lg={{ span: 6 }} className={classes.mojoContentCol}>
            {onDisplayMojoId ? mojoContent : loadingMojo}
          </Col>
          <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
            {onDisplayMojoId && isFounderMojo(onDisplayMojoId)
              ? founderMojoContent
              : isLastAuction
              ? currentAuctionActivityContent
              : pastAuctionActivityContent}
          </Col>
        </Row>
      </Container>
    );
  };

export default Auction;
