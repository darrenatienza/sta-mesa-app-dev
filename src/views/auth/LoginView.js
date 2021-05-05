import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  makeStyles,
  Card,
  CardHeader,
  CardContent,
  Snackbar,
  Divider
} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import FacebookIcon from 'src/icons/Facebook';
import GoogleIcon from 'src/icons/Google';
import Page from 'src/components/Page';
import { values } from 'lodash';
import { useForm, Controller } from 'react-hook-form';
import useAxios from 'axios-hooks';
import { useCurrentUser } from '../../states';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  signUp: {
    marginRight: '10px'
  },
  alert: {
    marginBottom: '10px'
  }
}));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const LoginView = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const methods = useForm();
  const [showAccountNotActiveAlert, setShowAccountNotActiveAlert] = useState(
    false
  );
  const { handleSubmit, control, errors } = methods;
  const [
    currentUser,
    { setUserName, setCurrentPersonID, setRoles }
  ] = useCurrentUser();
  const [open, setOpen] = React.useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  // http request
  const [{ data, loading, error }, executeLogin] = useAxios(
    { url: `/login`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    { data: getRoleData, loading: getRoleLoading, error: getRoleError },
    refetchRole
  ] = useAxios(
    {
      url: `/records/view_person_roles?filter=person_id,eq,${currentUser.currentPersonID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  useEffect(() => {
    (loading && setOpen(true)) || (error && setOpen(true));
  }, [loading, error]);

  // occurs when login success
  useEffect(() => {
    if (loginSuccess) {
      const performRoleCheck = async () => {
        const { data: result } = await refetchRole();
        setRoles(result.records);
        navigate('/app/home');
      };
      performRoleCheck();
    }
  }, [loginSuccess]);
  const onSubmit = async data => {
    console.log(data);
    const { data: user } = await executeLogin({
      data: {
        username: data.userName,
        password: data.password
      }
    });
    if (user.active) {
      setUserName(data.userName);
      setCurrentPersonID(user.person_id);
      user.user_id > 0 && setLoginSuccess(true);
    } else {
      setShowAccountNotActiveAlert(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Page className={classes.root} title="Login">
      <Box
        display="flex"
        flexDirection="column"
        height="100%"
        justifyContent="center"
      >
        <Container maxWidth="sm">
          {loading && (
            <Alert severity="success" className={classes.alert}>
              Loading please wait...
            </Alert>
          )}

          {error && (
            <Alert severity="error" className={classes.alert}>
              Login failed
            </Alert>
          )}
          {showAccountNotActiveAlert && (
            <Alert
              severity="error"
              className={classes.alert}
              onClose={() => setShowAccountNotActiveAlert(false)}
            >
              Your account is not yet activated. Please visit the Barangay
              Official in charge for this issue.
            </Alert>
          )}
          <Card>
            <CardHeader
              title=" Sign in"
              subheader="Sign in using your credentials"
            />
            <Divider />
            <CardContent>
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                name="userName"
                label="User Name"
                control={control}
                defaultValue=""
                variant="outlined"
                rules={{ required: true }}
                error={errors.userName && true}
              />
              <Controller
                fullWidth
                margin="normal"
                as={TextField}
                name="password"
                label="Password"
                type="password"
                control={control}
                defaultValue=""
                variant="outlined"
                rules={{ required: true }}
                error={errors.userName && true}
              />
            </CardContent>
            <Divider />
            <Box
              display="flex"
              justifyContent="flex-end"
              alignItems="center"
              m={2}
            >
              <Typography
                color="textSecondary"
                variant="body1"
                className={classes.signUp}
              >
                Don&apos;t have an account?{' '}
                <Link component={RouterLink} to="/register" variant="h6">
                  Sign up
                </Link>
              </Typography>
              <Button
                color="primary"
                size="large"
                type="submit"
                variant="contained"
                onClick={handleSubmit(onSubmit)}
              >
                Sign in now
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>
    </Page>
  );
};

export default LoginView;
