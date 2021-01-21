import React from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import DocumentRequestListView from './DocumentRequestListView';
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
const DocumentRequestView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Document Requests">
      <Container maxWidth={false}>
        <DocumentRequestListView />
      </Container>
    </Page>
  );
};

export default DocumentRequestView;
