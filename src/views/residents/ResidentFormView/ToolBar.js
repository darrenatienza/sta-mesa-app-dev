import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  makeStyles
} from '@material-ui/core';
import { useResidentViewState, usePersonEntity } from '../../../states';
const useStyles = makeStyles(theme => ({
  root: {},
  generalInfoButton: {
    marginRight: theme.spacing(1)
  },
  groupButton: {
    marginRight: theme.spacing(1)
  }
}));

const ToolBar = ({ className, ...rest }) => {
  const [
    residentViewState,
    {
      setShowResidentDetailView,
      setShowResidentListView,
      setShowChangeGroupView
    }
  ] = useResidentViewState();

  const handleGeneralInfoButtonClick = event => {
    setShowResidentDetailView(false);
    setShowChangeGroupView(true);
  };
  const handleGroupButtonClick = () => {
    setShowResidentDetailView(false);
    setShowChangeGroupView(true);
  };
  const handleUserAccountClick = () => {};
  const classes = useStyles();
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-start" mb={3}>
        <Button
          color="primary"
          variant="contained"
          className={classes.generalInfoButton}
          onClick={handleGeneralInfoButtonClick}
        >
          General Information
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          className={classes.groupButton}
          onClick={handleGroupButtonClick}
        >
          Group
        </Button>
        <Button
          color="secondary"
          variant="outlined"
          onClick={handleUserAccountClick}
        >
          User Account
        </Button>
      </Box>
    </div>
  );
};

export default ToolBar;
