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

const Results = ({ className, officials, ...rest }) => {
  const [
    officialViewState,
    {
      setOfficialID,
      setShowOfficialFormView,
      setShowOfficialListView,
      setRefreshList
    }
  ] = useOfficialViewState();

  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [myOfficialID, setMyOfficialID] = useState();
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: `/records/officials/${myOfficialID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const handleEditClick = officialID => {
    setOfficialID(officialID);
    setShowOfficialFormView(true);
    setShowOfficialListView(false);
  };
  const handleDelete = id => {
    console.log(id);
    setMyOfficialID(id);
    setOpenDeleteDialog(true);
  };
  const handleConfirm = () => {
    executeDelete();
    setOpenDeleteDialog(false);
    setRefreshList(true);
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
                      <Box alignItems="center" display="flex">
                        <Avatar
                          className={classes.avatar}
                          src={official.avatarUrl}
                        >
                          {getInitials(official.first_name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {`${official.first_name} ${official.last_name} `}
                        </Typography>
                      </Box>
                    </TableCell>

                    <TableCell>{official.title}</TableCell>

                    <TableCell>
                      <IconButton
                        aria-label="Edit"
                        onClick={() => handleEditClick(official.official_id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="Edit"
                        onClick={() => handleDelete(official.official_id)}
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
        count={officials && officials.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
      <Dialog
        fullWidth
        open={openDeleteDialog}
        onClose={() => setOpenDeleteDialog(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Delete Record</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you want to delete this record
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={() => handleConfirm()} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

Results.propTypes = {
  className: PropTypes.string,
  officials: PropTypes.array.isRequired
};

export default Results;
