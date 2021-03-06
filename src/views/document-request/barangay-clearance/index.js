import React, { useEffect } from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, Collapse, makeStyles } from '@material-ui/core';

import { useBarangayClearanceViewState, useCurrentUser } from '../../../states';
import ListView from './ListView';
import FormView from './FormView';
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

  const [currentUser] = useCurrentUser();
  useEffect(() => {}, [currentUser.roles]);
  return (
    <Page className={classes.root} title="Barangay Clearance">
      <Container maxWidth={false}>
        {/** for non admin user render this jsx */}

        <>
          <Collapse in={barangayClearanceStateView.showListView}>
            <ListView />
          </Collapse>
          <Collapse in={barangayClearanceStateView.showFormView}>
            <FormView />
          </Collapse>
        </>
      </Container>
    </Page>
  );
};

export default BarangayClearanceView;
