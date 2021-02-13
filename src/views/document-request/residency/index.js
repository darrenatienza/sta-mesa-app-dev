import React from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import ResidencyListView from './ResidencyListView';
import ResidencyFormView from './ResidencyFormView';
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
const ResidencyView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Residency">
      <Container maxWidth={false}>
        <ResidencyListView />
        <ResidencyFormView />
      </Container>
    </Page>
  );
};

export default ResidencyView;
