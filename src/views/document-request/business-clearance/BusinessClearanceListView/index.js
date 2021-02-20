import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import useAxios from 'axios-hooks';
import { useBusinessClearanceViewState } from '../../../../states';
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
  const [criteria, setCriteria] = useState('');
  const [selectedID, setSelectedID] = useState(0);
  //global state
  const [
    businessClearanceViewState,
    { setSelectedBusinessClearanceID, setShowListView, setShowFormView }
  ] = useBusinessClearanceViewState();
  const [{ data, loading, error }, refetch] = useAxios(
    { url: `/records/view_business_clearance?filter=name,cs,${criteria}` },
    { manual: true }
  );
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: `/records/business_clearances/${selectedID}`, method: 'DELETE' },
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
  useEffect(() => {
    businessClearanceViewState.refreshList && reloadList();
  }, [businessClearanceViewState.refreshList]);
  //performs delete
  useEffect(() => {
    if (selectedID > 0) {
      const performDelete = async () => {
        const { data: row } = await executeDelete();
        if (row > 0) {
          reloadList();
        }
      };
      performDelete();
    }
  }, [selectedID]);
  const search = query => {
    setCriteria(query);
  };
  const onEdit = id => {
    console.log(id);
    setSelectedBusinessClearanceID(id);
  };
  const onDelete = id => {
    setSelectedID(id);
  };
  const onAdd = () => {
    console.log('add');
    setSelectedBusinessClearanceID(-1);
    setShowFormView(true);
    setShowListView(false);
  };
  return (
    <>
      <Toolbar search={search} onAdd={onAdd} />
      <Box mt={3}>
        <Results
          businessClearances={data ? data.records : []}
          reloadList={reloadList}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Box>
    </>
  );
};

export default BusinessClearanceListView;
