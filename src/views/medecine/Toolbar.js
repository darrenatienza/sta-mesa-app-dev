import React, { useState, useEffect } from 'react';
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
  makeStyles,
  Typography,
  Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Toolbar = ({ className, onSearch, onAdd, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeOutId = setTimeout(() => onSearch(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container justify="space-between" alignItems="center">
        <Grid item lg={6} md={6} xs={12}>
          <Typography variant="h1">Medicine Records</Typography>
        </Grid>
        <Grid item lg={6} md={6} xs={12}>
          <Box display="flex" justifyContent="flex-end">
            <Button color="primary" variant="contained" onClick={onAdd}>
              Add new Medicine
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                onChange={e => setQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon fontSize="small" color="action">
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search Medicines"
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
