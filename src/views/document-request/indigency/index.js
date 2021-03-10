import React, { useState } from 'react';
import Page from 'src/components/Page';
import { Container, Collapse, makeStyles } from '@material-ui/core';
import ListView from './ListView';
import ReportView from './ReportView';
import { useCurrentUser, useIndigencyViewState } from '../../../states';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));
const IndigencyView = () => {
  const classes = useStyles();
  const [indigencyViewState] = useIndigencyViewState();
  return (
    <Page className={classes.root} title="Indigency">
      <Container maxWidth={false}>
        <Collapse in={indigencyViewState.showPrintPreview}>
          <ReportView />
        </Collapse>
        <Collapse in={indigencyViewState.showListView}>
          <ListView />
        </Collapse>
      </Container>
    </Page>
  );
};

export default IndigencyView;
