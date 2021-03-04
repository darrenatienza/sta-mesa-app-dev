import React, { useState, useEffect } from 'react';
import { Divider, Box, Button, makeStyles } from '@material-ui/core';

import ProfileDetails from './ProfileDetails';
import useAxios from 'axios-hooks';
import { useResidentViewState } from '../../../states';

import ResidentChangeGroupView from '../ResidentChangeGroupView';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  progress: {
    margin: 10
  }
}));

const ResidentFormView = () => {
  const classes = useStyles();
  const [
    residentViewState,
    { setShowResidentDetailView, setShowResidentListView }
  ] = useResidentViewState();

  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/persons/${residentViewState.currentPersonID}`,
      method: 'GET'
    },
    {
      manual: !residentViewState.currentPersonID
    }
  );

  const handleClose = event => {
    setShowResidentDetailView(false);
    setShowResidentListView(true);
  };
  return (
    <div>
      <Box mb={3}>
        <Button
          color="primary"
          variant="outlined"
          className={classes.cancelButton}
          onClick={handleClose}
        >
          Back
        </Button>
      </Box>
      <ProfileDetails profileDetails={data} onClose={handleClose} />
      <ResidentChangeGroupView />
    </div>
  );
};

export default ResidentFormView;
