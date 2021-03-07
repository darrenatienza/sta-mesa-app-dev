import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Collapse,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useOfficialViewState } from '../../../states';
import useAxios from 'axios-hooks';
import DeleteDialog from 'src/views/shared/DeleteDialog';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const OfficialListView = () => {
  const classes = useStyles();
  const [criteria, setCriteria] = useState('');
  const [
    officialViewState,
    {
      setOfficialID,
      setShowOfficialListView,
      setShowOfficialFormView,
      setRefreshList
    }
  ] = useOfficialViewState();
  const [
    {
      data: getOfficialList,
      loading: getOfficialListLoading,
      error: getOfficialListError
    },
    refetch
  ] = useAxios(
    `/records/view_officials?filter1=first_name,cs,${criteria}&filter2=last_name,cs,${criteria}`
  );
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [myOfficialID, setMyOfficialID] = useState();

  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: `/records/officials/${myOfficialID}`, method: 'DELETE' },
    {
      manual: true
    }
  );

  const onEdit = officialID => {
    setOfficialID(officialID);
    setShowOfficialFormView(true);
    setShowOfficialListView(false);
  };
  const onDelete = id => {
    setMyOfficialID(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirm = () => {
    executeDelete();
    setOpenDeleteDialog(false);
    setRefreshList(true);
  };

  useEffect(() => {
    refetchAsync();
  }, [officialViewState.refeshList]);

  //need to async because action before this is http put
  const refetchAsync = async () => {
    await refetch();
    setRefreshList(false);
  };
  const onCloseDeleteDialog = async confirm => {
    if (confirm) {
      await executeDelete();
      await refetch();
    }
    setOpenDeleteDialog(false);
  };
  const onSearch = criteria => {
    setCriteria(criteria);
  };
  const onAdd = () => {
    setShowOfficialListView(false);
    setShowOfficialFormView(true);
  };
  return (
    <>
      <Toolbar onSearch={onSearch} onAdd={onAdd} />
      <Box mt={3}>
        <Results
          officials={getOfficialList ? getOfficialList.records : []}
          onEdit={onEdit}
          onDelete={onDelete}
        />
        <DeleteDialog open={openDeleteDialog} onClose={onCloseDeleteDialog} />
      </Box>
    </>
  );
};

export default OfficialListView;
