import React from 'react'
import { useResidentViewState } from '../../../states';
import useAxios from 'axios-hooks';
import {
    
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControl,
    MenuItem,
    Select,
    InputLabel,

    makeStyles
  } from '@material-ui/core';
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
const ResidentChangeGroupView = () => {
    const [residentViewState, { setOpenChangeGroupDialog }] = useResidentViewState();
    const [
        {
          data: deletePersonData,
          loading: deletePersonLoading,
          error: deletePersonError
        },
        executeResidentGroupUpdate
      ] = useAxios(
        { url: `/records/persons/${residentViewState.personID}`, method: 'PUT' },
        {
          manual: true
        }
    );
    const [
      {
        data: getPersonData,
        loading: getPersonDataLoading,
        error: getPersonDataError
      },
      getPersonDataUpdate
    ] = useAxios(
      { url: `/records/persons/${residentViewState.personID}`, method: 'PUT' },
      {
        manual: true
      }
      );
    //background task for deleting person
    const classes = useStyles();
    const [age, setAge] = React.useState('');
  
    const handleChange = (event) => {
      setAge(event.target.value);
    };
    const handleClose = () => {
        setOpenChangeGroupDialog(false);
      };
    
    const handleConfirm = async () => {
        //await getPersonDataUpdate();
          setOpenChangeGroupDialog(false);
      };
      return (
        <Dialog
          fullWidth
          open={residentViewState.openChangeGroupDialog}
          onClose={() => setOpenChangeGroupDialog(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Change Group</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
                      Please select the group
            </DialogContentText>
            <FormControl variant="outlined" fullWidth className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Group</InputLabel>
              <Select
                
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange}
          label="Age"
        >
         
          <MenuItem value={10}>Resident</MenuItem>
          <MenuItem value={20}>Administrator</MenuItem>
                <MenuItem value={30}>Official</MenuItem>
                <MenuItem value={40}>BHW</MenuItem>
        </Select>
      </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() =>setOpenChangeGroupDialog(false)} color="primary">
              Cancel
            </Button>
            <Button onClick={() => handleConfirm()} color="primary" autoFocus>
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      );
}

export default ResidentChangeGroupView
