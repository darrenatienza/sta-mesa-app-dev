import React, { useState, useEffect } from 'react';
import { Box, Container, Collapse, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import useAxios from 'axios-hooks';
import { useBarangayClearanceViewState } from '../../../../states';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BarangayClearanceListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView }
  ] = useBarangayClearanceViewState();
  const [barangayClearances, setBarangayClearances] = useState([]);
  const [
    {
      data: getBarangayClearanceList,
      loading: getBarangayClearanceListLoading,
      error: getBarangayClearanceListError
    },
    refetch
  ] = useAxios(`/records/view_barangay_clearances`);
  useEffect(() => {
    getBarangayClearanceList &&
      setBarangayClearances(getBarangayClearanceList.records);
  }, [getBarangayClearanceList]);
  return (
    <>
      <Toolbar />
      <Box mt={3}>
        <Results barangayClearances={barangayClearances} />
      </Box>
    </>
  );
};

export default BarangayClearanceListView;
