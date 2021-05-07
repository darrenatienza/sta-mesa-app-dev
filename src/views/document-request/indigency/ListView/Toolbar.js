import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Card,
  Grid,
  Button,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({
  className,
  onSearch,
  onAdd,
  isAdmin,
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
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      >
        <Grid item>
          <Box mt={3}>
            <Typography variant="h2" component="h4">
              Barangay Indigency Request
            </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Box mt={3}>
            <Button
              fullWidth
              color="primary"
              variant="contained"
              onClick={() => onAdd()}
            >
              Create new Indigency Request
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
