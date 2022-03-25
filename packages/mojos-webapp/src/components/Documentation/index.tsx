import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import classes from './Documentation.module.css';
import Accordion from 'react-bootstrap/Accordion';
import Link from '../Link';

const Documentation = () => {
  const cryptopunksLink = (
    <Link text="CryptoPunks" url="https://www.larvalabs.com/cryptopunks" leavesPage={true} />
  );
  const playgroundLink = <Link text="Playground" url="/playground" leavesPage={false} />;
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
    <Section fullWidth={true}>
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>Own Your Piece Of The Puzzle</h1>
          <p className={classes.aboutText}>
            Mojos are an experimental attempt to improve the formation of on-chain avatar
            communities. While projects such as {cryptopunksLink} have attempted to bootstrap
            digital community and identity, Mojos attempt to bootstrap identity, community,
            governance, and a treasury that can be used by the community.
          </p>
          <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
            Learn more below, or start creating Mojos off-chain using the {playgroundLink}.
          </p>
        </div>
        <Accordion flush>
          <Accordion.Item eventKey="0" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Overview</Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <ul>
                <li>
                  2 Mojos are auctioned every 24 hours, <b>forever.</b>
                </li>
                <li>100% of auction proceeds from Mojos are allocated to the treasury.</li>
                <li>Mojos artwork is in the {publicDomainLink} and owners retain all rights.</li>
                <li>Settlement of one Mojo auction kicks off the next Mojo auction.</li>
                <li>One Mojo is equal to one vote of the treasury balance.</li>
                <li>The treasury is controlled exclusively by Mojos via governance.</li>
                <li>Artwork is generative and stored directly on-chain (not IPFS).</li>
                <li>No explicit rules exist for attribute scarcity; all Mojos are equally rare.</li>
                <li>10% of supply sales for first year will be paid to the team for development</li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              How does it work?
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p className={classes.aboutText}>
                The Mojos smart contract will act as a self-sufficient Mojo generation and
                distribution mechanism, auctioning one Mojo every 24 hours, forever. 100% of auction
                proceeds (FTM) are automatically deposited in the Mojo treasury balance, where they
                are governed by Mojo owners.
              </p>
              <p className={classes.aboutText}>
                Each time an auction is settled, the settlement transaction will also cause a new
                Mojo to be minted and a new 24 hour auction to begin.
              </p>
              <p className={classes.aboutText}>
                While settlement is most heavily incentivized for the winning bidder, it can be
                triggered by anyone, allowing the system to trustlessly auction Mojos as long as
                Fantom is operational and there are interested bidders.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          {/* <Accordion.Item eventKey="2" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Mojos DAO</Accordion.Header>
            <Accordion.Body>
              Mojos DAO utilizes a fork of {compoundGovLink} and is the main governing body of the
              Mojos ecosystem. The Mojos DAO treasury receives 100% of ETH proceeds from daily Mojo
              auctions. Each Mojo is an irrevocable member of Mojos DAO and entitled to one vote in
              all governance matters. Mojo votes are non-transferable (if you sell your Mojo the
              vote goes with it) but delegatable, which means you can assign your vote to someone
              else as long as you own your Mojo.
            </Accordion.Body>
          </Accordion.Item> */}
          <Accordion.Item eventKey="3" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Mojos Community Protection
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p>
                Precautions have been made by the Mojos smart contract. Mojos owners have also given
                themselves a special veto right to ensure that no malicious proposals can be passed
                while the Mojos supply is low. This veto right will only be used if an obviously
                harmful governance proposal has been passed, and is intended as a last resort.
              </p>
              <p>
                Mojos will revoke this veto right when they deem it safe to do so. This decision
                will be based on a healthy distribution of Mojos and a community that is engaged in
                the governance process.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Mojo Traits</Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p>
                Mojos are generated randomly based Fantom block hashes. There are no ‘if’ statements
                or other rules governing Mojo trait scarcity, which makes all Mojos equally rare. As
                of this writing, Mojos are made up of:
              </p>
              <ul>
                <li>backgrounds (2) </li>
                <li>bodies (30)</li>
                <li>accessories (137) </li>
                <li>faces (234) </li>
                <li>headAccessory (21)</li>
              </ul>
              You can experiment with off-chain mojo generation at the {playgroundLink}
            </Accordion.Body>
          </Accordion.Item>
          {/* <Accordion.Item eventKey="5" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              On-Chain Artwork
            </Accordion.Header>
            <Accordion.Body>
              <p>
                Mojos are stored directly on Ethereum and do not utilize pointers to other networks
                such as IPFS. This is possible because Mojo parts are compressed and stored on-chain
                using a custom run-length encoding (RLE), which is a form of lossless compression.
              </p>

              <p>
                The compressed parts are efficiently converted into a single base64 encoded SVG
                image on-chain. To accomplish this, each part is decoded into an intermediate format
                before being converted into a series of SVG rects using batched, on-chain string
                concatenation. Once the entire SVG has been generated, it is base64 encoded.
              </p>
            </Accordion.Body>
          </Accordion.Item> */}
          {/* <Accordion.Item eventKey="6" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Mojo Seeder Contract
            </Accordion.Header>
            <Accordion.Body>
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
                Trait generation is not truly random. Traits can be predicted when minting a Mojo on
                the pending block.
              </p>
            </Accordion.Body>
          </Accordion.Item> */}
          <Accordion.Item eventKey="7" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Founder’s Rewards
            </Accordion.Header>
            <Accordion.Body className={classes.accordionBody}>
              <p>
                100% of Mojos auction proceeds are sent to Mojos DAO after the first year. Because
                of this the Mojos founding team have chosen to compensate themselves with Mojos.
                Every 10th Mojo for the first 5 years of the project (Mojo ids #0, #10, #20, #30 and
                so on) will be automatically sent to the Mojo’s DAO multisig to be vested and shared
                among the founding members of the project.
              </p>
              <p>
                Distributions doesn’t interfere with the cadence of 24 hour auctions. Mojos are sent
                directly to the Founding Team multisig, and auctions continue on schedule with the
                next available Mojo ID.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Section>
  );
};
export default Documentation;
