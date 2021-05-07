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
  Grid,
  makeStyles,
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Toolbar = ({
  className,
  isAdmin,
  onSearch,
  onAdd,
  isOfficial,
  ...rest
}) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeOutId = setTimeout(() => onSearch(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Grid container justify="space-between">
        <Grid item>
          <Typography variant="h1">Relationship</Typography>
        </Grid>
        <Grid item>
          <Box display="flex" justifyContent="flex-end">
            <Button color="primary" variant="contained" onClick={onAdd}>
              Add New Relationship Request
            </Button>
          </Box>
        </Grid>
      </Grid>

      {isAdmin ||
        (isOfficial && (
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
                    placeholder="Search"
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Card>
          </Box>
        ))}
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
