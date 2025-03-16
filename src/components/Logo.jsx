import React from 'react';
import logo from '../assets/logo.svg';

const Logo = ({ handleClick }) => {
  return (
    <button onClick={handleClick} className='-m-1.5 p-1.5'>
      <img src={logo} alt='Logo' className='h-12 cursor-pointer' />
    </button>
  );
};

export default Logo;
