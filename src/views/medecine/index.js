import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import useAxios from 'axios-hooks';
import Form from './Form';
import DeleteDialog from '../shared/DeleteDialog';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [criteria, setCriteria] = useState('');
  const [selectedID, setSelectedID] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [action, setAction] = useState('');
  const [reset, setReset] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/medicines?filter=name,cs,${criteria}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [
    { data: getData, loading: getLoading, error: getError },
    refetchSingle
  ] = useAxios(
    {
      url: `/records/medicines/${selectedID}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [{ putData, putLoading, putError }, executePut] = useAxios(
    {
      url: `/records/medicines/${selectedID}`,
      method: 'PUT'
    },
    { manual: true }
  );
  const [{ postData, postLoading, postError }, executePost] = useAxios(
    {
      url: `/records/medicines`,
      method: 'POST'
    },
    { manual: true }
  );
  const [{ deleteData, deleteLoading, deleteError }, executeDelete] = useAxios(
    {
      url: `/records/medicines/${selectedID}`,
      method: 'DELETE'
    },
    { manual: true }
  );
  useEffect(() => {
    refetch();
  }, [criteria]);

  useEffect(() => {
    if (selectedID > 0 && showForm) {
      refetchSingle();
    }
  }, [selectedID]);
  const onSearch = criteria => {
    setCriteria(criteria);
  };
  const onAdd = () => {
    setSelectedID(0);
  };
  const onEdit = id => {
    console.log(id);
    setSelectedID(id);
    setShowForm(true);
  };

  const onDelete = async id => {
    setSelectedID(id);
    setOpenDelete(true);
  };
  const onSave = async data => {
    if (selectedID > 0) {
      await executePut({
        data: {
          name: data.name,
          description: data.description,
          quantity: data.quantity
        }
      });
    } else {
      await executePost({
        data: {
          name: data.name,
          description: data.description,
          quantity: data.quantity
        }
      });
    }
    setSelectedID(0);
    await refetch();
  };
  const onCloseDelete = async result => {
    setOpenDelete(false);
    if (result) {
      console.log(selectedID);
      await executeDelete();
      await refetch();
      setSelectedID(0);
    }
  };
  return (
    <Page className={classes.root} title="Medicines">
      <Container maxWidth={false}>
        <Toolbar onSearch={onSearch} onAdd={onAdd} />
        <Box mt={3}>
          <Results
            medicines={data ? data.records : []}
            onEdit={onEdit}
            onDelete={onDelete}
          />
          <DeleteDialog open={openDelete} onClose={onCloseDelete} />
          <Form medicine={getData} onSave={onSave} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
