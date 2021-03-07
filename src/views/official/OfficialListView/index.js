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
    `/records/view_officials?filter=first_name,cs,${officialViewState.criteria}`
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
  return (
    <Collapse in={officialViewState.showOfficialListView}>
      <Toolbar />
      <Box mt={3}>
        <Results
          officials={getOfficialList ? getOfficialList.records : []}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      </Box>
      {/* Todo: Delete Dialog */}
    </Collapse>
  );
};

export default OfficialListView;
