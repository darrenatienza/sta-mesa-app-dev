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

const Toolbar = ({ className, onSearch, onAdd, isBhw, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeOutId = setTimeout(() => onSearch(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex">
        <Typography variant="h1">Facebook Posts</Typography>
        <Box marginLeft="auto">
          {isBhw && (
            <Box display="flex" justifyContent="flex-end">
              <Button color="primary" variant="contained" onClick={onAdd}>
                Add new Fb Post
              </Button>
            </Box>
          )}
        </Box>
      </Box>

      <Box mt={3}>
        <Card>
          <CardContent>
            <Box display="flex">
              <Box minWidth={500} marginLeft="auto">
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
                  placeholder="Search Posts"
                  variant="outlined"
                />
              </Box>
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
