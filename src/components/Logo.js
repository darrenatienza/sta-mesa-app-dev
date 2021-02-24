import React from 'react';

const Logo = props => {
  return (
    <img
      alt="Logo"
      src="/static/sta_mesa_logo.png"
      width="48px"
      height="48px"
      {...props}
    />
  );
};

export default Logo;
