import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import moment from 'moment';
import {
  useCurrentUser,
  useBarangayClearanceViewState
} from '../../../../states';
import { method } from 'lodash';
import useAxios from 'axios-hooks';
import { set } from 'js-cookie';
import DeleteDialog from '../../shared/DeleteDialog';
import DocumentStatusDialog from '../../shared/DocumentStatusDialog';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ListView = () => {
  const classes = useStyles();
  const [currentUser, { isValidRole }] = useCurrentUser();
  const [criteria, setCriteria] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [
    selectedChangeDocumentStatusID,
    setSelectedChangeDocumentStatusID
  ] = useState(0);
  const [
    openChangeDocumentStatusDialog,
    setOpenChangeDocumentStatusDialog
  ] = useState(false);
  // state - global
  const [
    barangayClearanceViewState,
    {
      setShowFormView,
      setShowListView,
      setBarangayClearanceID,
      setRefreshList,
      setShowPrintPreview
    }
  ] = useBarangayClearanceViewState();

  // state - id of barangay clearance to delete
  const [
    selectedDeleteBarangaClearanceID,
    setSelectedDeleteBarangaClearanceID
  ] = useState();
  const [isAdmin] = useState(isValidRole('admin'));
  //state - delete dialog
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  // http - get barangay clearance list
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_barangay_clearances?${
        isAdmin
          ? `filter1=first_name,cs,${criteria}&filter2=last_name,cs,${criteria}&filter=request_date,cs,${date}`
          : `filter=person_id,eq,${currentUser.currentPersonID}`
      }`,
      method: 'GET'
    },
    { manual: true }
  );

  // http - delete barangay clearance
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    {
      url: `/records/barangay_clearances/${selectedDeleteBarangaClearanceID}`,
      method: 'DELETE'
    },
    {
      manual: true
    }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/barangay_clearances/${selectedChangeDocumentStatusID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );

  //occurs when search happens
  useEffect(() => {
    refetch();
  }, [criteria, date]);

  //perform refetch after showing the list
  useEffect(() => {
    if (barangayClearanceViewState.refreshList) {
      refetch();
      setRefreshList(false);
    }
  }, [barangayClearanceViewState.refreshList]);

  //  dialog close callback
  // perform delete request if agree
  const onCloseDeleteDialog = async agree => {
    if (agree) {
      await executeDelete();
      await refetch();
    }
    setOpenDeleteDialog(false);
  };

  // callback - add
  const onAdd = () => {
    setShowFormView(true);
    setShowListView(false);
  };
  // callback - edit
  const onEdit = id => {
    console.log(id);
    setBarangayClearanceID(id);
    setShowFormView(true);
    setShowListView(false);
  };
  // callback -delete
  const onDelete = id => {
    setSelectedDeleteBarangaClearanceID(id);
    setOpenDeleteDialog(true);
  };
  const onSearch = (criteria, date) => {
    setCriteria(criteria);
    setDate(date);
  };
  const onPrint = id => {
    setBarangayClearanceID(id);
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

  return (
    <>
      <Toolbar isAdmin={isAdmin} onAdd={onAdd} onSearch={onSearch} />
      <Box mt={2}>
        <Results
          residents={data}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onPrint={onPrint}
          onChangeDocumentStatus={handleChangeDocumentStatus}
        />
        <DeleteDialog open={openDeleteDialog} onClose={onCloseDeleteDialog} />
        <DocumentStatusDialog
          open={openChangeDocumentStatusDialog}
          onClose={handleCloseDocumentStatusDialog}
        />
      </Box>
    </>
  );
};

export default ListView;
