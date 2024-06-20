import React from 'react';
import PropTypes from 'prop-types';

type CircularButtonProps = {
  label: string;
  onClick: () => void;
};
const CircularButton = (props: CircularButtonProps) => {
  const { label, onClick } = props;
  return (
    <button className='circular-button' onClick={onClick}>
      {label}
    </button>
  );
};

CircularButton.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default CircularButton;
