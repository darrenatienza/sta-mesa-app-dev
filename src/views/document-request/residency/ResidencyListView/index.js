import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

import Results from './Results';
import Toolbar from './Toolbar';
import { useCurrentUser, useResidency } from '../../../../states';
import useAxios from 'axios-hooks';
import DocumentStatusDialog from '../../shared/DocumentStatusDialog';
import moment from 'moment';
import DeleteDialog from '../../shared/DeleteDialog';
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
  const [currentUser, { isValidRole }] = useCurrentUser();
  const [isAdmin] = useState(isValidRole('admin'));
  const [selecteIDToDelete, setSelectedIDToDelete] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
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
    {
      setSelectedResidencyID,
      setShowFormView,
      setShowListView,
      setShowPrintPreview
    }
  ] = useResidency();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_residencies?${
        isAdmin
          ? `filter1=first_name,cs,${criteria}&filter2=last_name,cs,${criteria}`
          : `filter=person_id,eq,${currentUser.currentPersonID}`
      }`,
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
    refetch();
  }, [criteria]);
  useEffect(() => {
    residency.refreshList && refetch();
  }, [residency.refreshList]);
  //callback functions
  const onAdd = () => {
    setShowFormView(true);
    setShowListView(false);
    setSelectedResidencyID(-1);
  };
  const onEdit = id => {
    console.log(id);
    setShowFormView(true);
    setShowListView(false);
    setSelectedResidencyID(id);
  };
  const onDelete = id => {
    setSelectedIDToDelete(id);
    setOpenDeleteDialog(true);
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
  const onCloseDeleteDialog = async confirm => {
    if (confirm) {
      await executeDelete();
      await refetch();
    }

    setOpenDeleteDialog(false);
  };
  const handlePrintPreview = id => {
    setSelectedResidencyID(id);
    setShowListView(false);
    setShowPrintPreview(true);
  };
  //jsx
  return (
    <>
      <Toolbar isAdmin={isAdmin} onSearch={onSearch} onAdd={onAdd} />
      <Box mt={3}>
        <Results
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onPrint={handlePrintPreview}
          onUpdateDocumentStatus={onUpdateDocumentStatus}
          residencies={data && data.records}
        />
        <DeleteDialog open={openDeleteDialog} onClose={onCloseDeleteDialog} />
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
