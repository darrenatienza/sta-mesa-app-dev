import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import useAxios from 'axios-hooks';
import { useHealthWorkerViewState } from '../../../states';
const useStyles = makeStyles(theme => ({
  root: {}
}));

const HealthWorkerListView = () => {
  const classes = useStyles();
  const [healthWorkers, setHealthWorkers] = useState([]);
  const [healthWorkerViewState] = useHealthWorkerViewState();
  const [
    {
      data: getHealthWorkerList,
      loading: getHealthWorkerListLoading,
      error: getHealthWorkerListError
    },
    refetch
  ] = useAxios(
    `/records/view_health_workers?filter=first_name,cs,${healthWorkerViewState.criteria}`
  );
  useEffect(() => {
    getHealthWorkerList && setHealthWorkers(getHealthWorkerList.records);
  }, [getHealthWorkerList]);
  return (
    <>
      <Toolbar />
      <Box mt={3}>
        <Results healthWorkers={healthWorkers} />
      </Box>
    </>
  );
};

export default HealthWorkerListView;
