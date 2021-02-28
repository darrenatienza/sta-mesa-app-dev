import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Notifications from './Notifications';
import Password from './Password';
import useAxios from 'axios-hooks';
import { useCurrentUser } from '../../../states';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const SettingsView = () => {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const [isSuccess, setSuccess] = useState(false);
  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    { url: `/password`, method: 'POST' },
    {
      manual: true
    }
  );
  useEffect(() => {
    const timeOutId = setTimeout(() => setSuccess(false), 3000);
    return () => clearTimeout(timeOutId);
  }, [isSuccess]);
  const onUpdate = async data => {
    const { data: value } = await executePost({
      data: {
        username: currentUser.userName,
        password: data.oldPassword,
        newPassword: data.password
      }
    });
    setSuccess(true);
  };
  return (
    <Page className={classes.root} title="Settings">
      <Container maxWidth="lg">
        <Box mt={3}>
          <Password
            onUpdate={onUpdate}
            isLoading={postLoading}
            isError={postError}
            isSuccess={isSuccess}
          />
        </Box>
      </Container>
    </Page>
  );
};

export default SettingsView;
