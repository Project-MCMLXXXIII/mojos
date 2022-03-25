import { Button, Row, Col } from 'react-bootstrap';
import { useAppSelector } from '../../hooks';
import classes from './Winner.module.css';
import ShortAddress from '../ShortAddress';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import { isMobileScreen } from '../../utils/isMobile';

interface WinnerProps {
  winner: string;
  isMojoders?: boolean;
}

const Winner: React.FC<WinnerProps> = props => {
  const { winner, isMojoders } = props;
  const activeAccount = useAppSelector(state => state.account.activeAccount);

  const isCool = useAppSelector(state => state.application.isCoolBackground);
  const isMobile = isMobileScreen();

  const isWinnerYou =
    activeAccount !== undefined && activeAccount.toLocaleLowerCase() === winner.toLocaleLowerCase();

  const nonMojosMojo = isWinnerYou ? (
    <Row className={classes.youSection}>
      <Col lg={4} className={classes.youCopy}>
        <h2
          className={classes.winnerContent}
          style={{
            color: isCool ? 'var(--brand-cool-dark-text)' : 'var(--brand-warm-dark-text)',
          }}
        >
          You
        </h2>
      </Col>
      {!isMobile && (
        <Col>
          <Link to="/verify" className={classes.verifyLink}>
            <Button className={classes.verifyButton}>Get Verified</Button>
          </Link>
        </Col>
      )}
    </Row>
  ) : (
    <ShortAddress size={40} address={winner} avatar={true} />
  );

  const mojosMojoContent = <h2>mojoders.eth</h2>;

  return (
    <>
      <Row className={clsx(classes.wrapper, classes.section)}>
        <Col xs={1} lg={12} className={classes.leftCol}>
          <h4
            style={{
              color: isCool ? 'var(--brand-cool-light-text)' : 'var(--brand-warm-light-text)',
            }}
          >
            Winner
          </h4>
        </Col>
        <Col xs="auto" lg={12}>
          <h2
            className={classes.winnerContent}
            style={{
              color: isCool ? 'var(--brand-cool-dark-text)' : 'var(--brand-warm-dark-text)',
            }}
          >
            {isMojoders ? mojosMojoContent : nonMojosMojo}
          </h2>
        </Col>
      </Row>
      {isWinnerYou && isMobile && (
        <Row>
          <Link to="/verify" className={classes.verifyLink}>
            <Button className={classes.verifyButton}>Get Verified</Button>
          </Link>
        </Row>
      )}
    </>
  );
};

export default Winner;
