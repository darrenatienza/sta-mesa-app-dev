import React, { useEffect } from 'react';
import OfficialFormView from './OfficialFormView';
import OfficialListView from './OfficialListView';
import { useOfficialViewState } from '../../states';
import {
  Container,
  Grid,
  Collapse,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const OfficialView = () => {
  const classes = useStyles();
  const [
    officialViewState,
    { resetOfficialViewState }
  ] = useOfficialViewState();
  useEffect(() => {
    resetOfficialViewState();
  }, []);
  return (
    <Page className={classes.root} title="Officials">
      <Container maxWidth={false}>
        <OfficialListView />
        <OfficialFormView />
      </Container>
    </Page>
  );
};

export default OfficialView;
