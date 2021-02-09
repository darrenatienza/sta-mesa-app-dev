import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import useAxios from 'axios-hooks';
import { Box, Button, Grid, Typography, makeStyles } from '@material-ui/core';
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

const Toolbar = ({ className, currentPersonID, reloadList, ...rest }) => {
  const classes = useStyles();
  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    { url: `/records/indigencies`, method: 'POST' },
    {
      manual: true
    }
  );
  const handleClick = async () => {
    const { data: row } = await executePost({
      data: {
        person_id: currentPersonID,
        doc_status_id: 1,
        parents: 'x',
        indigent_reason: 'x'
      }
    });
    if (row > 0) {
      reloadList();
    }
  };
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
              onClick={() => handleClick()}
            >
              {postLoading
                ? 'Generating new request...'
                : postError
                ? 'Unable to create new request '
                : 'Create new Indigency Request'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
