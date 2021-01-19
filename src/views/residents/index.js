import React from 'react';
import ResidentListView from './ResidentListView';
import ResidentDeleteView from './ResidentDeleteView';
import ResidentResetPasswordView from './ResidentResetPasswordView';
import ResidentChangeGroupView from './ResidentChangeGroupView';
import { useResidentViewState, usePersonEntity } from '../../states';

import ResidentFormView from './ResidentFormView';
import Page from 'src/components/Page';
import {
  Box,
  Container,
  makeStyles,
  CircularProgress,
  Dialog,
  Collapse
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const ResidentView = () => {
  const classes = useStyles();
  return (
    <div>
      <Page className={classes.root} title="Residents">
        <ResidentFormView />
        {<ResidentListView />}
        <ResidentResetPasswordView />
        <ResidentDeleteView />
      </Page>
    </div>
  );
};

export default ResidentView;
