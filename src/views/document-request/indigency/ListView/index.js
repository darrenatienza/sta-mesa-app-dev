import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import moment from 'moment';
import useAxios from 'axios-hooks';
import { useCurrentUser, useIndigencyViewState } from '../../../../states';
import DeleteDialog from 'src/views/residents/ResidentListView/DeleteDialog';
import DocumentStatusDialog from '../../shared/DocumentStatusDialog';
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';
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
  const [
    indigencyViewState,
    { setShowListView, setShowPrintPreview, setSelectedIndigencyID }
  ] = useIndigencyViewState();
  const [selectedDeleteID, setSelectedDeleteID] = useState(0);
  const [
    selectedChangeDocumentStatusID,
    setSelectedChangeDocumentStatusID
  ] = useState(0);

  const [criteria, setCriteria] = useState('');
  const [currentUser, { isValidRole }] = useCurrentUser();
  const [isAdmin] = useState(isValidRole('admin'));
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [
    openChangeDocumentStatusDialog,
    setOpenChangeDocumentStatusDialog
  ] = useState(false);
  const [openSaveConfirmationDialog, setOpenSaveConfirmationDialog] = useState(
    false
  );
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_indigencies?${
        isAdmin
          ? `filter1=first_name,cs,${criteria}&filter2=last_name,cs,${criteria}`
          : `filter=person_id,eq,${currentUser.currentPersonID}`
      }`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    { url: `/records/indigencies`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/indigencies/${selectedChangeDocumentStatusID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: `/records/indigencies/${selectedDeleteID}`, method: 'DELETE' },
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

  const onSearch = query => {
    setCriteria(query);
  };
  const onAdd = async () => {
    await executePost({
      data: {
        person_id: currentUser.currentPersonID,
        doc_status_id: 1,
        parents: '', // not needed
        indigent_reason: '' // not needed
      }
    });
    setOpenSaveConfirmationDialog(true);
    await refetch();
  };
  const onPrint = id => {
    setSelectedIndigencyID(id);
    setShowListView(false);
    setShowPrintPreview(true);
  };
  const onDelete = id => {
    setSelectedDeleteID(id);
    setOpenDeleteDialog(true);
  };
  const onCloseDeleteDialog = async confirm => {
    if (confirm) {
      await executeDelete();
      await refetch();
    }
    setOpenDeleteDialog(false);
  };
  const onChangeDocumentStatus = id => {
    setSelectedChangeDocumentStatusID(id);
    setOpenChangeDocumentStatusDialog(true);
  };
  const onCloseDocumentStatusDialog = async (id, confirm) => {
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
      <Toolbar onSearch={onSearch} onAdd={onAdd} isAdmin={isAdmin} />
      <Box mt={3}>
        <Results
          indigencies={data ? data.records : []}
          isAdmin={isAdmin}
          onPrint={onPrint}
          onDelete={onDelete}
          onChangeDocumentStatus={onChangeDocumentStatus}
        />
        <DeleteDialog open={openDeleteDialog} onClose={onCloseDeleteDialog} />
        <DocumentStatusDialog
          open={openChangeDocumentStatusDialog}
          onClose={onCloseDocumentStatusDialog}
        />
        <ConfirmationDialog
          open={openSaveConfirmationDialog}
          hasCancel={false}
          title="Successfully saved"
          message="Record successfully saved!"
          onClose={() => setOpenSaveConfirmationDialog(false)}
        />
      </Box>
    </>
  );
};

export default ListView;
