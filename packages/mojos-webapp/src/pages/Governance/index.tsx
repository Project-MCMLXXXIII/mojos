import { Col } from 'react-bootstrap';
import Section from '../../layout/Section';
import { useAllProposals, useProposalThreshold } from '../../wrappers/mojosDao';
import Proposals from '../../components/Proposals';
import classes from './Governance.module.css';

const GovernancePage = () => {
  const { data: proposals } = useAllProposals();
  const threshold = useProposalThreshold();
  const mojosRequired = threshold !== undefined ? threshold + 1 : '...';
  const nounThresholdCopy = `${mojosRequired} ${threshold === 0 ? 'Mojos' : 'mojos'}`;

  return (
    <Section fullWidth={true}>
      <Col lg={{ span: 8, offset: 2 }}>
        <h1 className={classes.heading}>mojos DAO Governance</h1>
        <p className={classes.subheading}>
          mojos govern mojosDAO. mojos can vote on proposals or delegate their vote to a third
          party. A minimum of {nounThresholdCopy} is required to submit proposals.
        </p>
        <Proposals proposals={proposals} />
      </Col>
    </Section>
  );
};
export default GovernancePage;
