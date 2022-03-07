import { Col, Row } from 'react-bootstrap';
import Section from '../../layout/Section';
import { useAllProposals, useProposalThreshold } from '../../wrappers/mojosDao';
import Proposals from '../../components/Proposals';
import classes from './Governance.module.css';
import { utils } from 'ethers/lib/ethers';
import clsx from 'clsx';
import { useTreasuryBalance, useTreasuryUSDValue } from '../../hooks/useTreasuryBalance';

const GovernancePage = () => {
  const { data: proposals } = useAllProposals();
  const threshold = useProposalThreshold();
  const mojosRequired = threshold !== undefined ? threshold + 1 : '...';
  const mojoThresholdCopy = `${mojosRequired} ${threshold === 0 ? 'Mojo' : 'Mojos'}`;

  const treasuryBalance = useTreasuryBalance();
  const treasuryBalanceUSD = useTreasuryUSDValue();

  return (
    <Section fullWidth={false} className={classes.section}>
      <Col lg={10} className={classes.wrapper}>
        <Row className={classes.headerRow}>
          <span>Governance</span>
          <h1>Mojos DAO</h1>
        </Row>
        <p className={classes.subheading}>
          Mojos govern <span className={classes.boldText}>Mojos DAO</span>. Mojos can vote on
          proposals or delegate their vote to a third party. A minimum of{' '}
          <span className={classes.boldText}>{mojoThresholdCopy}</span> is required to submit
          proposals.
        </p>

        <Row className={classes.treasuryInfoCard}>
          <Col lg={8} className={classes.treasuryAmtWrapper}>
            <Row className={classes.headerRow}>
              <span>Treasury</span>
            </Row>
            <Row>
              <Col className={clsx(classes.ethTreasuryAmt)} lg={3}>
                <h1 className={classes.ethSymbol}>Ξ</h1>
                <h1>
                  {treasuryBalance &&
                    Number(Number(utils.formatEther(treasuryBalance)).toFixed(0)).toLocaleString(
                      'en-US',
                    )}
                </h1>
              </Col>
              <Col className={classes.usdTreasuryAmt}>
                <h1 className={classes.usdBalance}>
                  ${' '}
                  {treasuryBalanceUSD &&
                    Number(treasuryBalanceUSD.toFixed(0)).toLocaleString('en-US')}
                </h1>
              </Col>
            </Row>
          </Col>
          <Col className={classes.treasuryInfoText}>
            This treasury exists for <span className={classes.boldText}>Mojos DAO</span>{' '}
            participants to allocate resources for the long-term growth and prosperity of the Mojos
            project.
          </Col>
        </Row>
        <Proposals proposals={proposals} />
      </Col>
    </Section>
  );
};
export default GovernancePage;
