import { ImageData as data, getMojoData } from '@mojos/assets';
import { buildSVG } from '@mojos/sdk';
import { BigNumber as EthersBN } from 'ethers';
import { IMojoSeed, useMojoSeed } from '../../wrappers/mojosToken';
import Mojo from '../Mojo';
import { Link } from 'react-router-dom';
import classes from './StandaloneMojo.module.css';
import { useDispatch } from 'react-redux';
import { setOnDisplayAuctionMojoId } from '../../state/slices/onDisplayAuction';

interface StandaloneMojoProps {
  mojoId: EthersBN;
}

interface StandaloneMojoWithSeedProps {
  mojoId: EthersBN;
  onLoadSeed?: (seed: IMojoSeed) => void;
  shouldLinkToProfile: boolean;
}

const getMojo = (mojoId: string | EthersBN, seed: IMojoSeed) => {
  const id = mojoId.toString();
  const name = `Mojo ${id}`;
  const description = `Mojo ${id} is a member of the Mojos DAO`;
  const { parts, background } = getMojoData(seed);
  debugger;
  const image = `data:image/svg+xml;base64,${btoa(buildSVG(parts, data.palette, background))}`;

  return {
    name,
    description,
    image,
  };
};

const StandaloneMojo: React.FC<StandaloneMojoProps> = (props: StandaloneMojoProps) => {
  const { mojoId } = props;
  const seed = useMojoSeed(mojoId);
  const mojo = seed && getMojo(mojoId, seed);

  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionMojoId(mojoId.toNumber()));
  };

  return (
    <Link
      to={'/mojo/' + mojoId.toString()}
      className={classes.clickableMojo}
      onClick={onClickHandler}
    >
      <Mojo imgPath={mojo ? mojo.image : ''} alt={mojo ? mojo.description : 'Mojo'} />
    </Link>
  );
};

export const StandaloneMojoWithSeed: React.FC<StandaloneMojoWithSeedProps> = (
  props: StandaloneMojoWithSeedProps,
) => {
  const { mojoId, onLoadSeed, shouldLinkToProfile } = props;

  const dispatch = useDispatch();
  const seed = useMojoSeed(mojoId);

  if (!seed || !mojoId || !onLoadSeed) return <Mojo imgPath="" alt="Mojo" />;

  onLoadSeed(seed);

  const onClickHandler = () => {
    dispatch(setOnDisplayAuctionMojoId(mojoId.toNumber()));
  };

  const { image, description } = getMojo(mojoId, seed);

  const mojo = <Mojo imgPath={image} alt={description} />;
  const mojoWithLink = (
    <Link
      to={'/mojo/' + mojoId.toString()}
      className={classes.clickableMojo}
      onClick={onClickHandler}
    >
      {mojo}
    </Link>
  );
  return shouldLinkToProfile ? mojoWithLink : mojo;
};

export default StandaloneMojo;
