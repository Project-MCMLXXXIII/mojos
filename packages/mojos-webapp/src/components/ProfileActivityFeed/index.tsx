import React, { useState } from 'react';
import { Col, Collapse, Table } from 'react-bootstrap';
import Section from '../../layout/Section';
import classes from './ProfileActivityFeed.module.css';

import { useQuery } from '@apollo/client';
import { Proposal, useAllProposals } from '../../wrappers/mojosDao';
import { createTimestampAllProposals, mojoVotingHistoryQuery } from '../../wrappers/subgraph';
import MojoProfileVoteRow from '../MojoProfileVoteRow';
import { LoadingMojo } from '../Mojo';
import { useMojoCanVoteTimestamp } from '../../wrappers/mojosAuction';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';

interface ProfileActivityFeedProps {
  mojoId: number;
}

interface ProposalInfo {
  id: number;
}

export interface MojoVoteHistory {
  proposal: ProposalInfo;
  support: boolean;
  supportDetailed: number;
}

const ProfileActivityFeed: React.FC<ProfileActivityFeedProps> = props => {
  const { mojoId } = props;

  const MAX_EVENTS_SHOW_ABOVE_FOLD = 5;

  const [truncateProposals, setTruncateProposals] = useState(true);

  const { loading, error, data } = useQuery(mojoVotingHistoryQuery(mojoId));
  const {
    loading: proposalTimestampLoading,
    error: proposalTimestampError,
    data: proposalCreatedTimestamps,
  } = useQuery(createTimestampAllProposals());

  const mojoCanVoteTimestamp = useMojoCanVoteTimestamp(mojoId);

  const { data: proposals } = useAllProposals();

  if (loading || !proposals || !proposals.length || proposalTimestampLoading) {
    return <></>;
  } else if (error || proposalTimestampError) {
    return <div>Failed to fetch mojo activity history</div>;
  }

  const mojoVotes: { [key: string]: MojoVoteHistory } = data.mojo.votes
    .slice(0)
    .reduce((acc: any, h: MojoVoteHistory, i: number) => {
      acc[h.proposal.id] = h;
      return acc;
    }, {});

  const filteredProposals = proposals.filter((p: Proposal, id: number) => {
    return (
      parseInt(proposalCreatedTimestamps.proposals[id].createdTimestamp) >
        mojoCanVoteTimestamp.toNumber() ||
      (p.id && mojoVotes[p.id])
    );
  });

  return (
    <Section fullWidth={false}>
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>Activity</h1>
        </div>
        {filteredProposals && filteredProposals.length ? (
          <>
            <Table responsive hover className={classes.aboveTheFoldEventsTable}>
              <tbody className={classes.mojoInfoPadding}>
                {filteredProposals?.length ? (
                  filteredProposals
                    .slice(0)
                    .reverse()
                    .slice(0, MAX_EVENTS_SHOW_ABOVE_FOLD)
                    .map((p: Proposal, i: number) => {
                      const vote = p.id ? mojoVotes[p.id] : undefined;
                      return <MojoProfileVoteRow proposal={p} vote={vote} key={i} />;
                    })
                ) : (
                  <LoadingMojo />
                )}
              </tbody>
            </Table>
            <Collapse in={!truncateProposals}>
              <div>
                <Table responsive hover>
                  <tbody className={classes.mojoInfoPadding}>
                    {filteredProposals?.length ? (
                      filteredProposals
                        .slice(0)
                        .reverse()
                        .slice(MAX_EVENTS_SHOW_ABOVE_FOLD, filteredProposals.length)
                        .map((p: Proposal, i: number) => {
                          const vote = p.id ? mojoVotes[p.id] : undefined;
                          return <MojoProfileVoteRow proposal={p} vote={vote} key={i} />;
                        })
                    ) : (
                      <LoadingMojo />
                    )}
                  </tbody>
                </Table>
              </div>
            </Collapse>

            {filteredProposals.length <= MAX_EVENTS_SHOW_ABOVE_FOLD ? (
              <></>
            ) : (
              <>
                {truncateProposals ? (
                  <div
                    className={classes.expandCollapseCopy}
                    onClick={() => setTruncateProposals(false)}
                  >
                    Show all {filteredProposals.length} events{' '}
                    <FontAwesomeIcon icon={faChevronDown} />
                  </div>
                ) : (
                  <div
                    className={classes.expandCollapseCopy}
                    onClick={() => setTruncateProposals(true)}
                  >
                    Show fewer <FontAwesomeIcon icon={faChevronUp} />
                  </div>
                )}
              </>
            )}
          </>
        ) : (
          <div className={classes.nullStateCopy}>
            This Mojo has no activity, since it was just created. Check back soon!
          </div>
        )}
      </Col>
    </Section>
  );
};

export default ProfileActivityFeed;
