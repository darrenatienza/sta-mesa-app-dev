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
  Typography,
  Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {}
}));
const years = ['2021', '2022', '2023', '2024', '2025'];
const durations = [
  '01-15',
  `16-${moment().daysInMonth()}`,
  `01-${moment().daysInMonth()}`
];
const months = moment.months();
const Toolbar = ({ className, onSearch, ...rest }) => {
  const classes = useStyles();

  const [month, setMonth] = useState(moment().format('MMMM'));
  const [year, setYear] = useState(moment().format('YYYY'));
  const [duration, setDuration] = useState(moment().format('01-15'));
  useEffect(() => {
    const timeOutId = setTimeout(() => onSearch(month, duration, year), 500);
    return () => clearTimeout(timeOutId);
  }, [month]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container spacing={3}>
        <Grid item lg={3} xs={12}>
          <TextField
            fullWidth
            select
            onChange={e => setMonth(e.target.value)}
            variant="outlined"
            color="primary"
            defaultValue={moment().format('MMMM')}
            SelectProps={{
              native: true
            }}
          >
            <option disabled value="">
              Select Month
            </option>
            {months.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Grid>

        <Grid item lg={3} xs={12}>
          <TextField
            fullWidth
            select
            onChange={e => setDuration(e.target.value)}
            variant="outlined"
            color="primary"
            defaultValue={`1-${moment().daysInMonth()}`}
            SelectProps={{
              native: true
            }}
          >
            <option disabled value="">
              Select Duration
            </option>
            {durations.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item lg={3} xs={12}>
          <TextField
            fullWidth
            select
            onChange={e => setYear(e.target.value)}
            variant="outlined"
            color="primary"
            defaultValue={moment().format('YYYY')}
            SelectProps={{
              native: true
            }}
          >
            <option disabled value="">
              Select Year
            </option>
            {years.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </TextField>
        </Grid>
        <Grid item lg={3} xs={12}>
          <Box position="relative" top="50%" bottom="50%">
            <Button fullWidth variant="contained" color="primary">
              Search
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Toolbar;
