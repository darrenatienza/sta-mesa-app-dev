import React, { useEffect } from 'react';
import { useResidentViewState } from '../../../states';
import useAxios from 'axios-hooks';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  makeStyles
} from '@material-ui/core';

const ResidentResetPasswordView = () => {
  const [
    residentViewState,
    { setOpenResetPasswordDialog, setUserID }
  ] = useResidentViewState();
  const [
    {
      data: getUserDataByPersonID,
      loading: getUserDataByPersonIDLoading,
      error: getUserDataByPersonIDError
    },
    getUserByPersionID
  ] = useAxios(
    {
      url: `/records/users?filter=person_id,eq,${residentViewState.personID}`,
      method: 'GET'
    },
    { manual: !residentViewState.personID }
  );
  useEffect(() => {
    if (getUserDataByPersonID?.records[0]) {
      //console.log(getUserDataByPersonID?.records[0])
      const userID = getUserDataByPersonID?.records[0]['user_id'];
      setUserID(userID);
    }
  }, [getUserDataByPersonID?.records]);

  const [
    { data: putUserData, loading: putUserLoading, error: putUserError },
    executeUserUpdate
  ] = useAxios(
    {
      url: `/records/users/${residentViewState.userID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );

  const [
    {
      data: getUserData,
      loading: getUserDataByLoading,
      error: getUserDataByError
    },
    getUser
  ] = useAxios(
    {
      url: `/records/users/${residentViewState.userID}`,
      method: 'GET'
    },
    {
      manual: !residentViewState.userID
    }
  );

  const handleConfirm = async () => {
    await executeUserUpdate({
      data: {
        password: getUserData?.username
      }
    });
    setOpenResetPasswordDialog(false);
  };
  return (
    <Dialog
      fullWidth
      open={residentViewState.openResetPasswordDialog}
      onClose={() => setOpenResetPasswordDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Reset User Password</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to Reset user password for this record?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => setOpenResetPasswordDialog(false)}
          color="primary"
        >
          Cancel
        </Button>
        <Button onClick={() => handleConfirm()} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResidentResetPasswordView;
