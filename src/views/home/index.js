import React from 'react';
import Home from 'src/components/Home';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(1),
    paddingTop: theme.spacing(1)
  }
}));
const HomeView = () => {
  const classes = useStyles();
  return (
    <Page className={classes.root} title="Home">
      <Home />
    </Page>
  );
};

export default HomeView;
