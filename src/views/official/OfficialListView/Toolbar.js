import React from 'react';
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
  const [
    officialViewState,
    { setOfficialID, setShowOfficialListView, setShowOfficialFormView }
  ] = useOfficialViewState();
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
