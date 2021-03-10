import React from 'react';
import Page from 'src/components/Page';
import { Box, Collapse, Container, Grid, makeStyles } from '@material-ui/core';
import RelationshipListView from './RelationshipListView';
import RelationshipFormView from './RelationshipFormView';
import { useRelationship } from '../../../states';
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
const RelationshipView = () => {
  const classes = useStyles();
  const [
    relationship,
    { setShowFormView, setShowListView }
  ] = useRelationship();
  return (
    <Page className={classes.root} title="Relationship">
      <Container maxWidth={false}>
        <Collapse in={relationship.showListView}>
          <RelationshipListView />
        </Collapse>
        <Collapse in={relationship.showFormView}>
          <RelationshipFormView />
        </Collapse>
        <Collapse in={relationship.showPrintPreview}>
          <ReportView />
        </Collapse>
      </Container>
    </Page>
  );
};

export default RelationshipView;
