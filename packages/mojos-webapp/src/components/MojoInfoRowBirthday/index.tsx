import { BigNumber } from '@ethersproject/bignumber';
import React from 'react';
import { isMojoderMojo } from '../../utils/mojosMojo';

import classes from './MojoInfoRowBirthday.module.css';
import _BirthdayIcon from '../../assets/icons/Birthday.svg';

import { Image } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import { AuctionState } from '../../state/slices/auction';

interface MojoInfoRowBirthdayProps {
  mojoId: number;
}

const MojoInfoRowBirthday: React.FC<MojoInfoRowBirthdayProps> = props => {
  const { mojoId } = props;

  // If the mojo is a mojoder mojo, use the next mojo to get the mint date.
  // We do this because we use the auction start time to get the mint date and
  // mojoder mojos do not have an auction start time.
  const mojoIdForQuery = isMojoderMojo(BigNumber.from(mojoId)) ? mojoId + 1 : mojoId;

  const pastAuctions = useAppSelector(state => state.pastAuctions.pastAuctions);
  if (!pastAuctions || !pastAuctions.length) {
    return <></>;
  }

  const startTime = BigNumber.from(
    pastAuctions.find((auction: AuctionState, i: number) => {
      const maybeMojoId = auction.activeAuction?.mojoId;
      return maybeMojoId ? BigNumber.from(maybeMojoId).eq(BigNumber.from(mojoIdForQuery)) : false;
    })?.activeAuction?.startTime || 0,
  );

  if (!startTime) {
    return <>Error fetching mojo birthday</>;
  }

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const birthday = new Date(Number(startTime._hex) * 1000);

  return (
    <div className={classes.birthdayInfoContainer}>
      <span>
        <Image src={_BirthdayIcon} className={classes.birthdayIcon} />
      </span>
      Born
      <span className={classes.mojoInfoRowBirthday}>
        {monthNames[birthday.getUTCMonth()]} {birthday.getUTCDate()}, {birthday.getUTCFullYear()}
      </span>
    </div>
  );
};

export default MojoInfoRowBirthday;
