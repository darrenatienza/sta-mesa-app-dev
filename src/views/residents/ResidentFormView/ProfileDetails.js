import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useOfficial, useResident } from '../../../states';
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
  makeStyles
} from '@material-ui/core';

const states = [
  {
    value: 'alabama',
    label: 'Alabama'
  },
  {
    value: 'new-york',
    label: 'New York'
  },
  {
    value: 'san-francisco',
    label: 'San Francisco'
  }
];
const civilStats = [
  {
    value: 'single',
    label: 'Single'
  },
  {
    value: 'married',
    label: 'Married'
  },
  {
    value: 'separated',
    label: 'Separated'
  },
  {
    value: 'widowed',
    label: 'Widowed'
  }
];
const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, ...rest }) => {
  const [resident] = useResident();

  const classes = useStyles();
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    civilStatus: 'single',
    birthDate: '2017-05-24',
    phone: ''
  });
  const [{ data, loading, error }, refetch] = useAxios(
    `/records/residents/${resident.residentID}`,
    {
      manual: !resident.residentID
    }
  );

  useEffect(() => {
    if (data) {
      setValues({
        ...values,
        firstName: data.first_name,
        lastName: data.last_name,
        civilStatus: data.civil_status,
        phone: data.phone_number
      });
    }
  }, [data]);
  const handleChange = event => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };
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
              <TextField
                fullWidth
                helperText="Please specify the first name"
                label="First name"
                name="firstName"
                onChange={handleChange}
                required
                value={values.firstName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Last name"
                name="lastName"
                onChange={handleChange}
                required
                value={values.lastName}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                id="date"
                name="birthDate"
                label="Birth Date"
                type="date"
                defaultValue="2017-05-24"
                onChange={handleChange}
                value={values.birthDate}
                className={classes.textField}
                variant="outlined"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select Civil Status"
                name="civilStatus"
                onChange={handleChange}
                required
                select
                SelectProps={{ native: true }}
                value={values.civilStatus}
                variant="outlined"
              >
                {civilStats.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Phone Number"
                name="phone"
                onChange={handleChange}
                type="number"
                value={values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Country"
                name="country"
                onChange={handleChange}
                required
                value={values.country}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained">
            Save details
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
