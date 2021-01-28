import React from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, Collapse, makeStyles } from '@material-ui/core';
import BarangayClearanceListView from './BarangayClearanceListView';
import BarangayClearanceFormView from './BarangayClearanceFormView';
import { useBarangayClearanceViewState } from '../../../states';
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
const BarangayClearanceView = () => {
  const classes = useStyles();
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView }
  ] = useBarangayClearanceViewState();
  return (
    <Page className={classes.root} title="Barangay Clearance">
      <Container maxWidth={false}>
        <Collapse in={barangayClearanceStateView.showListView}>
          <BarangayClearanceListView />
        </Collapse>
        <Collapse in={barangayClearanceStateView.showFormView}>
          <BarangayClearanceFormView />
        </Collapse>
      </Container>
    </Page>
  );
};

export default BarangayClearanceView;
