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
  IconButton
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { Edit as EditIcon } from 'react-feather';
import { useOfficialViewState } from '../../../states';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, officials, ...rest }) => {
  const [officialViewState, { setOfficialID }] = useOfficialViewState();

  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleEditClick = () => {
    //setOfficialID(2);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="default"></TableCell>
                <TableCell>Name</TableCell>
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
                    <TableCell padding="default"></TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar
                          className={classes.avatar}
                          src={official.avatarUrl}
                        >
                          {getInitials(official.first_name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {official.first_name}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>{official.title}</TableCell>

                    <TableCell>
                      <IconButton aria-label="Edit" onClick={handleEditClick}>
                        <EditIcon />
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
        count={officials && officials.length}
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
