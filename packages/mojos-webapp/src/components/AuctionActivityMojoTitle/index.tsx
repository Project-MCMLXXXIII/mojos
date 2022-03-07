import { BigNumber } from 'ethers';
import classes from './AuctionActivityMojoTitle.module.css';

const AuctionActivityMojoTitle: React.FC<{ mojoId: BigNumber; isCool?: boolean }> = props => {
  const { mojoId, isCool } = props;
  const mojoIdContent = `Mojo ${mojoId.toString()}`;
  return (
    <div className={classes.wrapper}>
      <h1 style={{ color: isCool ? 'var(--brand-cool-dark-text)' : 'var(--brand-warm-dark-text)' }}>
        {mojoIdContent}
      </h1>
    </div>
  );
};
export default AuctionActivityMojoTitle;
