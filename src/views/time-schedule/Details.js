import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Divider,
  SvgIcon,
  makeStyles,
  CardHeader,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  },
  timeInValue: {
    marginBottom: theme.spacing(2)
  },
  timeOutValue: {
    marginBottom: theme.spacing(2)
  },
  timeInButton: {
    marginRight: theme.spacing(1)
  },
  timeOutButton: {
    marginRight: theme.spacing(1)
  }
}));

const Details = ({ className, details, onTimeIn, onTimeOut, ...rest }) => {
  const classes = useStyles();

  const [values, setValues] = useState({
    time_in: '',
    time_out: '',
    has_time_out: false
  });
  useEffect(() => {
    details &&
      setValues({
        time_in: moment(details.time_in).format('LTS'),
        time_out: moment(details.time_out).format('LTS'),
        has_time_out: details.has_time_out
      });
  }, [details]);
  const disableTimeOut = () => {
    return (values.time_in != '' && values.has_time_out) ||
      (values.time_in == '' && !values.has_time_out)
      ? false
      : true;
  };

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader
          title="Today"
          subheader="Time Record for today"
        ></CardHeader>
        <Divider />
        <CardContent>
          <Typography variant="body1">Time In</Typography>
          <Typography
            variant="h1"
            color="primary"
            className={classes.timeInValue}
          >
            {values.time_in}
          </Typography>
          <Typography variant="body1">Time Out</Typography>
          <Typography
            variant="h1"
            color="primary"
            className={classes.timeOutValue}
          >
            {values.has_time_out && values.time_out}
          </Typography>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="center" p={1}>
          <Button
            disabled={values.time_in != '' ? true : false}
            variant={values.time_in != '' ? 'outlined' : 'contained'}
            onClick={onTimeIn}
            color="primary"
            className={classes.timeInButton}
          >
            Time In
          </Button>
          <Button
            disabled={
              (values.time_in != '' && values.has_time_out) ||
              (values.time_in == '' && !values.has_time_out)
                ? true
                : false
            }
            variant={
              (values.time_in != '' && values.has_time_out) ||
              (values.time_in == '' && !values.has_time_out)
                ? 'outlined'
                : 'contained'
            }
            color="primary"
            onClick={onTimeOut}
            className={classes.timeOutButton}
          >
            Time Out
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default Details;
