import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  CircularProgress,
  Dialog
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import { useDeleteDialog } from '../../../states';
import useAxios from 'axios-hooks';
import DeleteDialog from '../../shared/DeleteDialog';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const ResidentListView = () => {
  const classes = useStyles();

  return (
    <Page className={classes.root} title="Customers">
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results />
          <DeleteDialog />
        </Box>
      </Container>
    </Page>
  );
};

export default ResidentListView;
