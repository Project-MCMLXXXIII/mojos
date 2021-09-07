import { BigNumber } from 'ethers';
import { IMojoSeed, useMojoSeed, useMojoToken } from '../../wrappers/mojoToken';
import Mojo from '../Mojo';

interface StandaloneMojoProps {
  mojoId: BigNumber;
}

interface StandaloneMojoWithSeedProps {
  mojoId: BigNumber;
  onLoadSeed?: (seed: IMojoSeed) => void;
}

const StandaloneMojo: React.FC<StandaloneMojoProps> = (props: StandaloneMojoProps) => {
  const { mojoId } = props;
  const mojo = useMojoToken(mojoId);

  return <Mojo imgPath={mojo ? mojo.image : ''} alt={mojo ? mojo.description : 'Mojo'} />;
};

export const StandaloneMojoWithSeed: React.FC<StandaloneMojoWithSeedProps> = (
  props: StandaloneMojoWithSeedProps,
) => {
  const { mojoId, onLoadSeed } = props;

  const mojo = useMojoToken(mojoId);
  const seed = useMojoSeed(mojoId);

  if (mojo && seed && onLoadSeed) {
    onLoadSeed(seed);
    return <Mojo imgPath={mojo ? mojo.image : ''} alt={mojo ? mojo.description : 'Mojo'} />;
  } else {
    return <Mojo imgPath="" alt="Mojo" />;
  }
};

export default StandaloneMojo;
