import { BigNumber } from 'ethers';
import classes from './AuctionActivityMojoTitle.module.css';

const AuctionActivityMojoTitle: React.FC<{ mojoId: BigNumber }> = props => {
  const { mojoId } = props;
  const mojoIdContent = `Mojo ${mojoId.toString()}`;
  return <h1 className={classes.mojoTitle}>{mojoIdContent}</h1>;
};
export default AuctionActivityMojoTitle;
