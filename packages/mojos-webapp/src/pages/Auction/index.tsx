import Banner from '../../components/Banner';
import Auction from '../../components/Auction';
import Documentation from '../../components/Documentation';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { setOnDisplayAuctionMojoId } from '../../state/slices/onDisplayAuction';
import { push } from 'connected-react-router';
import { mojoPath } from '../../utils/history';
import useOnDisplayAuction from '../../wrappers/onDisplayAuction';
import { useEffect } from 'react';
import ProfileActivityFeed from '../../components/ProfileActivityFeed';

interface AuctionPageProps {
  initialAuctionId?: number;
}

const AuctionPage: React.FC<AuctionPageProps> = props => {
  const { initialAuctionId } = props;
  const onDisplayAuction = useOnDisplayAuction();
  const lastAuctionMojoId = useAppSelector(state => state.onDisplayAuction.lastAuctionMojoId);
  const onDisplayAuctionMojoId = onDisplayAuction?.mojoId.toNumber();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!lastAuctionMojoId) return;

    if (initialAuctionId !== undefined) {
      // handle out of bounds mojo path ids
      if (initialAuctionId > lastAuctionMojoId || initialAuctionId < 0) {
        dispatch(setOnDisplayAuctionMojoId(lastAuctionMojoId));
        dispatch(push(mojoPath(lastAuctionMojoId)));
      } else {
        if (onDisplayAuction === undefined) {
          // handle regular mojo path ids on first load
          dispatch(setOnDisplayAuctionMojoId(initialAuctionId));
        }
      }
    } else {
      // no mojo path id set
      if (lastAuctionMojoId) {
        dispatch(setOnDisplayAuctionMojoId(lastAuctionMojoId));
      }
    }
  }, [lastAuctionMojoId, dispatch, initialAuctionId, onDisplayAuction]);

  return (
    <>
      <Auction auction={onDisplayAuction} />
      {onDisplayAuctionMojoId && onDisplayAuctionMojoId !== lastAuctionMojoId ? (
        <ProfileActivityFeed mojoId={onDisplayAuctionMojoId} />
      ) : (
        <Banner />
      )}
      <Documentation />
    </>
  );
};
export default AuctionPage;
