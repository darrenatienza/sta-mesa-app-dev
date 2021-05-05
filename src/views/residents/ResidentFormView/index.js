import React, { useState, useEffect } from 'react';
import { Divider, Box, Button, makeStyles } from '@material-ui/core';

import ProfileDetails from './ProfileDetails';
import useAxios from 'axios-hooks';
import { useCurrentUser, useResidentViewState } from '../../../states';

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
  const [currentUser] = useCurrentUser();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOfficial, setIsOfficial] = useState(false);
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
  //check for roles
  useEffect(() => {
    if (currentUser.roles.length > 0) {
      currentUser.roles.map(r => {
        if (r.title === 'admin') {
          setIsAdmin(true);
        }
        if (r.title === 'official') {
          setIsOfficial(true);
        }
      });
    }
  }, [currentUser.roles]);
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
      {isAdmin && <ResidentChangeGroupView />}
    </div>
  );
};

export default ResidentFormView;
