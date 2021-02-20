import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  makeStyles,
  CircularProgress,
  Dialog,
  Collapse
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import { useOfficial, useResidentViewState } from '../../../states';
import useAxios from 'axios-hooks';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%'
  }
}));

const ResidentListView = () => {
  const classes = useStyles();
  const [residentViewState] = useResidentViewState();
  return (
    <Collapse in={residentViewState.showResidentListView}>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results />
        </Box>
      </Container>
    </Collapse>
  );
};

export default ResidentListView;
