import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDeleteDialog } from '../../../states';
import useAxios from 'axios-hooks';

const DocumentStatusDialog = ({ open, onConfirm, onClose }) => {
  const [selectedDocStatusID, setSelectedDocStatusID] = useState(0);

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">Document Status</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          This action cant be undo!
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose()} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => onConfirm(selectedDocStatusID)}
          color="primary"
          autoFocus
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DocumentStatusDialog;
