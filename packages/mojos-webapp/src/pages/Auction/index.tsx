import { BigNumber } from 'ethers';
import Banner from '../../components/Banner';
import Auction from '../../components/Auction';
import Documentation from '../../components/Documentation';
import HistoryCollection from '../../components/HistoryCollection';
import { useAuction } from '../../wrappers/mojosAuction';
import { setUseGreyBackground } from '../../state/slices/application';
import { useAppDispatch } from '../../hooks';
import config from '../../config';

const AuctionPage = () => {
  const auction = useAuction(config.auctionProxyAddress);

  const dispatch = useAppDispatch();

  return (
    <>
      <Auction
        auction={auction}
        bgColorHandler={useGrey => dispatch(setUseGreyBackground(useGrey))}
      />
      <Banner />
      <HistoryCollection
        latestMojoId={auction && BigNumber.from(auction.mojoId)}
        historyCount={10}
      />
      <Documentation />
    </>
  );
};
export default AuctionPage;
