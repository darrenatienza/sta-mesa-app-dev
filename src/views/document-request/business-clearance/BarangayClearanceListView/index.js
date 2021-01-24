import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import useAxios from 'axios-hooks';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const BusinessClearanceListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);
  const [businessClearances, setBusinessClearances] = useState([]);
  const [
    {
      data: getBusinessClearanceList,
      loading: getBusinessClearanceListLoading,
      error: getBusinessClearanceListError
    },
    refetch
  ] = useAxios(`/records/view_business_clearance`);
  useEffect(() => {
    getBusinessClearanceList &&
      setBusinessClearances(getBusinessClearanceList.records);
  }, [getBusinessClearanceList]);
  return (
    <>
      <Toolbar />
      <Box mt={3}>
        <Results businessClearances={businessClearances} />
      </Box>
    </>
  );
};

export default BusinessClearanceListView;
