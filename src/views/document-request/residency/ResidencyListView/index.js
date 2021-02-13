import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import AdminResults from './AdminResults';
import Toolbar from './Toolbar';
import { useResidency } from '../../../../states';
import useAxios from 'axios-hooks';
import DocumentStatusDialog from '../../../shared/DocumentStatusDialog';
import moment from 'moment';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ResidencyListView = () => {
  const classes = useStyles();
  const [selecteIDToDelete, setSelectedIDToDelete] = useState(0);
  const [
    selecteIDToUpdateDocumentStatus,
    setSelecteIDToUpdateDocumentStatus
  ] = useState(0);
  const [documentStatusDialogOpen, setDocumentStatusDialogOpen] = useState(
    false
  );
  const [criteria, setCriteria] = useState('');
  const [
    residency,
    { setSelectedResidencyID, setShowFormView, setShowListView }
  ] = useResidency();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_residencies?filter1=first_name,cs,${criteria}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: `/records/residencies/${selecteIDToDelete}`, method: 'DELETE' },
    { manual: true }
  );
  const [
    {
      data: putDocStatusData,
      loading: putDocStatusLoading,
      error: putDocStatusError
    },
    executePutDocStatus
  ] = useAxios(
    {
      url: `/records/residencies/${selecteIDToUpdateDocumentStatus}`,
      method: 'PUT'
    },
    { manual: true }
  );
  useEffect(() => {
    if (selecteIDToDelete > 0) {
      const performDelete = async () => {
        await executeDelete();
        await refetch();
      };
      performDelete();
    }
  }, [selecteIDToDelete]);
  useEffect(() => {
    refetch();
  }, [criteria]);
  useEffect(() => {
    residency.refreshList && refetch();
  }, [residency.refreshList]);
  //callback functions
  const onAdd = () => {
    setSelectedResidencyID(-1);
  };
  const onEdit = id => {
    console.log(id);
    setSelectedResidencyID(id);
  };
  const onDelete = id => {
    setSelectedIDToDelete(id);
  };
  const onSearch = criteria => {
    setCriteria(criteria);
  };
  const onCloseDocumentStatusDialog = () => {
    setDocumentStatusDialogOpen(false);
  };
  const onConfirmDocumentStatusDialog = async id => {
    await executePutDocStatus({
      data: {
        doc_status_id: id,
        update_time_stamp: moment().format('YYYY-MM-DD')
      }
    });
    await refetch();
    setDocumentStatusDialogOpen(false);
  };
  const onUpdateDocumentStatus = id => {
    setSelecteIDToUpdateDocumentStatus(id);
    setDocumentStatusDialogOpen(true);
  };
  //jsx
  return (
    <>
      <Toolbar onSearch={onSearch} onAdd={onAdd} />
      <Box mt={3}>
        <Results
          onEdit={onEdit}
          onDelete={onDelete}
          residencies={data ? data.records : []}
        />
        <AdminResults
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdateDocumentStatus={onUpdateDocumentStatus}
          residencies={data ? data.records : []}
        />
        <DocumentStatusDialog
          open={documentStatusDialogOpen}
          onClose={onCloseDocumentStatusDialog}
          onConfirm={onConfirmDocumentStatusDialog}
        />
      </Box>
    </>
  );
};

export default ResidencyListView;
