import React, { useState } from 'react';
import Page from 'src/components/Page';
import { Container, makeStyles } from '@material-ui/core';
import ListView from './ListView';

import { useCurrentUser } from '../../../states';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));
const IndigencyView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Indigency">
      <Container maxWidth={false}>
        <ListView />
      </Container>
    </Page>
  );
};

export default IndigencyView;
