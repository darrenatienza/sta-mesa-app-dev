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

const DocumentStatusDialog = ({ open, onClose }) => {
  const [selectedDocStatusID, setSelectedDocStatusID] = useState(0);
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/doc_statuses`,
      method: 'GET'
    },
    { manual: false }
  );

  return (
    <Dialog
      fullWidth
      open={open}
      onClose={() => onClose(0, false)}
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
          defaultValue={0}
          onChange={e => setSelectedDocStatusID(e.target.value)}
        >
          <MenuItem key={0} value={0}>
            Select here...
          </MenuItem>
          {data &&
            data.records.map(option => (
              <MenuItem key={option.doc_status_id} value={option.doc_status_id}>
                {option.name}
              </MenuItem>
            ))}
        </TextField>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(0, false)} color="primary">
          Cancel
        </Button>
        <Button
          disabled={selectedDocStatusID === 0}
          onClick={() => onClose(selectedDocStatusID, true)}
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
