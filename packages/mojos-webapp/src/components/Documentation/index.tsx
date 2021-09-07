import Section from '../../layout/Section';
import { Col, Card } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';

const Documentation = () => {
  const cryotopunksLink = (
    <Link text="Cryptopunks" url="https://www.larvalabs.com/cryptopunks" leavesPage={true} />
  );
  const playgroundLink = <Link text="mojos playground" url="/playground" leavesPage={false} />;
  const publicDomainLink = (
    <Link
      text="public domain"
      url="https://creativecommons.org/publicdomain/zero/1.0/"
      leavesPage={true}
    />
  );
  const compoundGovLink = (
    <Link text="Compound Governance" url="https://compound.finance/governance" leavesPage={true} />
  );
  return (
    <Section bgColor="white" fullWidth={false}>
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>WTF?</h1>
          <p>
            Mojos are an experimental attempt to improve the formation of on-chain avatar
            communities. While projects such as {cryotopunksLink} have attempted to bootstrap
            digital community and identity, Mojos attempt to bootstrap identity, community,
            governance and a treasury that can be used by the community for the creation of
            long-term value.
          </p>
          <p>
            Learn more about on-chain mojos below, or make some off-chain mojos using{' '}
            {playgroundLink}.
          </p>
        </div>
        <Accordion>
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="0" className={classes.cardHeader}>
              Summary <i className={classes.arrowRight}></i>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                <ul>
                  <li>mojos artwork is {publicDomainLink}</li>
                  <li>1 mojo trustlessly auctioned every 24 hours, forever</li>
                  <li>100% of mojo auction proceeds are trustlessly sent to Mojos DAO treasury</li>
                  <li>settlement of one auction kicks off the next</li>
                  <li>all mojos are members of Mojos DAO</li>
                  <li>Mojos DAO uses a fork of {compoundGovLink}</li>
                  <li>1 mojo = 1 vote</li>
                  <li>treasury is controlled exclusively by mojos via governance</li>
                  <li>artwork is generative and stored directly on-chain (not IPFS)</li>
                  <li>no explicit rules for attribute scarcity, all mojos are equally rare</li>
                  <li>
                    'Founders' receive rewards in the form of mojos (10% of supply for first 5
                    years)
                  </li>
                </ul>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="1" className={classes.cardHeader}>
              Daily Auctions
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="1">
              <Card.Body>
                <p>
                  The Mojos Auction Contract will act as a self-sufficient mojo generation and
                  distribution mechanism, auctioning one mojo every 24 hours, forever. 100% of
                  auction proceeds (ETH) are automatically deposited in the Mojos DAO treasury,
                  where they are governed by mojo owners.
                </p>

                <p>
                  Each time an auction is settled, the settlement transaction will also cause a new
                  mojo to be minted and a new 24 hour auction to begin.{' '}
                </p>
                <p>
                  While settlement is most heavily incentivized for the winning bidder, it can be
                  triggered by anyone, allowing the system to trustlessly auction mojos as long as
                  Ethereum is operational and there are interested bidders.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="2" className={classes.cardHeader}>
              Mojos DAO
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="2">
              <Card.Body>
                Mojos DAO utilizes a fork of {compoundGovLink} and is the main governing body of the
                Mojos ecosystem. The Mojos DAO treasury receives 100% of ETH proceeds from daily
                mojo auctions. Each mojo is an irrevocable member of Mojos DAO and entitled to one
                vote in all governance matters. Mojo votes are non-transferable (if you sell your
                mojo the vote goes with it) but delegatable, which means you can assign your vote to
                someone else as long as you own your mojo.
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="4" className={classes.cardHeader}>
              Governance ‘Slow Start’
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="4">
              <Card.Body>
                <p>
                  In addition to the precautions taken by Compound Governance, Founders have given
                  themselves a special veto right to ensure that no malicious proposals can be
                  passed while the mojo supply is low. This veto right will only be used if an
                  obviously harmful governance proposal has been passed, and is intended as a last
                  resort.
                </p>
                <p>
                  Founders will proveably revoke this veto right when they deem it safe to do so.
                  This decision will be based on a healthy mojo distribution and a community that is
                  engaged in the governance process.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="5" className={classes.cardHeader}>
              Mojo Traits
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="5">
              <Card.Body>
                <p>
                  Mojos are generated randomly based Ethereum block hashes. There are no 'if'
                  statements or other rules governing mojo trait scarcity, which makes all mojos
                  equally rare. As of this writing, mojos are made up of:
                </p>
                <ul>
                  <li>backgrounds (2) </li>
                  <li>bodies (30)</li>
                  <li>accessories (137) </li>
                  <li>heads (234) </li>
                  <li>glasses (21)</li>
                </ul>
                You can experiment with off-chain mojo generation at the {playgroundLink}
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="6" className={classes.cardHeader}>
              On-Chain Artwork
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="6">
              <Card.Body>
                <p>
                  Mojos are stored directly on Ethereum and do not utilize pointers to other
                  networks such as IPFS. This is possible because mojo parts are compressed and
                  stored on-chain using a custom run-length encoding (RLE), which is a form of
                  lossless compression.
                </p>

                <p>
                  The compressed parts are efficiently converted into a single base64 encoded SVG
                  image on-chain. To accomplish this, each part is decoded into an intermediate
                  format before being converted into a series of SVG rects using batched, on-chain
                  string concatenation. Once the entire SVG has been generated, it is base64
                  encoded.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="7" className={classes.cardHeader}>
              Mojo Seeder Contract
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="7">
              <Card.Body>
                <p>
                  The Mojo Seeder contract is used to determine Mojo traits during the minting
                  process. The seeder contract can be replaced to allow for future trait generation
                  algorithm upgrades. Additionally, it can be locked by the Mojos DAO to prevent any
                  future updates. Currently, Mojo traits are determined using pseudo-random number
                  generation:
                </p>
                <code>keccak256(abi.encodePacked(blockhash(block.number - 1), mojoId))</code>
                <br />
                <br />
                <p>
                  Trait generation is not truly random. Traits can be predicted when minting a Mojo
                  on the pending block.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card className={classes.card}>
            <Accordion.Toggle as={Card.Header} eventKey="3" className={classes.cardHeader}>
              Founder's Rewards
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="3">
              <Card.Body>
                <p>
                  'Founders' are the group of ten builders that initiated Mojos. Here are the
                  Founders:
                </p>
                <ul>
                  <li>@cryptoseneca</li>
                  <li>@supergremplin</li>
                  <li>@punk4156</li>
                  <li>@eboyarts</li>
                  <li>@punk4464</li>
                  <li>solimander</li>
                  <li>@dhof</li>
                  <li>devcarrot</li>
                  <li>@TimpersHD</li>
                  <li>@lastpunk9999</li>
                </ul>
                <p>
                  Because 100% of mojo auction proceeds are sent to Mojos DAO, Founders have chosen
                  to compensate themselves with mojos. Every 10th mojo for the first 5 years of the
                  project (mojo ids #0, #10, #20, #30 and so on) will be automatically sent to the
                  Founder's multisig to be vested and shared among the founding members of the
                  project.
                </p>
                <p>
                  Founder distributions don't interfere with the cadence of 24 hour auctions. Mojos
                  are sent directly to the Founder's Multisig, and auctions continue on schedule
                  with the next available mojo ID.
                </p>
              </Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>
    </Section>
  );
};
export default Documentation;
