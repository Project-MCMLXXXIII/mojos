import classes from './Banner.module.css';
import Section from '../../layout/Section';
import { Col } from 'react-bootstrap';
import calendar_mojo from '../../assets/03-mojo.svg';
import Mojo from '../Mojo';

const Banner = () => {
  return (
    <Section fullWidth={false} className={classes.bannerSection}>
      <Col lg={6}>
        <div className={classes.wrapper}>
          <h1>
            2 MOJOS
            <br />
            EVERYDAY,
            <br />
            FOREVER
          </h1>
        </div>
      </Col>
      <Col lg={6}>
        <div style={{ padding: '2rem' }}>
          <Mojo imgPath={calendar_mojo} alt="mojo" />
        </div>
      </Col>
    </Section>
  );
};

export default Banner;
