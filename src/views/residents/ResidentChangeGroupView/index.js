import React, { useEffect, useState } from 'react';
import { useResidentViewState, usePersonEntity } from '../../../states';
import useAxios from 'axios-hooks';
import Page from 'src/components/Page';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  CircularProgress,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ResidentChangeGroupView = ({ className, ...rest }) => {
  const classes = useStyles();
  const states = [
    {
      value: 'resident',
      label: 'Resident'
    },
    {
      value: 'official',
      label: 'Official'
    },
    {
      value: 'bhw',
      label: 'BHW'
    },
    {
      value: 'admin',
      label: 'Administrator'
    }
  ];
  const [values, setValues] = useState({
    firstName: 'Katarina',
    lastName: 'Smith',
    email: 'demo@devias.io',
    phone: '',
    state: 'admin',
    country: 'USA'
  });

  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
  const [personEntity, { setGroup }] = usePersonEntity();
  const [
    residentViewState,
    { setOpenChangeGroupDialog }
  ] = useResidentViewState();

  const [
    {
      data: updatePersonData,
      loading: updatePersonLoading,
      error: updatePersonError
    },
    executePersonDataUpdate
  ] = useAxios(
    { url: `/records/persons/${personEntity.personID}`, method: 'PUT' },
    {
      manual: true
    }
  );

  const handleClose = () => {
    setOpenChangeGroupDialog(false);
  };
  //TODO: add alert after group changed
  const handleConfirm = async () => {
    await executePersonDataUpdate({
      data: {
        group: personEntity.group
      }
    });
    setOpenChangeGroupDialog(false);
  };
  if (updatePersonLoading)
    return <CircularProgress className={classes.progress} />;
  if (updatePersonError) return <p>Error!</p>;
  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="Please select the group for this resident."
          title="Group"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Group"
                name="state"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.state}
                variant="outlined"
              >
                {states.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save Changes
          </Button>
        </Box>
      </Card>
    </form>
  );
};
/*<Dialog
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

        <FormControl
          variant="outlined"
          fullWidth
          className={classes.formControl}
        >
          <InputLabel id="demo-simple-select-outlined-label">Group</InputLabel>
          <Select
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            value={personEntity.group}
            onChange={e => setGroup(e.target.value)}
            label="Group"
          >
            <MenuItem value="resident">Resident</MenuItem>
            <MenuItem value="administrator">Administrator</MenuItem>
            <MenuItem value="official">Official</MenuItem>
            <MenuItem value="bhw">BHW</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenChangeGroupDialog(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleConfirm()} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog> */
export default ResidentChangeGroupView;
