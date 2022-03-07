import classes from './VoteStatusPill.module.css';

interface VoteStatusPillProps {
  status: string;
  text: string;
}

const VoteStatusPill: React.FC<VoteStatusPillProps> = props => {
  const { status, text } = props;
  switch (status) {
    case 'success':
      return <div className={`${classes.pass} ${classes.mojoButton}`}>{text}</div>;
    case 'failure':
      return <div className={`${classes.fail} ${classes.mojoButton}`}>{text}</div>;
    default:
      return <div className={`${classes.pending} ${classes.mojoButton}`}>{text}</div>;
  }
};

export default VoteStatusPill;
