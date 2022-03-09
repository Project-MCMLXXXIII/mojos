import { Container, Col, Button, Row, FloatingLabel, Form } from 'react-bootstrap';
import classes from './Playground.module.css';
import React, { useEffect, useState } from 'react';
import Link from '../../components/Link';
import { ImageData, getMojoData, getRandomMojoSeed } from '@mojos/assets';
import { buildSVG } from '@mojos/sdk';
import Mojo from '../../components/Mojo';
import MojoModal from './MojosModal';

interface Trait {
  title: string;
  traitNames: string[];
}

const mojosProtocolLink = (
  <Link
    text="Mojos Protocol"
    url="https://www.notion.so/Mojo-Protocol-32e4f0bf74fe433e927e2ea35e52a507"
    leavesPage={true}
  />
);

const mojosAssetsLink = (
  <Link
    text="mojos-assets"
    url="https://github.com/mojosDAO/mojos-monorepo/tree/master/packages/mojos-assets"
    leavesPage={true}
  />
);

const mojosSDKLink = (
  <Link
    text="mojos-sdk"
    url="https://github.com/mojosDAO/mojos-monorepo/tree/master/packages/mojos-sdk"
    leavesPage={true}
  />
);

const parseTraitName = (partName: string): string =>
  capitalizeFirstLetter(partName.substring(partName.indexOf('-') + 1));

const capitalizeFirstLetter = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

const Playground: React.FC = () => {
  const [mojoSvgs, setMojoSvgs] = useState<string[]>();
  const [traits, setTraits] = useState<Trait[]>();
  const [modSeed, setModSeed] = useState<{ [key: string]: number }>();
  const [initLoad, setInitLoad] = useState<boolean>(true);
  const [displayMojo, setDisplayMojo] = useState<boolean>(false);
  const [indexOfMojoToDisplay, setIndexOfMojoToDisplay] = useState<number>();

  const generateMojoSvg = React.useCallback(
    (amount: number = 1) => {
      for (let i = 0; i < amount; i++) {
        const seed = { ...getRandomMojoSeed(), ...modSeed };
        const { parts, background } = getMojoData(seed);

        const svg = buildSVG(parts, ImageData.palette, background);
        setMojoSvgs(prev => {
          return prev ? [svg, ...prev] : [svg];
        });
      }
    },
    [modSeed],
  );

  useEffect(() => {
    const traitTitles = ['background', 'body', 'accessory', 'head', 'glasses'];
    const traitNames = [
      ['cool', 'warm'],
      ...Object.values(ImageData.images).map(i => {
        return i.map(imageData => imageData.filename);
      }),
    ];
    setTraits(
      traitTitles.map((value, index) => {
        return {
          title: value,
          traitNames: traitNames[index],
        };
      }),
    );

    if (initLoad) {
      generateMojoSvg(8);
      setInitLoad(false);
    }
  }, [generateMojoSvg, initLoad]);

  const traitOptions = (trait: Trait) => {
    return Array.from(Array(trait.traitNames.length + 1)).map((_, index) => {
      const parsedTitle = index === 0 ? `Random` : parseTraitName(trait.traitNames[index - 1]);
      return <option key={index}>{parsedTitle}</option>;
    });
  };

  const traitButtonHandler = (trait: Trait, traitIndex: number) => {
    setModSeed(prev => {
      // -1 traitIndex = random
      if (traitIndex < 0) {
        let state = { ...prev };
        delete state[trait.title];
        return state;
      }
      return {
        ...prev,
        [trait.title]: traitIndex,
      };
    });
  };

  return (
    <>
      {displayMojo && indexOfMojoToDisplay !== undefined && mojoSvgs && (
        <MojoModal
          onDismiss={() => {
            setDisplayMojo(false);
          }}
          svg={mojoSvgs[indexOfMojoToDisplay]}
        />
      )}

      <Container fluid="lg">
        <Row>
          <Col lg={10} className={classes.headerRow}>
            <span>Explore</span>
            <h1>Playground</h1>
            <p>
              The playground was built using the {mojosProtocolLink}. Mojo's traits are determined
              by the Mojo Seed. The seed was generated using {mojosAssetsLink} and rendered using
              the {mojosSDKLink}.
            </p>
          </Col>
        </Row>
        <Row>
          <Col lg={3}>
            <Button
              onClick={() => {
                generateMojoSvg();
              }}
              className={classes.generateBtn}
            >
              Generate Mojos
            </Button>
            {traits &&
              traits.map((trait, index) => {
                return (
                  <Form className={classes.traitForm}>
                    <FloatingLabel
                      controlId="floatingSelect"
                      label={capitalizeFirstLetter(trait.title)}
                      key={index}
                      className={classes.floatingLabel}
                    >
                      <Form.Select
                        aria-label="Floating label select example"
                        className={classes.traitFormBtn}
                        onChange={e => {
                          let index = e.currentTarget.selectedIndex;
                          traitButtonHandler(trait, index - 1); // - 1 to account for 'random'
                        }}
                      >
                        {traitOptions(trait)}
                      </Form.Select>
                    </FloatingLabel>
                  </Form>
                );
              })}
            <p className={classes.mojoYearsFooter}>
              You've generated {mojoSvgs ? (mojoSvgs.length / 365).toFixed(2) : '0'} years worth of
              Mojos
            </p>
          </Col>
          <Col lg={9}>
            <Row>
              {mojoSvgs &&
                mojoSvgs.map((svg, i) => {
                  return (
                    <Col xs={4} lg={3} key={i}>
                      <div
                        onClick={() => {
                          setIndexOfMojoToDisplay(i);
                          setDisplayMojo(true);
                        }}
                      >
                        <Mojo
                          imgPath={`data:image/svg+xml;base64,${btoa(svg)}`}
                          alt="mojo"
                          className={classes.mojoImg}
                          wrapperClassName={classes.mojoWrapper}
                        />
                      </div>
                    </Col>
                  );
                })}
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Playground;
