import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Collapse,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Details from './Details';
import useAxios from 'axios-hooks';
import { useBarangayClearanceViewState } from '../../../../states';
import { setAvatar } from 'src/states/official';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  progress: {
    margin: 10
  }
}));

const BarangayClearanceFormView = () => {
  const classes = useStyles();
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView}
  ] = useBarangayClearanceViewState();
  return (
    <Collapse in={barangayClearanceStateView.setShowFormView}>
      <Container maxWidth="lg">
        <Details />
      </Container>
    </Collapse>
  );
};

export default BarangayClearanceFormView;
