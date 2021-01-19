import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useResidentViewState, usePersonEntity } from '../../../states';
import useAxios from 'axios-hooks';
import moment from 'moment';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import { Formik } from 'formik';
import * as Yup from 'yup';
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
  root: {},
  cancelButton: {
    marginRight: '10px'
  }
}));

const ProfileDetails = ({ className, ...rest }) => {
  const navigate = useNavigate();
  const [
    residentViewState,
    { setShowResidentDetailView, setShowResidentListView }
  ] = useResidentViewState();
  const [personEntity] = usePersonEntity();
  const classes = useStyles();
  const [userName, setUserName] = useState('');
  const [values, setValues] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    civilStatus: 'single',
    birthDate: moment().format('YYYY-MM-DD'),
    phone: ''
  });

  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    { url: `/records/persons/${personEntity.personID}`, method: 'PUT' },
    {
      manual: true
    }
  );

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    { url: `/records/persons`, method: 'POST' },
    {
      manual: true
    }
  );

  const [
    { loading: postUserLoading, error: postUserError },
    executeUserPost
  ] = useAxios(
    { url: `/records/users`, method: 'POST' },
    {
      manual: true
    }
  );

  // for record to edit load current data
  useEffect(() => {
    setValues({
      firstName: personEntity.firstName,
      middleName: personEntity.middleName,
      lastName: personEntity.lastName,
      civilStatus: personEntity.civilStatus,
      phone: personEntity.phoneNumber,
      birthDate: moment(personEntity.birthDate).format('YYYY-MM-DD')
    });
  }, [personEntity]);

  // when new person generated proceed saving on new user
  useEffect(() => {
    if (postData) saveNewUser(postData);
  }, [postData]);

  // save new user
  const saveNewUser = async personID => {
    await executeUserPost({
      data: {
        username: userName, // remove spaces
        password: userName,
        person_id: personID
      }
    });
    setShowResidentDetailView(false);
    setShowResidentListView(true);
  };
  //handles the save click
  const handleSave = async formValues => {
    if (personEntity.personID == 0) {
      console.log('New Record');

      const _username =
        formValues.firstName.toLowerCase() +
        formValues.middleName.toLowerCase() +
        formValues.lastName.toLowerCase();
      setUserName(_username.replace(/\s+/g, ''));

      await executePost({
        data: {
          first_name: formValues.firstName,
          middle_name: formValues.middleName,
          last_name: formValues.lastName,
          civil_status: formValues.civilStatus,
          phone_number: formValues.phone,
          birthdate: formValues.birthDate
        }
      });
    } else {
      // update only the record
      console.log('update record');
      await executePut({
        data: {
          first_name: formValues.firstName,
          middle_name: formValues.middleName,
          last_name: formValues.lastName,
          civil_status: formValues.civilStatus,
          phone_number: formValues.phone,
          birthdate: formValues.birthDate
        }
      });
      setShowResidentDetailView(false);
      setShowResidentListView(true);
    }
  };
  const handleClose = event => {
    setShowResidentDetailView(false);
    setShowResidentListView(true);
  };
  if (putLoading || postLoading || postUserLoading)
    return <CircularProgress className={classes.progress} />;
  if (putError || postError || postUserError) return <p>Error!</p>;

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={values}
        validationSchema={Yup.object().shape({
          firstName: Yup.string()
            .max(255)
            .required('First Name is required'),
          middleName: Yup.string()
            .max(255)
            .required('Middle Name is required'),
          lastName: Yup.string()
            .max(255)
            .required('Last Name is required'),
          phone: Yup.string()
            .min(5, 'Too Short')
            .max(20, 'Too Long')
            .required('Phone Number is required')
        })}
        onSubmit={handleSave}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values
        }) => (
          <form
            onSubmit={handleSubmit}
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
                    <TextField
                      error={Boolean(touched.firstName && errors.firstName)}
                      helperText={touched.firstName && errors.firstName}
                      onBlur={handleBlur}
                      fullWidth
                      label="First name"
                      name="firstName"
                      onChange={handleChange}
                      required
                      value={values.firstName || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                      error={Boolean(touched.middleName && errors.middleName)}
                      helperText={touched.middleName && errors.middleName}
                      onBlur={handleBlur}
                      fullWidth
                      label="Middle name"
                      name="middleName"
                      onChange={handleChange}
                      required
                      value={values.middleName || ''}
                      variant="outlined"
                    />
                  </Grid>
                  <Grid item md={4} xs={12}>
                    <TextField
                      error={Boolean(touched.lastName && errors.lastName)}
                      helperText={touched.lastName && errors.lastName}
                      onBlur={handleBlur}
                      fullWidth
                      label="Last name"
                      name="lastName"
                      onChange={handleChange}
                      required
                      value={values.lastName || ''}
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
                      //defaultValue={moment().format('YYYY-MM-DD')}
                      onChange={handleChange}
                      value={values.birthDate || moment().format('YYYY-MM-DD')}
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
                        <option key={option.value} value={option.value || ''}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item md={12} xs={12}>
                    <TextField
                      error={Boolean(touched.phone && errors.phone)}
                      helperText={touched.phone && errors.phone}
                      onBlur={handleBlur}
                      fullWidth
                      label="Phone Number"
                      name="phone"
                      onChange={handleChange}
                      type="number"
                      value={values.phone || ''}
                      variant="outlined"
                    />
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  color="primary"
                  variant="contained"
                >
                  Save details
                </Button>
              </Box>
            </Card>
          </form>
        )}
      </Formik>
    </>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
