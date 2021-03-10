import React from 'react';
import Page from 'src/components/Page';
import { Box, Collapse, Container, Grid, makeStyles } from '@material-ui/core';
import ResidencyListView from './ResidencyListView';
import ResidencyFormView from './ResidencyFormView';
import { useResidency } from '../../../states';
import ReportView from './ReportView';

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
const ResidencyView = () => {
  const classes = useStyles();
  const [residency, { setShowFormView, setShowListView }] = useResidency();
  return (
    <Page className={classes.root} title="Residency">
      <Container maxWidth={false}>
        <Collapse in={residency.showListView}>
          <ResidencyListView />
        </Collapse>
        <Collapse in={residency.showFormView}>
          <ResidencyFormView />
        </Collapse>
        <Collapse in={residency.showPrintPreview}>
          <ReportView />
        </Collapse>
      </Container>
    </Page>
  );
};

export default ResidencyView;
