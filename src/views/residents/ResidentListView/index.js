import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles, Collapse } from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { useResidentViewState } from '../../../states';
import useAxios from 'axios-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const ResidentListView = () => {
  const classes = useStyles();

  const [selectedPersonID, setSelectedPersonID] = useState(0);
  const [
    residentViewState,
    {
      setOpenResetPasswordDialog,
      setShowResidentDetailView,
      setShowResidentListView,
      setOpenDeleteDialog,
      setDeleteSuccess,
      setCurrentPersonID
    }
  ] = useResidentViewState();

  const [{ data, loading, error }, refetch] = useAxios(
    `/records/persons?filter=first_name,cs,${residentViewState.criteria}`
  );
  useEffect(() => {
    resetPersonEntity();
  }, []);
  const [
    {
      data: getPersonData,
      loading: getPersonDataLoading,
      error: getPersonDataError
    },
    refetchPersonData
  ] = useAxios(`/records/persons/${selectedPersonID}`, {
    manual: true
  });

  //search function
  useEffect(() => {
    if (residentViewState.isDeleteSuccess) {
      refetch();
      setDeleteSuccess(false);
    }
  }, [residentViewState.isDeleteSuccess]);

  useEffect(() => {
    // this must be use

    if (getPersonData) {
      setPersonEntity(
        getPersonData.person_id,
        getPersonData.first_name,
        getPersonData.middle_name,
        getPersonData.last_name,
        getPersonData.civil_status,
        getPersonData.phone_number,
        getPersonData.birthdate,
        getPersonData.group
      );
    }
  }, [getPersonData]);

  useEffect(() => {
    residentViewState.showResidentListView && refetch();
  }, [residentViewState.showResidentListView]);

  const handleResetPassword = personID => {
    setOpenResetPasswordDialog(true);
  };

  const executeRefetchPersonData = async () => {
    await refetchPersonData();
  };
  useEffect(() => {
    selectedPersonID && executeRefetchPersonData();
  }, [selectedPersonID]);
  const handleEdit = personID => {
    setCurrentPersonID(personID);
    setSelectedPersonID(personID);
    setShowResidentListView(false);
    setShowResidentDetailView(true);
  };

  const handleDelete = personID => {
    setPersonID(personID);
    setOpenDeleteDialog(true);
  };
  return (
    <div>
      <Toolbar />
      <Box mt={3}>
        <Results />
      </Box>
    </div>
  );
};

export default ResidentListView;
