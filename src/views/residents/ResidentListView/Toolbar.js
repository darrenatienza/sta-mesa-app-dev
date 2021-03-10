import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
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
import { useResidentViewState, usePersonEntity } from '../../../states';

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
  const navigate = useNavigate();
  const [personEntity, { resetPersonEntity }] = usePersonEntity();
  const [query, setQuery] = useState('');
  const [
    residentViewState,
    { setShowResidentDetailView, setShowResidentListView, setCriteria }
  ] = useResidentViewState();

  useEffect(() => {
    const timeOutId = setTimeout(() => setCriteria(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  //maintains value of the search box
  useEffect(() => {
    setQuery(residentViewState.criteria);
  }, []);

  const handleAdd = event => {
    setShowResidentListView(false);
    setShowResidentDetailView(true);
    resetPersonEntity();
  };
  return (
    <>
      <div className={clsx(classes.root, className)} {...rest}>
        <Box>
          <Typography variant="h1">Residents</Typography>
        </Box>
        <Box mt={3}>
          <Card>
            <CardContent>
              <Box display="flex">
                <Box minWidth={500} marginLeft="auto">
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
              </Box>
            </CardContent>
          </Card>
        </Box>
      </div>
    </>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
