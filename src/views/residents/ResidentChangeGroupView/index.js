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
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
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
  const [activeRoleID, setActiveRoleID] = useState(null);
  const [personRoleID, setPersonRoleID] = useState(null);
  const [checked, setChecked] = React.useState(['1']);
  const [{ data, loading, error }, refetch] = useAxios(`/records/roles`);

  const [personEntity, { setGroup }] = usePersonEntity();
  const [
    residentViewState,
    { setOpenChangeGroupDialog }
  ] = useResidentViewState();

  const [
    {
      data: getPersonRolesData,
      loading: getPersonRolesDataLoading,
      error: getPersonRolesDataError
    },
    refetchPersonRolesData
  ] = useAxios(
    `/records/person_roles?filter=person_id,eq,${personEntity.personID}`,
    {
      manual: !personEntity.personID
    }
  );
  useEffect(() => {
    refetchPersonRolesData();
  }, []);
  const [
    {
      data: getOnePersonRolesData,
      loading: getOnePersonRolesDataLoading,
      error: getOnePersonRolesDataError
    },
    refetchOnePersonRolesData
  ] = useAxios(
    `/records/person_roles?filter=person_id,eq,${personEntity.personID}&filter=role_id,eq,${activeRoleID}`,
    {
      manual: !personEntity.personID || !activeRoleID
    }
  );
  //Todo: Post Action for adding roles
  useEffect(() => {
    if (getOnePersonRolesData) {
      console.log(getOnePersonRolesData.records[0].person_role_id);
      setPersonRoleID(getOnePersonRolesData.records[0].person_role_id);
    }
  }, [getOnePersonRolesData]);

  useEffect(() => {
    if (personRoleID) {
      deletePersonRole();
    }
  }, [personRoleID]);
  const deletePersonRole = async () => {
    await executePersonRoleDelete();
    await refetchPersonRolesData();
    setPersonRoleID(null);
    setActiveRoleID(null);
  };
  useEffect(() => {
    if (getPersonRolesData) {
      const newChecked = [...checked];
      getPersonRolesData.records.map(v => {
        newChecked.push(v.role_id);
        console.log(v.role_id);
      });
      setChecked(newChecked);
    }
  }, [getPersonRolesData]);

  const [
    {
      data: deletePersonRoleData,
      loading: deletePersonRoleLoading,
      error: deletePersonRoleError
    },
    executePersonRoleDelete
  ] = useAxios(
    { url: `/records/person_roles/${personRoleID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  const handleClose = () => {
    setOpenChangeGroupDialog(false);
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
      setActiveRoleID(value);
    }

    setChecked(newChecked);
    console.log(newChecked);
  };

  if (deletePersonRoleLoading)
    return <CircularProgress className={classes.progress} />;
  if (deletePersonRoleError) return <p>Error!</p>;
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
              <FormControl
                required
                component="fieldset"
                className={classes.formControl}
              >
                {data &&
                  data.records.map(option => {
                    const labelId = `checkbox-list-secondary-label-${option.role_id}`;
                    return (
                      <FormControlLabel
                        key={option.role_id}
                        control={
                          <Checkbox
                            disabled={option.role_id === '1'}
                            checked={checked.indexOf(option.role_id) !== -1}
                            onChange={handleToggle(option.role_id)}
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        }
                        label={option.title}
                      />
                    );
                  })}
              </FormControl>
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
