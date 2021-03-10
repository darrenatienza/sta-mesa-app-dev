import React, { useEffect, useState } from 'react';
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
  Typography
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useOfficialViewState } from '../../../states';

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
      <Box display="flex">
        <Typography variant="h1">Barangay Officials</Typography>
        <Box marginLeft="auto">
          <Button color="primary" variant="contained" onClick={() => onAdd()}>
            Add Official
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
                  value={query}
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
                  placeholder="Search Officials"
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
