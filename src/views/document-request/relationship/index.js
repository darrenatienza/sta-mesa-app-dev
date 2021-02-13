import React from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import RelationshipListView from './RelationshipListView';
import RelationshipFormView from './RelationshipFormView';
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
const RelationshipView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Relationship">
      <Container maxWidth={false}>
        <RelationshipListView />
        <RelationshipFormView />
      </Container>
    </Page>
  );
};

export default RelationshipView;
