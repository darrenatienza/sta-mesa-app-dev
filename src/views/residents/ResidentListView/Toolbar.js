import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink as RouterLink } from 'react-router-dom';
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
import { Search as SearchIcon } from 'react-feather';
import { useResidentSearch } from '../../../states';

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
  const [query, setQuery] = useState('');
  const [residentSearch, { setCriteria }] = useResidentSearch();

  useEffect(() => {
    const timeOutId = setTimeout(() => setCriteria(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  //maintains value of the search box
  useEffect(() => {
    setQuery(residentSearch.criteria);
  }, []);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          component={RouterLink}
          to="/app/resident-form"
        >
          Add Resident
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                value={query}
                onChange={e => setQuery(e.target.value)}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Residents"
                variant="outlined"
              />
            </Box>
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
