import React from 'react';
import classes from './AuctionNavigation.module.css';

const AuctionNavigation: React.FC<{
  isFirstAuction: boolean;
  isLastAuction: boolean;
  onPrevAuctionClick: () => void;
  onNextAuctionClick: () => void;
}> = props => {
  const { isFirstAuction, isLastAuction, onPrevAuctionClick, onNextAuctionClick } = props;
  return (
    <>
      <button onClick={onPrevAuctionClick} className={classes.leftArrow} disabled={isFirstAuction}>
        ←
      </button>
      <button onClick={onNextAuctionClick} className={classes.rightArrow} disabled={isLastAuction}>
        →
      </button>
    </>
  );
};
export default AuctionNavigation;
