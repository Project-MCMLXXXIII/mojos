import { useQuery } from '@apollo/client';
import React from 'react';
import { Image } from 'react-bootstrap';
import _LinkIcon from '../../assets/icons/Link.svg';
import { mojoQuery } from '../../wrappers/subgraph';
import _HeartIcon from '../../assets/icons/Heart.svg';
import classes from './MojoInfoRowHolder.module.css';

import config from '../../config';
import { buildEtherscanAddressLink } from '../../utils/etherscan';
import ShortAddress from '../ShortAddress';

import { useAppSelector } from '../../hooks';

interface MojoInfoRowHolderProps {
  mojoId: number;
}

const MojoInfoRowHolder: React.FC<MojoInfoRowHolderProps> = props => {
  const { mojoId } = props;
  const isCool = useAppSelector(state => state.application.isCoolBackground);
  const { loading, error, data } = useQuery(mojoQuery(mojoId.toString()));

  const etherscanURL = buildEtherscanAddressLink(data && data.mojo.owner.id);

  if (loading) {
    return (
      <div className={classes.mojoHolderInfoContainer}>
        <span className={classes.mojoHolderLoading}>Loading...</span>
      </div>
    );
  } else if (error) {
    return <div>Failed to fetch mojo info</div>;
  }

  const shortAddressComponent = <ShortAddress address={data && data.mojo.owner.id} />;

  return (
    <div className={classes.mojoHolderInfoContainer}>
      <span>
        <Image src={_HeartIcon} className={classes.heartIcon} />
      </span>
      <span>Held by</span>
      <span>
        <a
          className={
            isCool ? classes.mojoHolderEtherscanLinkCool : classes.mojoHolderEtherscanLinkWarm
          }
          href={etherscanURL}
          target={'_blank'}
          rel="noreferrer"
        >
          {data.mojo.owner.id.toLowerCase() ===
          config.addresses.mojosAuctionHouseProxy.toLowerCase()
            ? 'Mojos Auction House'
            : shortAddressComponent}
        </a>
      </span>
      <span className={classes.linkIconSpan}>
        <Image src={_LinkIcon} className={classes.linkIcon} />
      </span>
    </div>
  );
};

export default MojoInfoRowHolder;
