import React from 'react';
import { Image } from 'react-bootstrap';
import classes from './MojoInfoRowButton.module.css';
import { useAppSelector } from '../../hooks';

interface MojoInfoRowButtonProps {
  iconImgSource: string;
  btnText: string;
  onClickHandler: () => void;
}

const MojoInfoRowButton: React.FC<MojoInfoRowButtonProps> = props => {
  const { iconImgSource, btnText, onClickHandler } = props;
  const isCool = useAppSelector(state => state.application.isCoolBackground);
  return (
    <div
      className={isCool ? classes.mojoButtonCool : classes.mojoButtonWarm}
      onClick={onClickHandler}
    >
      <div className={classes.mojoButtonContents}>
        <Image src={iconImgSource} className={classes.buttonIcon} />
        {btnText}
      </div>
    </div>
  );
};

export default MojoInfoRowButton;
