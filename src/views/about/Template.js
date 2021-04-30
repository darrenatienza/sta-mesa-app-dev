import { Typography } from '@material-ui/core';
import React from 'react';

const Template = (title, children) => {
  return (
    <div>
      <Typography>{title}</Typography>
    </div>
  );
};

export default Template;
