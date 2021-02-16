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
  SvgIcon,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  },
  timeFromTextField: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  timeToTextField: {
    paddingRight: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  }
}));
const Toolbar = ({ className, onSearch, ...rest }) => {
  const classes = useStyles();
  const [timeFrom, setTimeFrom] = useState(moment().format('YYYY-MM-DD'));
  const [timeTo, setTimeTo] = useState(
    moment()
      .add(1, 'day')
      .format('YYYY-MM-DD')
  );

  useEffect(() => {
    const timeOutId = setTimeout(() => onSearch(timeFrom, timeTo), 500);
    return () => clearTimeout(timeOutId);
  }, [timeTo, timeFrom]);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <TextField
          className={classes.timeFromTextField}
          onChange={e => setTimeFrom(e.target.value)}
          variant="outlined"
          type="date"
          color="primary"
          defaultValue={moment().format('YYYY-MM-DD')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body1">From</Typography>
              </InputAdornment>
            )
          }}
        />

        <TextField
          className={classes.timeToTextField}
          onChange={e => setTimeTo(e.target.value)}
          variant="outlined"
          type="date"
          color="primary"
          defaultValue={moment().format('YYYY-MM-DD')}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Typography variant="body1">To</Typography>
              </InputAdornment>
            )
          }}
        />
      </Box>
    </div>
  );
};

export default Toolbar;
