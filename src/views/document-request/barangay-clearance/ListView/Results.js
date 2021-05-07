import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  useBarangayClearanceViewState,
  useCurrentUser
} from '../../../../states';
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
  IconButton,
  Chip,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import useAxios from 'axios-hooks';
import ClientFormView from '../FormView';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  Key as KeyIcon,
  Printer as PrintIcon
} from 'react-feather';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  residents,
  isAdmin,
  isOfficial,
  onEdit,
  onDelete,
  onPrint,
  onChangeDocumentStatus,
  ...rest
}) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };
  // misc
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      <Card className={clsx(classes.root, className)} {...rest}>
        <PerfectScrollbar>
          <Box minWidth={1050}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>Date Requested</TableCell>
                  {(isAdmin || isOfficial) && (
                    <>
                      <TableCell>Full Name</TableCell>
                      <TableCell>Contact Number</TableCell>
                    </>
                  )}
                  <TableCell>Reason</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {residents &&
                  residents.records
                    .slice(page * limit, page * limit + limit)
                    .map(record => (
                      <TableRow hover key={record.barangay_clearance_id}>
                        <TableCell padding="checkbox"></TableCell>
                        <TableCell>
                          {moment(record.request_date).format('DD/MM/YYYY')}
                        </TableCell>
                        {(isAdmin || isOfficial) && (
                          <>
                            <TableCell>{`${record.first_name} ${record.middle_name} ${record.last_name}`}</TableCell>
                            <TableCell>{record.phone_number}</TableCell>
                          </>
                        )}
                        <TableCell>{record.reason}</TableCell>
                        <TableCell>
                          <Chip
                            onClick={() =>
                              (isAdmin || isOfficial) &&
                              onChangeDocumentStatus(
                                record.barangay_clearance_id
                              )
                            }
                            color="primary"
                            label={record.doc_status}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {(isAdmin || isOfficial) && (
                            <IconButton
                              aria-label="Print"
                              onClick={() =>
                                onPrint(record.barangay_clearance_id)
                              }
                            >
                              <PrintIcon />
                            </IconButton>
                          )}
                          <IconButton
                            aria-label="Edit"
                            onClick={() => onEdit(record.barangay_clearance_id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            aria-label="Menu"
                            onClick={() =>
                              onDelete(record.barangay_clearance_id)
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
          count={residents ? residents.records.length : 0}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
