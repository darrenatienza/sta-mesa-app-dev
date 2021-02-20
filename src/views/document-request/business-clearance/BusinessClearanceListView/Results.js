import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import useAxios from 'axios-hooks';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useBusinessClearanceViewState } from '../../../../states';
import {
  Avatar,
  Box,
  Card,
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
import { Edit as EditIcon, Delete as DeleteIcon } from 'react-feather';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  businessClearances,
  reloadList,
  onEdit,
  onDelete,
  ...rest
}) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView }
  ] = useBusinessClearanceViewState();
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // users actions
  const handlePrint = () => {};
  const handleDelete = id => {
    onDelete(id);
  };

  const handleEdit = id => {
    onEdit(id);
    setShowFormView(true);
    setShowListView(false);
  };
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Business Name</TableCell>
                <TableCell>Business Address</TableCell>
                <TableCell>Business Engagement</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {businessClearances &&
                businessClearances.slice(0, limit).map(businessClearance => (
                  <TableRow hover key={businessClearance.business_clearance_id}>
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
                          handleEdit(businessClearance.business_clearance_id)
                        }
                      >
                        <EditIcon />
                      </IconButton>

                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Menu"
                        onClick={() =>
                          handleDelete(businessClearance.business_clearance_id)
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
        count={businessClearances ? businessClearances.length : 0}
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
