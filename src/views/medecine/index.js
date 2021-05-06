import React, { useState, useEffect } from 'react';
import { Box, Container, Collapse, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useCurrentUser } from '../../states';
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
  const [showForm, setShowForm] = useState(false);
  const [currentUser] = useCurrentUser();
  const [isBhwRole, setIsBhwRole] = useState(false);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/medicines?filter=name,cs,${criteria}&order=name`,
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
  const [{ data: putData, putLoading, putError }, executePut] = useAxios(
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
  //check for roles
  useEffect(() => {
    if (currentUser.roles.length > 0) {
      currentUser.roles.map(r => {
        if (r.title === 'bhw') {
          setIsBhwRole(true);
        }
      });
    }
  }, [currentUser.roles]);
  useEffect(() => {
    if (selectedID > 0 && showForm) {
      refetchSingle();
    }
  }, [selectedID]);
  const onSearch = criteria => {
    setCriteria(criteria);
  };
  const onAdd = () => {
    console.log('add');
    setSelectedID(0);
    setShowForm(true);
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
    setShowForm(false);
    await refetch();
  };
  const onCloseDeleteDialog = async result => {
    setOpenDelete(false);
    if (result) {
      console.log(selectedID);
      await executeDelete();
      await refetch();
      setSelectedID(0);
    }
  };
  const onCloseForm = () => {
    setShowForm(false);
    setSelectedID(0);
  };
  return (
    <Page className={classes.root} title="Medicines">
      <Container maxWidth={false}>
        <Collapse in={!showForm}>
          <Toolbar onSearch={onSearch} onAdd={onAdd} isBhw={isBhwRole} />
          <Box mt={3}>
            <Results
              medicines={data ? data.records : []}
              onEdit={onEdit}
              onDelete={onDelete}
              isBhw={isBhwRole}
            />
          </Box>
          <DeleteDialog open={openDelete} onClose={onCloseDeleteDialog} />
        </Collapse>
        <Collapse in={showForm}>
          <Form medicine={getData} onSave={onSave} onCloseForm={onCloseForm} />
        </Collapse>
      </Container>
    </Page>
  );
};

export default CustomerListView;
