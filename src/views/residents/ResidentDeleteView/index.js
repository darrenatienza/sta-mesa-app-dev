import React from 'react';
import { useResidentViewState, usePersonEntity } from '../../../states';
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
const ResidentDeleteView = () => {
  const [residentViewState, { setOpenDeleteDialog }] = useResidentViewState();
  const [personEntity] = usePersonEntity();
  const [
    {
      data: deletePersonData,
      loading: deletePersonLoading,
      error: deletePersonError
    },
    executePersonDelete
  ] = useAxios(
    { url: `/records/persons/${personEntity.personID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  //background task for deleting person
  const executePersonDeleteAsync = async () => {};
  const handleClose = () => {
    setOpenDeleteDialog(false);
  };

  const handleConfirm = async () => {
    await executePersonDelete();
    setOpenDeleteDialog(false);
  };
  return (
    <Dialog
      fullWidth
      open={residentViewState.openDeleteDialog}
      onClose={() => setOpenDeleteDialog(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Delete Record</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Do you want to delete this record
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleConfirm()} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResidentDeleteView;
