import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import moment from 'moment';
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
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';

const useStyles = makeStyles(() => ({
  root: {},
  cancelButton: {
    marginRight: '10px'
  }
}));

const ProfileDetails = ({ className, profileDetails, ...rest }) => {
  const classes = useStyles();
  const method = useForm();
  const { control, setValue } = method;
  // for record to edit load current data
  useEffect(() => {
    if (profileDetails) {
      //upper case civil status first letter
      const upperCaseCS =
        profileDetails.civil_status.charAt(0).toUpperCase() +
        profileDetails.civil_status.slice(1);
      setValue('firstName', profileDetails.first_name);
      setValue('middleName', profileDetails.middle_name);
      setValue('lastName', profileDetails.last_name);
      setValue(
        'birthDate',
        moment(profileDetails.birth_date).format('YYYY-MM-DD')
      );
      setValue('civilStatus', upperCaseCS);
      setValue('phoneNumber', profileDetails.phone_number);
    }
  }, [profileDetails]);

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
          title="Resident Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={4} xs={12}>
              <Controller
                fullWidth
                disabled
                variant="outlined"
                label="First Name"
                as={TextField}
                name="firstName"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Controller
                fullWidth
                disabled
                variant="outlined"
                label="Middle Name"
                as={TextField}
                name="middleName"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item md={4} xs={12}>
              <Controller
                fullWidth
                disabled
                variant="outlined"
                label="Last Name"
                as={TextField}
                name="lastName"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                disabled
                variant="outlined"
                label="Birth Date"
                as={TextField}
                name="birthDate"
                type="date"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                disabled
                variant="outlined"
                label="Civil Status"
                as={TextField}
                name="civilStatus"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Controller
                fullWidth
                disabled
                variant="outlined"
                label="Phone Number"
                as={TextField}
                name="phoneNumber"
                control={control}
                defaultValue=""
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
