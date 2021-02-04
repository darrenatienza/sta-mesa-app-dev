import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Grid,
  makeStyles,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon, Calendar as CalendarIcon } from 'react-feather';
import { useBarangayClearanceViewState } from '../../../../states';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState({
    criteria: '',
    date: moment().format('YYYY-MM-DD')
  });
  const [criteria, setCriteria] = useState('');
  const [date, setDate] = useState(moment().format('YYYY-MM-DD'));
  const [
    barangayClearanceStateView,
    {
      setBarangayClearanceID,
      setShowFormView,
      setShowListView,
      setQueryFilter,
      setFilterCriteria,
      setFilterDate
    }
  ] = useBarangayClearanceViewState();

  useEffect(() => {
    const timeOutId = setTimeout(() => setFilterCriteria(criteria), 500);
    return () => clearTimeout(timeOutId);
  }, [criteria]);
  useEffect(() => {
    const timeOutId = setTimeout(() => setFilterDate(date), 500);
    return () => clearTimeout(timeOutId);
  }, [date]);

  //maintains value of the search box
  useEffect(() => {
    setDate(barangayClearanceStateView.filterDate);
    setCriteria(barangayClearanceStateView.filterCriteria);
  }, []);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Typography variant="h2" component="h4">
          Barangay Clearance List (Admin)
        </Typography>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={8} md={6} sx={12}>
                <TextField
                  fullWidth
                  name="criteria"
                  value={criteria}
                  onChange={e => setCriteria(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SvgIcon fontSize="small" color="action">
                          <SearchIcon />
                        </SvgIcon>
                      </InputAdornment>
                    )
                  }}
                  placeholder="Search customer"
                  variant="outlined"
                />
              </Grid>
              <Grid item lg={4} md={6} sx={12}>
                <TextField
                  fullWidth
                  name="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  type="date"
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
