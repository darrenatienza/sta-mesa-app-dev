import React, { useState } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDeleteDialog } from '../../../states';
import useAxios from 'axios-hooks';
const DeleteDialog = () => {
  const [deleteDialog, { setOpenDialog }] = useDeleteDialog();
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: deleteDialog.url, method: 'DELETE' },
    {
      manual: true
    }
  );
  const handleClose = () => {
    setOpenDialog(false);
  };
  const handleAgree = () => {
    setOpenDialog(false);
  };
  return (
    <Dialog
      fullWidth
      open={deleteDialog.open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Remove this record?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cant be undo!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Disagree
        </Button>
        <Button onClick={handleAgree} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
