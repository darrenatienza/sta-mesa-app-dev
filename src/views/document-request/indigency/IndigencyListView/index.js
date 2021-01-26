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

const IndigencyListView = () => {
  const classes = useStyles();
  const [indigencies, setIndigencies] = useState([]);
  const [
    {
      data: getIndigencyList,
      loading: getIndigencyListLoading,
      error: getIndigencyListError
    },
    refetch
  ] = useAxios(`/records/view_indigencies`);
  useEffect(() => {
    getIndigencyList && setIndigencies(getIndigencyList.records);
  }, [getIndigencyList]);
  return (
    <>
      <Toolbar />
      <Box mt={3}>
        <Results indigencies={indigencies} />
      </Box>
    </>
  );
};

export default IndigencyListView;
