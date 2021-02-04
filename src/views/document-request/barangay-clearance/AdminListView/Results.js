import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useBarangayClearanceViewState } from '../../../../states';
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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import useAxios from 'axios-hooks';
import ClientFormView from '../ClientFormView';
import { Edit as EditIcon, Delete as DeleteIcon } from 'react-feather';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,

  ...rest
}) => {
  const classes = useStyles();
  const [affectedRows, setAffectedRows] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedID, setSelectedID] = useState();
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };
  //global state
  const [
    barangayClearanceStateView,
    { setBarangayClearanceID, setShowFormView, setShowListView }
  ] = useBarangayClearanceViewState();
  // http request hooks
  const [{ data, loading, error }, refetch] = useAxios(
    `/records/view_barangay_clearances`
  );
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: `/records/barangay_clearances/${selectedID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  // array holder for list
  const [records, setRecords] = useState([]);
  // occurs when data has change, set it to records hook
  useEffect(() => {
    data && setRecords(...records, data.records);
  }, [data]);
  // after successful delete, perform refetch operation
  useEffect(() => {
    if (affectedRows > 0) {
      refetch();
      setAffectedRows(0);
    }
  }, [affectedRows]);
  //perform refetch after showing the list
  useEffect(() => {
    barangayClearanceStateView.showListView && refetch();
  }, [barangayClearanceStateView.showListView]);
  // misc
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  //  edit callback
  const handleEdit = id => {
    setBarangayClearanceID(id);
    setShowListView(false);
    setShowFormView(true);
  };
  //  delete callback
  const handleDelete = id => {
    setSelectedID(id);
    setOpen(true);
  };
  //  dialog close callback
  // perform delete request if agree
  const handleClose = async agree => {
    if (agree) {
      const { data: row } = await executeDelete();
      setAffectedRows(row);
    }
    setOpen(false);
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
                  <TableCell>Full Name</TableCell>
                  <TableCell>Contact Number</TableCell>
                  <TableCell>Reason</TableCell>
                  <TableCell>Document Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {records.length > 0 ? (
                  records.slice(0, limit).map(record => (
                    <TableRow hover key={record.barangay_clearance_id}>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>
                        {moment(record.request_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{`${record.first_name} ${record.middle_name} ${record.last_name}`}</TableCell>
                      <TableCell>{`${record.phone_number}`}</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>{record.doc_status}</TableCell>
                      <TableCell>
                        <IconButton
                          aria-label="Edit"
                          onClick={() =>
                            handleEdit(record.barangay_clearance_id)
                          }
                        >
                          <EditIcon />
                        </IconButton>

                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          aria-label="Menu"
                          onClick={() =>
                            handleDelete(record.barangay_clearance_id)
                          }
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow key="0">
                    <TableCell>Loading...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={records.length}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {'Delete selected record?'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete the selected record?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(false)} color="primary">
            Disagree
          </Button>
          <Button onClick={() => handleClose(true)} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string
  //records: PropTypes.array.isRequired
};

export default Results;
