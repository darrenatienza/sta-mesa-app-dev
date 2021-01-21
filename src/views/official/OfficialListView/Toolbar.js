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
  makeStyles
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useOfficialViewState } from '../../../states';

const useStyles = makeStyles(theme => ({
  root: {}
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();
  const [query, setQuery] = useState('');
  const [
    officialViewState,
    {
      setOfficialID,
      setShowOfficialListView,
      setShowOfficialFormView,
      setCriteria
    }
  ] = useOfficialViewState();

  useEffect(() => {
    const timeOutId = setTimeout(() => setCriteria(query), 500);
    return () => clearTimeout(timeOutId);
  }, [query]);
  //maintains value of the search box
  useEffect(() => {
    setQuery(officialViewState.criteria);
  }, []);

  const handleAddOfficial = () => {
    setOfficialID(0);
    setShowOfficialFormView(true);
    setShowOfficialListView(false);
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAddOfficial()}
        >
          Add Official
        </Button>
      </Box>
      <Box mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
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
