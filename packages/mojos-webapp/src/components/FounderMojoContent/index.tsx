import { Col, Row } from 'react-bootstrap';
import { BigNumber } from 'ethers';
import AuctionActivityWrapper from '../AuctionActivityWrapper';
import AuctionNavigation from '../AuctionNavigation';
import AuctionActivityMojoTitle from '../AuctionActivityMojoTitle';
import AuctionActivityDateHeadline from '../AuctionActivityDateHeadline';
import { Link } from 'react-router-dom';
import mojoContentClasses from './FounderMojoContent.module.css';
import auctionBidClasses from '../AuctionActivity/BidHistory.module.css';
import bidBtnClasses from '../BidHistoryBtn//BidHistoryBtn.module.css';
import auctionActivityClasses from '../AuctionActivity/AuctionActivity.module.css';

const FounderMojoContent: React.FC<{
  mintTimestamp: BigNumber;
  mojoId: BigNumber;
  isFirstAuction: boolean;
  isLastAuction: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
}> = props => {
  const {
    mintTimestamp,
    mojoId,
    isFirstAuction,
    isLastAuction,
    onPrevAuctionClick,
    onNextAuctionClick,
  } = props;

  return (
    <AuctionActivityWrapper>
      <div className={auctionActivityClasses.informationRow}>
        <Row className={auctionActivityClasses.activityRow}>
          <Col lg={12}>
            <AuctionActivityDateHeadline startTime={mintTimestamp} />
          </Col>
          <Col lg={12} className={auctionActivityClasses.colAlignCenter}>
            <AuctionActivityMojoTitle mojoId={mojoId} />
              <AuctionNavigation
                isFirstAuction={isFirstAuction}
                isLastAuction={isLastAuction}
                onNextAuctionClick={onNextAuctionClick}
                onPrevAuctionClick={onPrevAuctionClick}
              />
          </Col>
        </Row>
        <Row className={auctionActivityClasses.activityRow}>
          <Col lg={5} className={`${auctionActivityClasses.currentBidCol} ${mojoContentClasses.currentBidCol}`}>
            <div className={auctionActivityClasses.section}>
              <h4>Owner</h4>
              <h2>
                mojos.eth.todo
              </h2>
            </div>
          </Col>
        </Row>
      </div>
      <Row className={auctionActivityClasses.activityRow}>
        <Col lg={12}>
        <ul className={auctionBidClasses.bidCollection}>
          <li className={`${auctionBidClasses.bidRow} ${mojoContentClasses.bidRow}`}>
            All Mojo auction proceeds are sent to the <Link to="vote" className={mojoContentClasses.link}>Mojos DAO</Link>. For this reason, we, the project's founders (‘Founders’) have chosen to compensate ourselves with Mojos. Every 10th Mojo for the first 5 years of the project will be sent to our multisig (5/10), where it will be vested and distributed to individual Founders.
          </li>
        </ul>

        <div className={bidBtnClasses.bidHistoryWrapper}>
            <Link to="founders" className={bidBtnClasses.bidHistory}>Learn More →</Link>
        </div>
        </Col>
      </Row>
    </AuctionActivityWrapper>
  );
};
export default FounderMojoContent;
