import classes from './Mojo.module.css';
import React from 'react';
import loadingMojo from '../../assets/loading-skull-mojo.gif';
import Image from 'react-bootstrap/Image';

export const LoadingMojo = () => {
  return (
    <div className={classes.imgWrapper}>
      <Image className={classes.img} src={loadingMojo} alt={'loading mojo'} fluid />
    </div>
  );
};

const Mojo: React.FC<{
  imgPath: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}> = props => {
  const { imgPath, alt, className, wrapperClassName } = props;
  return (
    <div className={`${classes.imgWrapper} ${wrapperClassName}`}>
      <Image
        className={`${classes.img} ${className}`}
        src={imgPath ? imgPath : loadingMojo}
        alt={alt}
        fluid
      />
    </div>
  );
};

export default Mojo;
