import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import AdminResults from './AdminResults';
import Toolbar from './Toolbar';
import { useRelationship } from '../../../../states';
import useAxios from 'axios-hooks';
import DocumentStatusDialog from '../../../shared/DocumentStatusDialog';
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
    relationship,
    { setSelectedRelationshipID, setShowFormView, setShowListView }
  ] = useRelationship();
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_relationships?filter1=first_name,cs,${criteria}`,
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
    relationship.refreshList && refetch();
  }, [relationship.refreshList]);
  //callback functions
  const onAdd = () => {
    setSelectedRelationshipID(-1);
  };
  const onEdit = id => {
    setSelectedRelationshipID(id);
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
  const onConfirmDocumentStatusDialog = id => {
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
          relationships={data ? data.records : []}
        />
        <AdminResults
          onEdit={onEdit}
          onDelete={onDelete}
          onUpdateDocumentStatus={onUpdateDocumentStatus}
          relationships={data ? data.records : []}
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

export default RelationshipListView;
