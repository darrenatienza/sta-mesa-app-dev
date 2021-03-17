import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Card, Collapse, Container, makeStyles } from '@material-ui/core';

import moment from 'moment';
import { useCurrentUser } from 'src/states';
import PrintPreview from './PrintPreview';
import Toolbar from './Toolbar';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Print = () => {
  const classes = useStyles();
  const handleSearch = () => {};
  useEffect(() => {}, []);
  return (
    <div className={classes.root}>
      <Toolbar onSearch={handleSearch} />
      <PrintPreview />
    </div>
  );
};

export default Print;
