import React, { useEffect, useState } from 'react';
import { useResidentViewState, usePersonEntity } from '../../../states';
import useAxios from 'axios-hooks';
import Page from 'src/components/Page';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Results from './Results';
import ToolBar from './ToolBar';
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ResidentChangeGroupView = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={6} md={6} xs={12}>
          <ToolBar />
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Results />
        </Grid>
      </Grid>
    </>
  );
};
export default ResidentChangeGroupView;
