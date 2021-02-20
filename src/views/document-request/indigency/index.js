import React from 'react';
import Page from 'src/components/Page';
import { Container, makeStyles } from '@material-ui/core';
import AdminListView from './AdminListView';
import ClientListView from './ClientListView';
import { useCurrentUser } from '../../../states';
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
  const [currentUser] = useCurrentUser();
  return (
    <Page className={classes.root} title="Indigency">
      <Container maxWidth={false}>
        {currentUser.isAdmin && <AdminListView />}
        {!currentUser.isAdmin && <ClientListView />}
      </Container>
    </Page>
  );
};

export default IndigencyView;
