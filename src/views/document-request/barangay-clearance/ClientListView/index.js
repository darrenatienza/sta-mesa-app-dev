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
  const [currentUser, { isValidRole }] = useCurrentUser();
  const [criteria, setCriteria] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [
    barangayClearanceViewState,
    { setShowFormView, setShowListView, setBarangayClearanceID }
  ] = useBarangayClearanceViewState();
  const [
    selectedDeleteBarangaClearanceID,
    setSelectedDeleteBarangaClearanceID
  ] = useState();
  const [isAdmin] = useState(isValidRole('admin'));
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

  useEffect(() => {
    refetch();
  }, [criteria, date]);

  //perform refetch after showing the list
  useEffect(() => {
    if (barangayClearanceViewState.refreshList) {
      refetch();
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

  useEffect(() => {}, [barangayClearanceViewState.barangayClearanceID]);
  // callback - add
  const onAdd = () => {
    setBarangayClearanceID(null);
    setShowFormView(true);
    setShowListView(false);
  };
  // callback - edit
  const onEdit = id => {
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
  return (
    <>
      <Toolbar isAdmin={isAdmin} onAdd={onAdd} onSearch={onSearch} />
      <Box mt={2}>
        <Results
          residents={data}
          isAdmin={isAdmin}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <DeleteDialog open={openDeleteDialog} onClose={onCloseDeleteDialog} />
      </Box>
    </>
  );
};

export default ClientListView;
