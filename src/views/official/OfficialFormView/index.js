import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Collapse,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import useAxios from 'axios-hooks';
import { useOfficialViewState } from '../../../states';
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
    officialViewState,
    { setOfficialID, setShowOfficialListView, setShowOfficialFormView }
  ] = useOfficialViewState();
  return (
    <Collapse in={officialViewState.showOfficialFormView}>
      <Container maxWidth="lg">
        <ProfileDetails />
      </Container>
    </Collapse>
  );
};

export default OfficialFormView;
