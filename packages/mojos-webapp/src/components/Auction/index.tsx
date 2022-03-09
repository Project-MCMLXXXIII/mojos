import { Col } from 'react-bootstrap';
import { StandaloneMojoWithSeed } from '../StandaloneMojo';
import AuctionActivity from '../AuctionActivity';
import { Row, Container } from 'react-bootstrap';
import { setStateBackgroundColor } from '../../state/slices/application';
import { LoadingMojo } from '../Mojo';
import { Auction as IAuction } from '../../wrappers/mojosAuction';
import classes from './Auction.module.css';
import { IMojoSeed } from '../../wrappers/mojosToken';
import MojosMojo from '../MojosMojoContent';
import { useHistory } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { isMojoderMojo } from '../../utils/mojosMojo';
import {
  setNextOnDisplayAuctionMojoId,
  setPrevOnDisplayAuctionMojoId,
} from '../../state/slices/onDisplayAuction';
import { beige, grey } from '../../utils/mojosBgColors';

interface AuctionProps {
  auction?: IAuction;
}

const Auction: React.FC<AuctionProps> = props => {
  const { auction: currentAuction } = props;

  const history = useHistory();
  const dispatch = useAppDispatch();
  let stateBgColor = useAppSelector(state => state.application.stateBackgroundColor);
  const lastMojoId = useAppSelector(state => state.onDisplayAuction.lastAuctionMojoId);

  const loadedMojoHandler = (seed: IMojoSeed) => {
    dispatch(setStateBackgroundColor(seed.background === 1 ? '#3A3A3A' : beige));
  };

  const prevAuctionHandler = () => {
    dispatch(setPrevOnDisplayAuctionMojoId());
    currentAuction && history.push(`/mojo/${currentAuction.mojoId.toNumber() - 1}`);
  };
  const nextAuctionHandler = () => {
    dispatch(setNextOnDisplayAuctionMojoId());
    currentAuction && history.push(`/mojo/${currentAuction.mojoId.toNumber() + 1}`);
  };

  const mojoContent = currentAuction && (
    <div className={classes.mojoWrapper}>
      <StandaloneMojoWithSeed
        mojoId={currentAuction.mojoId}
        onLoadSeed={loadedMojoHandler}
        shouldLinkToProfile={false}
      />
    </div>
  );

  const loadingMojo = (
    <div className={classes.mojoWrapper}>
      <LoadingMojo />
    </div>
  );

  const currentAuctionActivityContent = currentAuction && lastMojoId && (
    <AuctionActivity
      auction={currentAuction}
      isFirstAuction={currentAuction.mojoId.eq(0)}
      isLastAuction={currentAuction.mojoId.eq(lastMojoId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
      displayGraphDepComps={true}
    />
  );
  const mojosMojoContent = currentAuction && lastMojoId && (
    <MojosMojo
      mintTimestamp={currentAuction.startTime}
      mojoId={currentAuction.mojoId}
      isFirstAuction={currentAuction.mojoId.eq(0)}
      isLastAuction={currentAuction.mojoId.eq(lastMojoId)}
      onPrevAuctionClick={prevAuctionHandler}
      onNextAuctionClick={nextAuctionHandler}
    />
  );

  return (
    <div style={{ backgroundColor: stateBgColor }} className={classes.wrapper}>
      <Container fluid="xl">
        <Row>
          <Col lg={{ span: 6 }} className={classes.mojoContentCol}>
            {currentAuction ? mojoContent : loadingMojo}
          </Col>
          <Col lg={{ span: 6 }} className={classes.auctionActivityCol}>
            {currentAuction &&
              (isMojoderMojo(currentAuction.mojoId)
                ? mojosMojoContent
                : currentAuctionActivityContent)}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Auction;
