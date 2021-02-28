import React, { useEffect, useState } from 'react';
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
  makeStyles
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import moment from 'moment';
import { Alert } from '@material-ui/lab';
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

const useStyles = makeStyles(() => ({
  root: {}
}));
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
const ProfileDetails = ({
  className,
  profile,
  onSave,
  isLoading,
  isError,
  isSuccess,
  ...rest
}) => {
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control, reset, setValue, errors } = methods;

  useEffect(() => {
    if (profile) {
      setValue('firstName', profile.first_name);
      setValue('middleName', profile.middle_name);
      setValue('lastName', profile.last_name);
      setValue('civilStatus', profile.civil_status);
      setValue('phoneNumber', profile.phone_number);
      setValue('birthDate', moment(profile.birthdate).format('YYYY-MM-DD'));
    }
  }, [profile]);

  return (
    <form
      onSubmit={handleSubmit(onSave)}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="The information can be edited" title="Profile" />
        <Divider />
        <CardContent>
          {isSuccess && (
            <Alert severity="success" variant="filled">
              Successfully saved!
            </Alert>
          )}
          {isLoading && (
            <Alert severity="info" variant="filled">
              Loading please wait..
            </Alert>
          )}
          {isError && (
            <Alert severity="error" variant="filled">
              Error while saving your details.
            </Alert>
          )}
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                name="firstName"
                label="First Name"
                control={control}
                defaultValue=""
                variant="outlined"
                rules={{ required: true }}
                error={errors.firstName && true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                name="middleName"
                label="Middle Name"
                control={control}
                defaultValue=""
                variant="outlined"
                rules={{ required: true }}
                error={errors.middleName && true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                name="lastName"
                label="Last Name"
                control={control}
                defaultValue=""
                variant="outlined"
                rules={{ required: true }}
                error={errors.lastName && true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                select
                name="civilStatus"
                label="Civil Status"
                control={control}
                defaultValue="single"
                variant="outlined"
                SelectProps={{
                  native: true
                }}
              >
                {civilStats.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Controller>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                name="phoneNumber"
                label="Phone Number"
                control={control}
                defaultValue="+639"
                variant="outlined"
                rules={{ required: true }}
                error={errors.phoneNumber && true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                type="date"
                name="birthDate"
                label="Birth Date"
                control={control}
                defaultValue={moment().format('YYYY-MM-DD')}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
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
