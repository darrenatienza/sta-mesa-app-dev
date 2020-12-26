import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import useAxios from 'axios-hooks';
import { useOfficial } from '../../../states';
import { setAvatar } from 'src/states/official';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  progress: {
    margin: 10
  }
}));

const OfficialFormView = () => {
  const classes = useStyles();
  const [
    official,
    { setOfficialID, setFirstName, setLastName, setEmail, setAvatar }
  ] = useOfficial();

  const [{ data, loading, error }, refetch] = useAxios(
    `https://reqres.in/api/users/${official.officialID}?delay=1`,
    {
      manual: !official.officialID
    }
  );

  useEffect(() => {
    if (data) {
      setOfficialID(data.data.id);
      setFirstName(data.data.first_name);
      setLastName(data.data.last_name);
      setEmail(data.data.email);
      setAvatar(data.data.avatar);
    }
  }, [data]);
  if (loading) return <CircularProgress className={classes.progress} />;
  if (error) return <p>Error!</p>;
  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={4} md={6} xs={12}>
            <Profile />
          </Grid>
          <Grid item lg={8} md={6} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default OfficialFormView;
