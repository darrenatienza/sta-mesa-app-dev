import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import useAxios from 'axios-hooks';
import { useCurrentUser } from '../../../../states';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ClientListView = () => {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const [{ data, loading, error }, refetch] = useAxios(
    `/records/view_indigencies?filter=person_id,eq,${currentUser.currentPersonID}`
  );
  const reloadList = async () => {
    await refetch();
  };
  return (
    <>
      <Toolbar
        currentPersonID={currentUser.currentPersonID}
        reloadList={reloadList}
      />
      <Box mt={3}>
        <Results
          indigencies={data ? data.records : []}
          reloadList={reloadList}
        />
      </Box>
    </>
  );
};

export default ClientListView;
