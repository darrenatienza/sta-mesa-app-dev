import React, { useState,useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDeleteDialog } from '../../../states';
import useAxios from 'axios-hooks';

const DeleteDialog = ({open,setOpen,setResult}) => {
 
  const handleClose = () => {
    setResult(false)
    setOpen(false);
  };

  const handleOk = () => {
    setResult(true)
    setOpen(false);
  };
  return (
    <Dialog
      fullWidth
      open={open}
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
          Cancel
        </Button>
        <Button onClick={handleOk} color="primary" autoFocus>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
