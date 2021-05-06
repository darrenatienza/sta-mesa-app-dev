import React, { useState, useEffect } from 'react';
import { Box, Container, Collapse, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useCurrentUser } from '../../states';
import useAxios, { makeUseAxios } from 'axios-hooks';
import Form from './Form';
import DeleteDialog from '../shared/DeleteDialog';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const useAxios1 = makeUseAxios({
  axios: axios.create({ baseURL: 'https://graph.facebook.com' })
});
const FbPostView = () => {
  const classes = useStyles();
  const [criteria, setCriteria] = useState('');
  const [selectedID, setSelectedID] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [currentUser] = useCurrentUser();
  const [isBhwRole, setIsBhwRole] = useState(false);
  const [
    { data: getListData, loading: getListLoading, error: getListError },
    refetch
  ] = useAxios(
    {
      url: `/records/fb_posts?filter=message,cs,${criteria}`,
      method: 'GET'
    },
    { manual: true }
  );

  const [
    { data: getData, loading: getLoading, error: getError },
    refetchSingle
  ] = useAxios(
    {
      url: `/records/fb_posts/${selectedID}`,
      method: 'GET'
    },
    { manual: true }
  );
  const [{ data: putData, putLoading, putError }, executePut] = useAxios(
    {
      url: `/records/fb_posts/${selectedID}`,
      method: 'PUT'
    },
    { manual: true }
  );
  const [{ postData, postLoading, postError }, executePost] = useAxios(
    {
      url: `/records/fb_posts`,
      method: 'POST'
    },
    { manual: true }
  );
  const [{ deleteData, deleteLoading, deleteError }, executeDelete] = useAxios(
    {
      url: `/records/fb_posts/${selectedID}`,
      method: 'DELETE'
    },
    { manual: true }
  );
  //fb posts
  const [
    {
      postData: postFbData,
      postLoading: postFbLoading,
      postError: postFbError
    },
    executePostFb
  ] = useAxios1(
    {
      url: `/103103188606518/feed?`,
      method: 'POST'
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
    const { data: fbData } = await executePostFb({
      params: {
        message: data.message,

        access_token:
          'EAAB2F8V0vD8BAJviOjqJlOwo4me0gw3KmY9sRYtFs5ONf2nNJYd4PftqoyMMxSq6ZC8xgjS3PrtXk8UfVPp7pQpZBbnw9N13E9rravJYj1JhtjWfv0ItZA3X8AzZCxoy7krNH8KwgliIIsqQgvDVgMU74NfBXFgWP6rsFPZBPmyegl7wEWc3O6afhBk7jQsaFu8dxWjBZAQodjsZBZAO8uF5'
      }
    });
    await executePost({
      data: {
        message: data.message
      }
    });
    setSelectedID(0);
    setShowForm(false);
    await refetch();
  };
  const onCloseDeleteDialog = async result => {
    setOpenDelete(false);
    if (result) {
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
    <Page className={classes.root} title="Facebook Annoucements">
      <Container maxWidth={false}>
        <Collapse in={!showForm}>
          <Toolbar onSearch={onSearch} onAdd={onAdd} isBhw={isBhwRole} />
          <Box mt={3}>
            <Results
              fbPosts={getListData ? getListData.records : []}
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

export default FbPostView;
