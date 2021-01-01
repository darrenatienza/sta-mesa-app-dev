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

const ResidentFormView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          
          <Grid item lg={12} md={12} xs={12}>
            <ProfileDetails />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default ResidentFormView;
