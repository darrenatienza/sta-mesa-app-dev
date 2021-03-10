import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

import moment from 'moment';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
  Grid,
  Card,
  CardMedia,
  makeStyles,
  CardContent,
  Divider
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import useAxios from 'axios-hooks';
import Page from 'src/components/Page';
import MuiAlert from '@material-ui/lab/Alert';
import Logo from 'src/components/Logo';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    //height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  media: {
    height: 140
  },
  logo: {
    width: '150px',
    height: '150px'
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();

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
  const gender = [
    {
      value: 'male',
      label: 'Male'
    },
    {
      value: 'female',
      label: 'Female'
    }
  ];
  const [
    { data: postUserData, loading: postUserLoading, error: postUserError },
    executePostUser
  ] = useAxios(
    { url: `/records/users`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    {
      data: postPersonData,
      loading: postPersonLoading,
      error: postPersonError
    },
    executePostPerson
  ] = useAxios(
    { url: `/records/persons`, method: 'POST' },
    {
      manual: true
    }
  );

  // callbacks
  const { handleSubmit, control, errors } = methods;
  const onSubmit = async data => {
    const { data: newPersonID } = await executePostPerson({
      data: {
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        civil_status: data.civilStatus,
        phone_number: data.phoneNumber,
        birthdate: data.birthDate,
        gender: data.gender
      }
    });

    if (newPersonID > 0) {
      const { data: user_id } = await executePostUser({
        data: {
          username: data.userName,
          password: data.password,
          person_id: newPersonID,
          active: 1
        }
      });
      // success saving records
      user_id > 0 && navigate('/login');
    }
  };
  return (
    <Page className={classes.root} title="Register">
      <Box display="flex" flexDirection="column" justifyContent="center">
        <Container maxWidth="sm">
          <Box display="flex" justifyContent="center" mb={3}>
            <Logo className={classes.logo} />
          </Box>

          <Card>
            <CardContent>
              <Box textAlign="center" mt={3} mb={3}>
                <Typography color="textPrimary" variant="h2">
                  Register new residents Record
                </Typography>
                <Typography color="textSecondary" gutterBottom variant="body2">
                  Please specify correct information here
                </Typography>
              </Box>
              <Divider />
              <Box mt={3}>
                <Controller
                  fullWidth
                  margin="normal"
                  as={TextField}
                  name="userName"
                  label="User Name"
                  control={control}
                  defaultValue=""
                  variant="filled"
                  rules={{ required: true }}
                  error={errors.userName && true}
                />
                <Controller
                  fullWidth
                  margin="normal"
                  as={TextField}
                  name="password"
                  label="Password"
                  control={control}
                  defaultValue=""
                  variant="filled"
                  rules={{ required: true }}
                  error={errors.password && true}
                />
              </Box>

              <Box mt={3}>
                <Typography variant="h6">Personal Information</Typography>
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
                <Controller
                  fullWidth
                  margin="normal"
                  as={TextField}
                  select
                  name="gender"
                  label="Gender"
                  control={control}
                  defaultValue="male"
                  variant="outlined"
                  SelectProps={{
                    native: true
                  }}
                >
                  {gender.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Controller>
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
              </Box>
            </CardContent>
            {postPersonLoading ||
              (postUserLoading && (
                <Alert severity="success" className={classes.alert}>
                  Loading please wait...
                </Alert>
              ))}

            {postPersonError ||
              (postUserError && (
                <Alert severity="error" className={classes.alert}>
                  Login failed
                </Alert>
              ))}
            <Divider />

            <Box
              m={2}
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
            >
              <Box mr={3}>
                <Typography color="textSecondary" variant="body1">
                  Already have account?{' '}
                  <Link component={RouterLink} to="/login" variant="h6">
                    Sign in
                  </Link>
                </Typography>
              </Box>
              <Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit(onSubmit)}
                >
                  Register
                </Button>
              </Box>
            </Box>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default RegisterView;
