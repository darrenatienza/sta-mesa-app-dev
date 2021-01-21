import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, barangayClearances, ...rest }) => {
  const classes = useStyles();
  const [
    selectedbarangayClearancesIds,
    setSelectedbarangayClearancesIds
  ] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedbarangayClearancesIds;

    if (event.target.checked) {
      newSelectedbarangayClearancesIds = barangayClearances.map(
        barangayClearances => barangayClearances.id
      );
    } else {
      newSelectedbarangayClearancesIds = [];
    }

    setSelectedbarangayClearancesIds(newSelectedbarangayClearancesIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedbarangayClearancesIds.indexOf(id);
    let newSelectedbarangayClearancesIds = [];

    if (selectedIndex === -1) {
      newSelectedbarangayClearancesIds = newSelectedbarangayClearancesIds.concat(
        selectedbarangayClearancesIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedbarangayClearancesIds = newSelectedbarangayClearancesIds.concat(
        selectedbarangayClearancesIds.slice(1)
      );
    } else if (selectedIndex === selectedbarangayClearancesIds.length - 1) {
      newSelectedbarangayClearancesIds = newSelectedbarangayClearancesIds.concat(
        selectedbarangayClearancesIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedbarangayClearancesIds = newSelectedbarangayClearancesIds.concat(
        selectedbarangayClearancesIds.slice(0, selectedIndex),
        selectedbarangayClearancesIds.slice(selectedIndex + 1)
      );
    }

    setSelectedbarangayClearancesIds(newSelectedbarangayClearancesIds);
  };

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
                <TableCell>Reason</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {barangayClearances.slice(0, limit).map(barangayClearances => (
                <TableRow hover key={barangayClearances.id}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        src={barangayClearances.avatarUrl}
                      >
                        {getInitials(barangayClearances.first_name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {`${barangayClearances.first_name} ${barangayClearances.middle_name} ${barangayClearances.last_name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{barangayClearances.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={barangayClearances.length}
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
  barangayClearances: PropTypes.array.isRequired
};

export default Results;
