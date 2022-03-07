import { BigNumber, BigNumberish } from 'ethers';
import Section from '../../layout/Section';
import classes from './HistoryCollection.module.css';
import clsx from 'clsx';
import StandaloneMojo from '../StandaloneMojo';
import { LoadingMojo } from '../Mojo';
import config from '../../config';
import { Container, Row } from 'react-bootstrap';

interface HistoryCollectionProps {
  historyCount: number;
  latestMojoId: BigNumberish;
}

const HistoryCollection: React.FC<HistoryCollectionProps> = (props: HistoryCollectionProps) => {
  const { historyCount, latestMojoId } = props;

  if (!latestMojoId) return null;

  const startAtZero = BigNumber.from(latestMojoId).sub(historyCount).lt(0);

  let mojoIds: Array<BigNumber | null> = new Array(historyCount);
  mojoIds = mojoIds.fill(null).map((_, i) => {
    if (BigNumber.from(i).lt(latestMojoId)) {
      const index = startAtZero
        ? BigNumber.from(0)
        : BigNumber.from(Number(latestMojoId) - historyCount);
      return index.add(i);
    } else {
      return null;
    }
  });

  const mojosContent = mojoIds.map((mojoId, i) => {
    return !mojoId ? <LoadingMojo key={i} /> : <StandaloneMojo key={i} mojoId={mojoId} />;
  });

  return (
    <Section fullWidth={true}>
      <Container fluid>
        <Row className="justify-content-md-center">
          <div className={clsx(classes.historyCollection)}>
            {config.app.enableHistory && mojosContent}
          </div>
        </Row>
      </Container>
    </Section>
  );
};

export default HistoryCollection;
