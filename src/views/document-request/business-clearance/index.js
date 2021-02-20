import React, { useState } from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, makeStyles, Collapse } from '@material-ui/core';
import BusinessClearanceListView from './BusinessClearanceListView';
import BusinessClearanceFormView from './BusinessClearanceFormView';
import { useBusinessClearanceViewState } from '../../../states';
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
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView }
  ] = useBusinessClearanceViewState();
  return (
    <Page className={classes.root} title="Business Clearance">
      <Container maxWidth={false}>
        <Collapse in={barangayClearanceStateView.showListView}>
          <BusinessClearanceListView />
        </Collapse>
        <Collapse in={barangayClearanceStateView.showFormView}>
          <BusinessClearanceFormView />
        </Collapse>
      </Container>
    </Page>
  );
};

export default BusinessClearanceView;
