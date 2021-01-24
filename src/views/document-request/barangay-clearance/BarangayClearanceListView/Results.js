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
  Chip,
  IconButton,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  Key as KeyIcon
} from 'react-feather';
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
  // users actions
  const handleEdit = () => {};
  const handleDelete = () => {};
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Civil Status</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {barangayClearances.slice(0, limit).map(barangayClearance => (
                <TableRow hover key={barangayClearance.barangay_clearance_id}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>{barangayClearance.request_date}</TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        src={barangayClearance.avatarUrl}
                      >
                        {getInitials(barangayClearance.first_name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {`${barangayClearance.first_name} ${barangayClearance.middle_name} ${barangayClearance.last_name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {moment().diff(barangayClearance.birthdate, 'years')}
                  </TableCell>
                  <TableCell>{barangayClearance.civil_status}</TableCell>
                  <TableCell>{barangayClearance.reason}</TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={barangayClearance.doc_status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() =>
                        handleEdit(barangayClearance.barangay_clearance_id)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      aria-label="Menu"
                      onClick={() =>
                        handleDelete(barangayClearance.barangay_clearance_id)
                      }
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