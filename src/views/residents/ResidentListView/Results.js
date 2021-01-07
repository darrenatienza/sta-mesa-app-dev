import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
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
  IconButton,
  Button,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import {
  useResidentSearch,
  useResident,
  useDeleteDialog
} from '../../../states';
import useAxios from 'axios-hooks';
import { Edit as EditIcon, Delete as DeleteIcon } from 'react-feather';
import DeleteDialog from '../../shared/DeleteDialog';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  name: {}
}));

const Results = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [residentSearch] = useResidentSearch();
  const [resident, { setResidentID }] = useResident();
  const [userID, setUserID] = useState(0);
  const [deleteDialog, { setOpenDialog,setResult }] = useDeleteDialog();
  const [residents, setResidents] = useState([]);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: `/records/residents/${resident.residentID}`, method: 'DELETE' },
    {
      manual: true
    }
  );

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const [{ data, loading, error }, refetch] = useAxios(`/records/residents`);

  useEffect(() => {
    if (data) {
      setResidents(data.records);
    }
  }, [data]);

  useEffect(() => {
    handleRefetch();
  }, [residentSearch.criteria]);

  // handle delete confirmation
  useEffect( () => {
    if (deleteDialog.result) {
      handleDelete();
    }
    // set delete dialog result to default value
    setResult(false);
  }, [deleteDialog.result]);

  const handleRefetch = async() => {
    await refetch({ params: { filter: `first_name,cs,${residentSearch.criteria}` } });
  }
  // execute delete
  const handleDelete = async() => {
    await executeDelete();
    handleRefetch();
  };

  const handleEditClick = residentID => {
    navigate('/app/resident-form', { replace: true });
    setResidentID(residentID);
  };
  const handleDeleteClick = (residentID,userID) => {
    setOpenDialog(true);
    setResidentID(residentID);
  };

  if (loading || deleteLoading) return <CircularProgress className={classes.progress} />;
  if (error || deleteError) return <p>Error!</p>;
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <DeleteDialog open = {deleteDialog.open} />
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="default"></TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Civil Status</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {residents.slice(0, limit).map(resident => (
                <TableRow
                  hover
                  key={resident.resident_id}
                  value={resident.resident_id}
                >
                  <TableCell padding="default"></TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {`${resident.first_name} ${resident.last_name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{
                    //calculate age
                    moment().diff(resident.birthdate, 'years')}</TableCell>
                  <TableCell>{resident.civil_status}</TableCell>
                  <TableCell>{resident.phone_number}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditClick(resident.resident_id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Delete"
                      onClick={() => handleDeleteClick(resident.resident_id,resident.user_id)}
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
        count={residents.length}
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
  className: PropTypes.string
};

export default Results;
