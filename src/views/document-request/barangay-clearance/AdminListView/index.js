import React, { useState, useEffect } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useCurrentUser } from '../../../../states';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const AdminListView = () => {
  const classes = useStyles();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentUser] = useCurrentUser();
  useEffect(() => {
    currentUser.roles.map(r => {
      if (r.title === 'admin') {
        setIsAdmin(true);
      }
    });
  }, [currentUser.roles]);
  return (
    <>
      <Toolbar />
      <Box mt={2}>
        <Results isAdmin={isAdmin} />
      </Box>
    </>
  );
};

export default AdminListView;
