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

const ResetPasswordDialog = ({ open, onClose }) => {
  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Reset User Password</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          <p>Do you want to Reset user password for this record? The default</p>
          <p>password will be "mavalor"</p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => onClose(true)} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ResetPasswordDialog;
