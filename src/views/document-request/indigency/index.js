import React from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import IndigencyListView from './IndigencyListView';
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
        <IndigencyListView />
      </Container>
    </Page>
  );
};

export default IndigencyView;
