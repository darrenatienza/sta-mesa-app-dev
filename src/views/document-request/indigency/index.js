import React from 'react';
import Page from 'src/components/Page';
import { Container, makeStyles } from '@material-ui/core';
import AdminListView from './AdminListView';
import ClientListView from './ClientListView';
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
  return (
    <Page className={classes.root} title="Indigency">
      <Container maxWidth={false}>
        <AdminListView />
        <ClientListView />
      </Container>
    </Page>
  );
};

export default IndigencyView;
