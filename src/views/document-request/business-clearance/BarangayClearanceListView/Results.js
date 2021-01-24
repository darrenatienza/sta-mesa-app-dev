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

const Results = ({ className, businessClearances, ...rest }) => {
  const classes = useStyles();
  const [
    selectedbusinessClearancesIds,
    setSelectedbusinessClearancesIds
  ] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = event => {
    let newSelectedbusinessClearancesIds;

    if (event.target.checked) {
      newSelectedbusinessClearancesIds = businessClearances.map(
        businessClearances => businessClearances.id
      );
    } else {
      newSelectedbusinessClearancesIds = [];
    }

    setSelectedbusinessClearancesIds(newSelectedbusinessClearancesIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedbusinessClearancesIds.indexOf(id);
    let newSelectedbusinessClearancesIds = [];

    if (selectedIndex === -1) {
      newSelectedbusinessClearancesIds = newSelectedbusinessClearancesIds.concat(
        selectedbusinessClearancesIds,
        id
      );
    } else if (selectedIndex === 0) {
      newSelectedbusinessClearancesIds = newSelectedbusinessClearancesIds.concat(
        selectedbusinessClearancesIds.slice(1)
      );
    } else if (selectedIndex === selectedbusinessClearancesIds.length - 1) {
      newSelectedbusinessClearancesIds = newSelectedbusinessClearancesIds.concat(
        selectedbusinessClearancesIds.slice(0, -1)
      );
    } else if (selectedIndex > 0) {
      newSelectedbusinessClearancesIds = newSelectedbusinessClearancesIds.concat(
        selectedbusinessClearancesIds.slice(0, selectedIndex),
        selectedbusinessClearancesIds.slice(selectedIndex + 1)
      );
    }

    setSelectedbusinessClearancesIds(newSelectedbusinessClearancesIds);
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
                <TableCell>Name</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Business Nature</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businessClearances.slice(0, limit).map(businessClearance => (
                <TableRow hover key={businessClearance.barangay_clearance_id}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Avatar
                        className={classes.avatar}
                        src={businessClearance.avatarUrl}
                      >
                        {getInitials(businessClearance.name)}
                      </Avatar>
                      <Typography color="textPrimary" variant="body1">
                        {`${businessClearance.name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{businessClearance.address}</TableCell>
                  <TableCell>{businessClearance.business_nature}</TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={businessClearance.doc_status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() =>
                        handleEdit(businessClearance.barangay_clearance_id)
                      }
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      aria-label="Menu"
                      onClick={() =>
                        handleDelete(businessClearance.barangay_clearance_id)
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
        count={businessClearances.length}
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
  businessClearances: PropTypes.array.isRequired
};

export default Results;
