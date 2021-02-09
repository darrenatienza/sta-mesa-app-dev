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

const AdminListView = () => {
  const classes = useStyles();

  const [criteria, setCriteria] = useState('');
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_indigencies?filter1=first_name,cs,${criteria}&filter2=last_name,cs,${criteria}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const reloadList = async () => {
    await refetch();
  };

  // search options
  useEffect(() => {
    reloadList();
  }, [criteria]);

  const search = query => {
    setCriteria(query);
  };
  return (
    <>
      <Toolbar search={search} />
      <Box mt={3}>
        <Results
          indigencies={data ? data.records : []}
          reloadList={reloadList}
        />
      </Box>
    </>
  );
};

export default AdminListView;
