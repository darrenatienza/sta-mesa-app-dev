import React, { useState, useEffect } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { useDeleteDialog } from '../../../states';
import useAxios from 'axios-hooks';
import { TextField, MenuItem } from '@material-ui/core';

const DocumentStatusDialog = ({ open, onConfirm, onClose }) => {
  const [selectedDocStatusID, setSelectedDocStatusID] = useState(0);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/doc_statuses`,
      method: 'GET'
    },
    { manual: true }
  );

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
          Please select one of the following status
        </DialogContentText>
        <TextField
          fullWidth
          select
          variant="outlined"
          label="Document Status"
          as={TextField}
          name="docStatus"
          defaultValue=""
          onChange={e => setSelectedDocStatusID(e.target.value)}
        >
          {data &&
            data.records.map(option => (
              <MenuItem key={option.doc_status_id} value={option.doc_status_id}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>
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
