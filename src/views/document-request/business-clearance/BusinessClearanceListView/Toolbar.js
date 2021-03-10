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
  },
  addButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: '20px'
    }
  }
}));

const Toolbar = ({ className, search, onAdd, ...rest }) => {
  const classes = useStyles();

  const [query, setQuery] = useState('');
  useEffect(() => {
    const timeOutId = setTimeout(() => search(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex">
        <Typography variant="h2" component="h4">
          Business Clearance Request
        </Typography>

        <Box marginLeft="auto">
          <Button
            className={classes.addButton}
            color="primary"
            variant="contained"
            onClick={onAdd}
          >
            Add New Request
          </Button>
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
                  placeholder="Search"
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
