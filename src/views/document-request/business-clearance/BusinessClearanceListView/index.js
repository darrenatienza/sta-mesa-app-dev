import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import useAxios from 'axios-hooks';
import { useBusinessClearanceViewState } from '../../../../states';
import DocumentStatusDialog from '../../shared/DocumentStatusDialog';
import DeleteDialog from '../../shared/DeleteDialog';
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
  //state - delete dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [
    selectedChangeDocumentStatusID,
    setSelectedChangeDocumentStatusID
  ] = useState(0);
  const [
    openChangeDocumentStatusDialog,
    setOpenChangeDocumentStatusDialog
  ] = useState(false);
  //global state
  const [
    businessClearanceViewState,
    {
      setSelectedBusinessClearanceID,
      setShowListView,
      setShowFormView,
      setShowPrintPreview
    }
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
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/business_clearances/${selectedChangeDocumentStatusID}`,
      method: 'PUT'
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
  useEffect(() => {
    businessClearanceViewState.refreshList && reloadList();
  }, [businessClearanceViewState.refreshList]);

  const search = query => {
    setCriteria(query);
  };
  const onEdit = id => {
    setSelectedBusinessClearanceID(id);
    setShowFormView(true);
    setShowListView(false);
  };
  const onDelete = id => {
    setSelectedID(id);
    setOpenDeleteDialog(true);
  };
  const onAdd = () => {
    setSelectedBusinessClearanceID(-1);
    setShowFormView(true);
    setShowListView(false);
  };
  const handlePrint = id => {
    setSelectedBusinessClearanceID(id);
    setShowPrintPreview(true);
    setShowListView(false);
  };
  const handleChangeDocumentStatus = id => {
    setSelectedChangeDocumentStatusID(id);
    setOpenChangeDocumentStatusDialog(true);
  };
  const handleCloseDocumentStatusDialog = async (id, confirm) => {
    if (confirm) {
      await executePut({
        data: {
          doc_status_id: id
        }
      });
      await refetch();
    }
    setOpenChangeDocumentStatusDialog(false);
  };
  //  dialog close callback
  // perform delete request if agree
  const onCloseDeleteDialog = async agree => {
    if (agree) {
      await executeDelete();
      await refetch();
    }
    setOpenDeleteDialog(false);
  };
  return (
    <>
      <Toolbar search={search} onAdd={onAdd} />
      <Box mt={3}>
        <Results
          businessClearances={data ? data.records || [] : []}
          reloadList={reloadList}
          onEdit={onEdit}
          onDelete={onDelete}
          onPrint={handlePrint}
          onChangeDocumentStatus={handleChangeDocumentStatus}
        />
        <DocumentStatusDialog
          open={openChangeDocumentStatusDialog}
          onClose={handleCloseDocumentStatusDialog}
        />
        <DeleteDialog open={openDeleteDialog} onClose={onCloseDeleteDialog} />
      </Box>
    </>
  );
};

export default BusinessClearanceListView;
