import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles, Collapse } from '@material-ui/core';

import Results from './Results';
import Toolbar from './Toolbar';

import { useCurrentUser, useResidentViewState } from '../../../states';
import useAxios from 'axios-hooks';
import DeleteDialog from './DeleteDialog';
import ResetPasswordDialog from './ResetPasswordDialog';
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const ResidentListView = () => {
  const classes = useStyles();
  const [criteria, setCriteria] = useState('');
  const [currentUser] = useCurrentUser();
  const [selectedDeletePersonID, setSelectedDeletePersonID] = useState();
  const [showActivateUserDialog, setShowActivateUserDialog] = useState(false);
  const [selectedUserToActivate, setSelectedUserToActivate] = useState();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOfficial, setIsOfficial] = useState(false);
  const [
    selectedResetPersonPasswordID,
    setSelectedResetPersonPasswordID
  ] = useState();
  const [
    selectedResetUserPasswordID,
    setSelectedResetUserPasswordID
  ] = useState();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openResetPasswordDialog, setOpenResetPasswordDialog] = useState(false);

  const [
    residentViewState,
    { setShowResidentDetailView, setShowResidentListView, setCurrentPersonID }
  ] = useResidentViewState();

  // http - get list of residents / persons according to criteria
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_persons?filter=first_name,cs,${criteria}`,
      method: 'GET'
    },
    { manual: false }
  );
  // http - get user by person id
  const [
    { data: getUserData, loading: getUserLoading, error: getUserError },
    refetchUserData
  ] = useAxios(
    {
      url: `/records/users?filter=person_id,eq,${selectedResetPersonPasswordID}`,
      method: 'GET'
    },
    { manual: true }
  );
  // http - delete person by id
  const [
    {
      data: deletePersonData,
      loading: deletePersonLoading,
      error: deletePersonError
    },
    executeDeletePerson
  ] = useAxios(
    { url: `/records/persons/${selectedDeletePersonID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  // http - reset the password of user
  const [
    {
      data: resetPasswordData,
      loading: resetPasswordLoading,
      error: resetPasswordError
    },
    executeResetPassword
  ] = useAxios(
    {
      url: `/records/users/${selectedResetUserPasswordID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );
  // http - reset the password of user
  const [
    {
      data: activateUserData,
      loading: activateUserLoading,
      error: activateUserError
    },
    executeActivateUser
  ] = useAxios(
    {
      url: `/records/users/${selectedUserToActivate &&
        selectedUserToActivate.userID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );
  //effect - occurs when showing  list
  useEffect(() => {
    if (residentViewState.showResidentListView) {
      const performRefetch = async () => {
        await refetch();
      };
      performRefetch();
    }
  }, [residentViewState.showResidentListView]);

  //effect - occurs when selected person id to reset changed
  useEffect(() => {
    if (selectedResetPersonPasswordID) {
      const performUserFetch = async () => {
        const { data: array } = await refetchUserData();
        if (array) {
          const userID = array.records[0].user_id;
          setSelectedResetUserPasswordID(userID);
        }
      };
      performUserFetch();
    }
  }, [selectedResetPersonPasswordID]);
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
  //callback - occurs when reset click
  const onResetPassword = async personID => {
    setSelectedResetPersonPasswordID(personID);
    setOpenResetPasswordDialog(true);
  };
  //callback - occurs when view detail click
  const onViewDetail = personID => {
    setCurrentPersonID(personID);
    setShowResidentListView(false);
    setShowResidentDetailView(true);
  };
  //callback - occurs when delete click
  const onDelete = personID => {
    setSelectedDeletePersonID(personID);
    setOpenDeleteDialog(true);
  };
  //callback - occurs when delete dialog close
  const onCloseDeleteDialog = async confirm => {
    if (confirm) {
      await executeDeletePerson();
      refetch();
    }
    setOpenDeleteDialog(false);
  };
  //callback - occurs when reset dialog close
  const onCloseResetPasswordDialog = async confirm => {
    if (confirm) {
      await executeResetPassword({
        data: {
          password: 'stamesa'
        }
      });
    }
    setOpenResetPasswordDialog(false);
  };
  const handleOnActivateUser = (userId, active) => {
    setShowActivateUserDialog(true);
    setSelectedUserToActivate({ userID: userId, active: active });
  };
  const handleOnCloseActivateUserDialog = async confirm => {
    if (confirm) {
      await executeActivateUser({
        data: {
          active: !selectedUserToActivate.active
        }
      });
    }
    await refetch();
    setShowActivateUserDialog(false);
  };
  return (
    <div>
      <Toolbar criteria={criteria} />
      <Box mt={3}>
        {!loading && (
          <Results
            residents={data}
            onDelete={onDelete}
            onReset={onResetPassword}
            onViewDetail={onViewDetail}
            onActivateUser={handleOnActivateUser}
            isAdmin={isAdmin}
            isOfficial={isOfficial}
          />
        )}
      </Box>
      <DeleteDialog open={openDeleteDialog} onClose={onCloseDeleteDialog} />
      <ResetPasswordDialog
        open={openResetPasswordDialog}
        onClose={onCloseResetPasswordDialog}
      />
      <ConfirmationDialog
        open={showActivateUserDialog}
        message={
          selectedUserToActivate && selectedUserToActivate.active
            ? `Do you want to de activate this user?`
            : `Do you want to activate this user?`
        }
        title={
          selectedUserToActivate && !selectedUserToActivate.active
            ? `Activate User`
            : `Deactivate User`
        }
        onClose={handleOnCloseActivateUserDialog}
      />
    </div>
  );
};

export default ResidentListView;
