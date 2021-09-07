import React from 'react';
import classes from './MojosPage.module.css';
import Section from '../../layout/Section';
import { Col, Row, Card } from 'react-bootstrap';

const bios = [
  {
    name: '4156',
    image: 'https://pbs.twimg.com/profile_images/1427291352254095361/Syua0jjs_400x400.jpg',
    description: undefined,
    handle: 'punk4156',
  },
  {
    name: 'cryptoseneca',
    image: 'https://pbs.twimg.com/profile_images/1424812781396692992/fxnkc6FK_400x400.jpg',
    description: undefined,
    handle: 'cryptoseneca',
  },
  {
    name: 'Kai@eboy',
    image: 'https://pbs.twimg.com/profile_images/1425696316785532931/z3DhhLmv_400x400.jpg',
    description: undefined,
    handle: 'eBoyArts',
  },
  {
    name: 'dom',
    image: 'https://pbs.twimg.com/profile_images/1424866679104868358/FoE9kefa_400x400.jpg',
    description: undefined,
    handle: 'dhof',
  },
  {
    name: 'vapeape',
    image: 'https://pbs.twimg.com/profile_images/1425124752495054853/HZdD7xGp_400x400.jpg',
    description: undefined,
    handle: 'punk4464',
  },
  {
    name: 'gremplin',
    image: 'https://pbs.twimg.com/profile_images/1426784131073986568/X8DyfmgW_400x400.jpg',
    description: undefined,
    handle: 'supergremplin',
  },
  {
    name: 'solimader',
    image: 'https://avatars.githubusercontent.com/u/85371573?v=4',
    description: undefined,
    handle: '',
  },
  {
    name: 'devcarrot',
    image: 'https://pbs.twimg.com/profile_images/1424432415796195335/FyMNOjQ3_400x400.jpg',
    description: undefined,
    handle: 'carrot_init',
  },
  {
    name: 'timpers',
    image: 'https://pbs.twimg.com/profile_images/1427009618107117573/rUYTq68W_400x400.jpg',
    description: undefined,
    handle: 'TimpersHD',
  },
  {
    name: '9999',
    image: 'https://pbs.twimg.com/profile_images/1425183530817052678/1MCh18JH_400x400.png',
    description: undefined,
    handle: 'lastpunk9999',
  },
];

const BioCard: React.FC<{
  name: string;
  description?: string | undefined;
  image: string;
  handle?: string | undefined;
}> = props => {
  const { name, description, image, handle } = props;
  return (
    <>
      <Card.Img variant="top" src={image} />
      <Card.Title>
        {handle && (
          <a href={`https://twitter.com/${handle}`} target="_blank" rel="noreferrer">
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
              className={classes.twitterIcon}
              data-v-6cab4e66=""
            >
              <path
                d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84"
                data-v-6cab4e66=""
              ></path>
            </svg>{' '}
            {name}
          </a>
        )}

        {!handle && name}
      </Card.Title>
      {description && <Card.Text>{description}</Card.Text>}
    </>
  );
};

const BioCards: React.FC<{ min: number; max: number }> = props => {
  const { min, max } = props;
  return (
    <>
      {bios.slice(min, max).map(bio => (
        <Col xs={4} lg={3} className={classes.bioGroup}>
          <BioCard {...bio} />
        </Col>
      ))}
    </>
  );
};

const MojosPage = () => {
  return (
    <Section bgColor="transparent" fullWidth={true} className={classes.mojosPage}>
      <Col lg={{ span: 6, offset: 3 }}>
        <h2 style={{ marginBottom: '2rem' }}>The Mojos</h2>
        <h3 style={{ marginBottom: '2rem' }}>5 artists, 5 technologists</h3>
        <Row style={{ marginBottom: '0rem', textAlign: 'center' }}>
          <BioCards min={0} max={5} />
          <BioCards min={5} max={10} />
        </Row>
        <h3>Mojos' Reward</h3>
        <p style={{ textAlign: 'justify' }}>
          All Mojo auction proceeds are sent to the Mojos DAO. For this reason, we, the project's
          founders (‘Mojos’) have chosen to compensate ourselves with Mojos. Every 10th mojo for
          the first 5 years of the project will be sent to our multisig (5/10), where it will be
          vested and distributed to individual Mojos.
        </p>
        <p style={{ textAlign: 'justify' }}>
          The Mojos reward is intended as compensation for our pre and post-launch contributions
          to the project, and to help us participate meaningfully in governance as the project
          matures. Since there are 10 Mojos, after 5 years each Mojo could receive up to 1% of
          the Mojo supply.
        </p>
      </Col>
    </Section>
  );
};

export default MojosPage;
