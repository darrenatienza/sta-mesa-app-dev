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

const RelationshipListView = () => {
  const classes = useStyles();
  const [relationships, setRelationships] = useState([]);
  const [
    {
      data: getRelationshipList,
      loading: getRelationshipListLoading,
      error: getRelationshipListError
    },
    refetch
  ] = useAxios(`/records/view_relationships`);
  useEffect(() => {
    getRelationshipList && setRelationships(getRelationshipList.records);
  }, [getRelationshipList]);
  return (
    <>
      <Toolbar />
      <Box mt={3}>
        <Results relationships={relationships} />
      </Box>
    </>
  );
};

export default RelationshipListView;
