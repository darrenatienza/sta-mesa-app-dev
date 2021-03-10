import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';

import Results from './Results';
import Toolbar from './Toolbar';
import { useRelationship } from '../../../../states';
import useAxios from 'axios-hooks';
import DocumentStatusDialog from '../../../shared/DocumentStatusDialog';
import moment from 'moment';
import { useCurrentUser } from '../../../../states';
import DeleteDialog from '../../shared/DeleteDialog';
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
    relationship,
    {
      setSelectedRelationshipID,
      setShowFormView,
      setShowListView,
      setRefreshList,
      setShowPrintPreview
    }
  ] = useRelationship();

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_relationships?${
        isAdmin
          ? `filter1=first_name,cs,${criteria}`
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
    { url: `/records/relationships/${selecteIDToDelete}`, method: 'DELETE' },
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
      url: `/records/relationships/${selecteIDToUpdateDocumentStatus}`,
      method: 'PUT'
    },
    { manual: true }
  );

  useEffect(() => {
    refetch();
  }, [criteria]);

  useEffect(() => {
    if (relationship.refreshList) {
      refetch();
      setRefreshList(false);
    }
  }, [relationship.refreshList]);

  //callback functions
  const onAdd = () => {
    setShowFormView(true);
    setShowListView(false);
    setSelectedRelationshipID(-1);
  };

  const onEdit = id => {
    setShowFormView(true);
    setShowListView(false);
    setSelectedRelationshipID(id);
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
        date_issued: moment().format('YYYY-MM-DD')
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
  const handlePrint = id => {
    setSelectedRelationshipID(id);
    setShowPrintPreview(true);
    setShowListView(false);
  };
  //jsx
  return (
    <>
      <Toolbar
        isAdmin={currentUser.isAdmin}
        onSearch={onSearch}
        onAdd={onAdd}
      />
      <Box mt={3}>
        <Results
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
          onPrint={handlePrint}
          onUpdateDocumentStatus={onUpdateDocumentStatus}
          relationships={data ? data.records : []}
        />

        <DocumentStatusDialog
          open={documentStatusDialogOpen}
          onClose={onCloseDocumentStatusDialog}
          onConfirm={onConfirmDocumentStatusDialog}
        />
        <DeleteDialog open={openDeleteDialog} onClose={onCloseDeleteDialog} />
      </Box>
    </>
  );
};

export default RelationshipListView;
