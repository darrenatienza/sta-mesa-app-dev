import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useOfficialViewState } from '../../../states';
import useAxios from 'axios-hooks';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  cancelButton: {
    marginRight: '10px'
  }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const [
    officialViewState,
    { setOfficialID, setShowOfficialListView, setShowOfficialFormView }
  ] = useOfficialViewState();
  const [
    {
      data: getPersonListData,
      loading: getPersonListLoading,
      error: getPersonListError
    },
    refetchPersonList
  ] = useAxios(`/records/persons`);

  const [
    {
      data: getPositionListData,
      loading: getPositionListLoading,
      error: getPositionListError
    },
    refetchPositionList
  ] = useAxios(`/records/positions`);
  const [values, setValues] = useState({
    personID: '',
    positionID: ''
  });
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleClose = () => {
    setOfficialID(0);
    setShowOfficialListView(true);
    setShowOfficialFormView(false);
  };
  const classes = useStyles();

  return (
    <form
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Official Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Residents
                </InputLabel>
                <Select
                  fullWidth
                  name="personID"
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={values.personID}
                  onChange={handleChange}
                  label="Residents"
                  variant="outlined"
                >
                  {getPersonListData &&
                    getPersonListData.records.map(option => (
                      <MenuItem key={option.person_id} value={option.person_id}>
                        {option.first_name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="position-label">Position</InputLabel>
                <Select
                  fullWidth
                  name="positionID"
                  labelId="position-label"
                  id="position-label"
                  value={values.positionID}
                  onChange={handleChange}
                  label="Position"
                >
                  {getPositionListData &&
                    getPositionListData.records.map(option => (
                      <MenuItem
                        key={option.position_id}
                        value={option.position_id}
                      >
                        {option.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="outlined"
            className={classes.cancelButton}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained">
            Save Official
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
