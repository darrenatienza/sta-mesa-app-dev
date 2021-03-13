import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink as RouterLink } from 'react-router-dom';
import useAxios from 'axios-hooks';
import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
  makeStyles,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton
} from '@material-ui/core';

import getInitials from 'src/utils/getInitials';
import { Edit as EditIcon, Delete as DeleteIcon } from 'react-feather';
import { useOfficialViewState } from '../../../states';
import { setOpenDialog } from 'src/states/deleteDialog';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, onEdit, onDelete, officials, ...rest }) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Civil Status</TableCell>
                <TableCell>Position</TableCell>
                <TableCell padding="default"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {officials &&
                officials.slice(0, limit).map(official => (
                  <TableRow
                    hover
                    key={official.official_id}
                    value={official.official_id}
                  >
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>
                      <Typography color="textPrimary" variant="body1">
                        {`${official.first_name} ${official.last_name} `}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {moment().diff(official.birthdate, 'year')}
                    </TableCell>
                    <TableCell>
                      {moment(official.birthdate).format('YYYY-MM-DD')}
                    </TableCell>
                    <TableCell>
                      {official.civil_status &&
                        official.civil_status.charAt(0).toUpperCase() +
                          official.civil_status.slice(
                            1,
                            official.civil_status.length
                          )}
                    </TableCell>
                    <TableCell>{official.title}</TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="Edit"
                        onClick={() => onEdit(official.official_id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Delete"
                        onClick={() => onDelete(official.official_id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={officials ? officials.length : 0}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  officials: PropTypes.array.isRequired
};

export default Results;
