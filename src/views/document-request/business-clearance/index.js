import React from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import BusinessClearanceListView from './BarangayClearanceListView';
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
const BusinessClearanceView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Barangay Clearance">
      <Container maxWidth={false}>
        <BusinessClearanceListView />
      </Container>
    </Page>
  );
};

export default BusinessClearanceView;
