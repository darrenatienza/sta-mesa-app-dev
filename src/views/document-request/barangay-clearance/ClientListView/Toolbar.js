import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Box, Button, Grid, makeStyles, Typography } from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useBarangayClearanceViewState } from '../../../../states';
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
  const [
    barangayClearanceStateView,
    { setBarangayClearanceID, setShowFormView, setShowListView }
  ] = useBarangayClearanceViewState();
  const handleAddNew = () => {
    setBarangayClearanceID(0);
    setShowFormView(true);
    setShowListView(false);
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Typography variant="h2" component="h4">
          Barangay Clearance List
        </Typography>
      </Box>
      <Box mt={1} display="flex" justifyContent="flex-end">
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleAddNew()}
        >
          Add New
        </Button>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
