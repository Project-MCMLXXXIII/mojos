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
    <Section fullWidth={false}>
      <Col lg={{ span: 10, offset: 1 }}>
        <div className={classes.headerWrapper}>
          <h1>WTF?</h1>
          <p className={classes.aboutText}>
            mojos are an experimental attempt to improve the formation of on-chain avatar
            communities. While projects such as {cryptopunksLink} have attempted to bootstrap
            digital community and identity, mojos attempt to bootstrap identity, community,
            governance, and a treasury that can be used by the community.
          </p>
          <p className={classes.aboutText} style={{ paddingBottom: '4rem' }}>
            Learn more below, or start creating mojos off-chain using the {playgroundLink}.
          </p>
        </div>
        <Accordion flush>
          <Accordion.Item eventKey="0" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Summary</Accordion.Header>
            <Accordion.Body>
              <ul>
                <li>mojos artwork is in the {publicDomainLink}.</li>
                <li>One Mojos is trustlessly auctioned every 24 hours, forever.</li>
                <li>100% of Mojos auction proceeds are trustlessly sent to the treasury.</li>
                <li>Settlement of one auction kicks off the next.</li>
                <li>All mojos are members of mojos DAO.</li>
                <li>mojos DAO uses a fork of {compoundGovLink}.</li>
                <li>One Mojos is equal to one vote.</li>
                <li>The treasury is controlled exclusively by mojos via governance.</li>
                <li>Artwork is generative and stored directly on-chain (not IPFS).</li>
                <li>No explicit rules exist for attribute scarcity; all mojos are equally rare.</li>
                <li>
                  Mojos receive rewards in the form of mojos (10% of supply for first 5 years).
                </li>
              </ul>
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item eventKey="1" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Daily Auctions</Accordion.Header>
            <Accordion.Body>
              <p className={classes.aboutText}>
                The mojos Auction Contract will act as a self-sufficient Mojos generation and
                distribution mechanism, auctioning one Mojos every 24 hours, forever. 100% of
                auction proceeds (ETH) are automatically deposited in the mojos DAO treasury, where
                they are governed by Mojos owners.
              </p>

              <p className={classes.aboutText}>
                Each time an auction is settled, the settlement transaction will also cause a new
                Mojos to be minted and a new 24 hour auction to begin.{' '}
              </p>
              <p>
                While settlement is most heavily incentivized for the winning bidder, it can be
                triggered by anyone, allowing the system to trustlessly auction mojos as long as
                Ethereum is operational and there are interested bidders.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="2" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>mojos DAO</Accordion.Header>
            <Accordion.Body>
              mojos DAO utilizes a fork of {compoundGovLink} and is the main governing body of the
              mojos ecosystem. The mojos DAO treasury receives 100% of ETH proceeds from daily Mojos
              auctions. Each Mojos is an irrevocable member of mojos DAO and entitled to one vote in
              all governance matters. Mojos votes are non-transferable (if you sell your Mojos the
              vote goes with it) but delegatable, which means you can assign your vote to someone
              else as long as you own your Mojos.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="3" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Governance ‘Slow Start’
            </Accordion.Header>
            <Accordion.Body>
              <p>
                In addition to the precautions taken by Compound Governance, Mojos have given
                themselves a special veto right to ensure that no malicious proposals can be passed
                while the Mojos supply is low. This veto right will only be used if an obviously
                harmful governance proposal has been passed, and is intended as a last resort.
              </p>
              <p>
                Mojos will proveably revoke this veto right when they deem it safe to do so. This
                decision will be based on a healthy Mojos distribution and a community that is
                engaged in the governance process.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="4" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>Mojos Traits</Accordion.Header>
            <Accordion.Body>
              <p>
                mojos are generated randomly based Ethereum block hashes. There are no 'if'
                statements or other rules governing Mojos trait scarcity, which makes all mojos
                equally rare. As of this writing, mojos are made up of:
              </p>
              <ul>
                <li>backgrounds (2) </li>
                <li>bodies (30)</li>
                <li>accessories (137) </li>
                <li>heads (234) </li>
                <li>glasses (21)</li>
              </ul>
              You can experiment with off-chain Mojos generation at the {playgroundLink}.
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="5" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              On-Chain Artwork
            </Accordion.Header>
            <Accordion.Body>
              <p>
                mojos are stored directly on Ethereum and do not utilize pointers to other networks
                such as IPFS. This is possible because Mojos parts are compressed and stored
                on-chain using a custom run-length encoding (RLE), which is a form of lossless
                compression.
              </p>

              <p>
                The compressed parts are efficiently converted into a single base64 encoded SVG
                image on-chain. To accomplish this, each part is decoded into an intermediate format
                before being converted into a series of SVG rects using batched, on-chain string
                concatenation. Once the entire SVG has been generated, it is base64 encoded.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="6" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Mojos Seeder Contract
            </Accordion.Header>
            <Accordion.Body>
              <p>
                The Mojos Seeder contract is used to determine Mojos traits during the minting
                process. The seeder contract can be replaced to allow for future trait generation
                algorithm upgrades. Additionally, it can be locked by the mojos DAO to prevent any
                future updates. Currently, Mojos traits are determined using pseudo-random number
                generation:
              </p>
              <code>keccak256(abi.encodePacked(blockhash(block.number - 1), nounId))</code>
              <br />
              <br />
              <p>
                Trait generation is not truly random. Traits can be predicted when minting a Mojos
                on the pending block.
              </p>
            </Accordion.Body>
          </Accordion.Item>
          <Accordion.Item eventKey="7" className={classes.accordionItem}>
            <Accordion.Header className={classes.accordionHeader}>
              Nounder's Reward
            </Accordion.Header>
            <Accordion.Body>
              <p>'Mojos' are the group of ten builders that initiated mojos. Here are the Mojos:</p>
              <ul>
                <li>
                  <Link
                    text="@cryptoseneca"
                    url="https://twitter.com/cryptoseneca"
                    leavesPage={true}
                  />
                </li>
                <li>
                  <Link
                    text="@supergremplin"
                    url="https://twitter.com/supergremplin"
                    leavesPage={true}
                  />
                </li>
                <li>
                  <Link text="@punk4156" url="https://twitter.com/punk4156" leavesPage={true} />
                </li>
                <li>
                  <Link text="@eboyarts" url="https://twitter.com/eBoyArts" leavesPage={true} />
                </li>
                <li>
                  <Link text="@punk4464" url="https://twitter.com/punk4464" leavesPage={true} />
                </li>
                <li>solimander</li>
                <li>
                  <Link text="@dhof" url="https://twitter.com/dhof" leavesPage={true} />
                </li>
                <li>
                  <Link text="@devcarrot" url="https://twitter.com/carrot_init" leavesPage={true} />
                </li>
                <li>
                  <Link text="@TimpersHD" url="https://twitter.com/TimpersHD" leavesPage={true} />
                </li>
                <li>
                  <Link
                    text="@lastpunk9999"
                    url="https://twitter.com/lastpunk9999"
                    leavesPage={true}
                  />
                </li>
              </ul>
              <p>
                Because 100% of Mojos auction proceeds are sent to mojos DAO, Mojos have chosen to
                compensate themselves with mojos. Every 10th Mojos for the first 5 years of the
                project (Mojos ids #0, #10, #20, #30 and so on) will be automatically sent to the
                Nounder's multisig to be vested and shared among the founding members of the
                project.
              </p>
              <p>
                Nounder distributions don't interfere with the cadence of 24 hour auctions. mojos
                are sent directly to the Nounder's Multisig, and auctions continue on schedule with
                the next available Mojos ID.
              </p>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </Col>
    </Section>
  );
};
export default Documentation;
