import React from 'react';
import { Col } from 'react-bootstrap';

import classes from './MojoInfoCard.module.css';

import _AddressIcon from '../../assets/icons/Address.svg';
import _BidsIcon from '../../assets/icons/Bids.svg';

import MojoInfoRowBirthday from '../MojoInfoRowBirthday';
import MojoInfoRowHolder from '../MojoInfoRowHolder';
import MojoInfoRowButton from '../MojoInfoRowButton';
import { useAppSelector } from '../../hooks';

import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';

interface MojoInfoCardProps {
  mojoId: number;
  bidHistoryOnClickHandler: () => void;
}

const MojoInfoCard: React.FC<MojoInfoCardProps> = props => {
  const { mojoId, bidHistoryOnClickHandler } = props;

  const etherscanBaseURL = buildEtherscanAddressLink(config.addresses.mojosToken);

  const etherscanButtonClickHandler = () => window.open(`${etherscanBaseURL}/${mojoId}`, '_blank');

  const lastAuctionMojoId = useAppSelector(state => state.onDisplayAuction.lastAuctionMojoId);

  return (
    <>
      <Col lg={12} className={classes.mojoInfoRow}>
        <MojoInfoRowBirthday mojoId={mojoId} />
      </Col>
      <Col lg={12} className={classes.mojoInfoRow}>
        <MojoInfoRowHolder mojoId={mojoId} />
      </Col>
      <Col lg={12} className={classes.mojoInfoRow}>
        <MojoInfoRowButton
          iconImgSource={_BidsIcon}
          btnText={lastAuctionMojoId === mojoId ? 'Bids' : 'Bid history'}
          onClickHandler={bidHistoryOnClickHandler}
        />
        <MojoInfoRowButton
          iconImgSource={_AddressIcon}
          btnText={'Etherscan'}
          onClickHandler={etherscanButtonClickHandler}
        />
      </Col>
    </>
  );
};

export default MojoInfoCard;
