import classes from './Mojo.module.css';
import React from 'react';
import loadingMojo from '../../assets/loading-skull-mojo.gif';
import Image from 'react-bootstrap/Image';

export const LoadingMojo = () => {
  return <Image className={classes.img} src={loadingMojo} alt={'loading mojo'} fluid />;
};

const Mojo: React.FC<{ imgPath: string; alt: string }> = props => {
  const { imgPath, alt } = props;
  return <Image className={classes.img} src={imgPath ? imgPath : loadingMojo} alt={alt} fluid />;
};

export default Mojo;
