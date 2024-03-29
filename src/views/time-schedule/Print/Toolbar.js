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

const months = moment.months();
const Toolbar = ({ className, onSearch, onBack, onPrint, ...rest }) => {
  const classes = useStyles();
  const [durations, setDurations] = useState([
    '01-15',
    `16-${moment().daysInMonth()}`,
    `01-${moment().daysInMonth()}`
  ]);
  const [month, setMonth] = useState(moment().format('MMMM'));
  const [year, setYear] = useState(moment().format('YYYY'));
  const [duration, setDuration] = useState();

  const handleMonthChange = month => {
    setMonth(month);
    const newDurations = [
      '01-15',
      `16-${moment()
        .month(month)
        .year(year)
        .daysInMonth()}`,
      `01-${moment()
        .month(month)
        .year(year)
        .daysInMonth()}`
    ];
    setDurations([...newDurations]);
    setDuration('01-15');
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" marginLeft="auto">
        <Button color="primary" variant="contained" onClick={onBack}>
          Back
        </Button>
      </Box>
      <Box mt={3}>
        <Grid container spacing={3}>
          <Grid item lg={4} xs={12}>
            <TextField
              fullWidth
              select
              onChange={e => handleMonthChange(e.target.value)}
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

          <Grid item lg={4} xs={12}>
            <TextField
              fullWidth
              select
              onChange={e => setDuration(e.target.value)}
              variant="outlined"
              color="primary"
              defaultValue=""
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
          <Grid item lg={4} xs={12}>
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
        </Grid>
      </Box>

      <Box display="flex" mt={2}>
        <Button color="primary" variant="outlined" onClick={onPrint}>
          Print
        </Button>
        <Box marginLeft="auto">
          <Button
            color="primary"
            variant="contained"
            onClick={() => onSearch(month, duration, year)}
          >
            View
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default Toolbar;
