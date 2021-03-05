import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useBarangayClearanceViewState } from '../../../../states';
import {
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
import useAxios from 'axios-hooks';
import { Edit as EditIcon, Delete as DeleteIcon } from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  isAdmin,

  ...rest
}) => {
  const classes = useStyles();
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
    { setBarangayClearanceID, setShowFormView, setShowListView, setRefreshList }
  ] = useBarangayClearanceViewState();
  // http request hooks
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_barangay_clearances?filter1=first_name,cs,${barangayClearanceStateView.filterCriteria}&filter2=last_name,cs,${barangayClearanceStateView.filterCriteria}&filter=request_date,cs,${barangayClearanceStateView.filterDate}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const [
    {
      //data: deleteData,
      loading: deleteLoading,
      error: deleteError
    },
    executeDelete
  ] = useAxios(
    { url: `/records/barangay_clearances/${selectedID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  //occurs when filter values change
  useEffect(() => {
    const reloadList = async () => {
      await refetch();
    };
    reloadList();
  }, [
    barangayClearanceStateView.filterCriteria ||
      barangayClearanceStateView.filterDate
  ]);
  useEffect(() => {
    const reloadList = async () => {
      if (barangayClearanceStateView.refreshList) {
        await refetch();
      }
    };
    reloadList();
    setRefreshList(false);
  }, [barangayClearanceStateView.refreshList]);

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
  const handleDialogClose = async agree => {
    if (agree) {
      await executeDelete();
      await refetch();
    }
    setOpen(false);
  };

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && <p>Error!</p>}
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
                  {isAdmin && <TableCell>Actions</TableCell>}
                </TableRow>
              </TableHead>
              <TableBody>
                {data &&
                  data.records.slice(0, limit).map(record => (
                    <TableRow hover key={record.barangay_clearance_id}>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell>
                        {moment(record.request_date).format('DD/MM/YYYY')}
                      </TableCell>
                      <TableCell>{`${record.first_name} ${record.middle_name} ${record.last_name}`}</TableCell>
                      <TableCell>{`${record.phone_number}`}</TableCell>
                      <TableCell>{record.reason}</TableCell>
                      <TableCell>{record.doc_status}</TableCell>
                      {isAdmin && (
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
                      )}
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        <TablePagination
          component="div"
          count={data ? data.records.length : 0}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>

      <Dialog
        open={open}
        onClose={handleDialogClose}
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
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Disagree
          </Button>
          <Button
            onClick={() => handleDialogClose(true)}
            color="primary"
            autoFocus
          >
            {deleteLoading
              ? 'Please Wait ...'
              : deleteError
              ? 'Error while deleting record'
              : 'Agree'}
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
