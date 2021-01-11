import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import Menu from './Menus';
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
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  Key as KeyIcon
} from 'react-feather';
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
  const [activeUserID, setActiveUserID] = useState(0);
  const [activeResidentID, setActiveResidentID] = useState(0);
  const [deleteDialog, { setOpenDialog, setResult }] = useDeleteDialog();
  const [residents, setResidents] = useState([]);
  const [deleteResidentResult, setDeleteResidentResult] = useState(0);
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const [
    {
      data: deleteData,
      loading: deleteResidentLoading,
      error: deleteResidentError
    },
    executeResidentDelete
  ] = useAxios(
    { url: `/records/residents/${activeResidentID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  const [
    {
      data: deleteUserData,
      loading: deleteUserLoading,
      error: deleteUserError
    },
    executeUserDelete
  ] = useAxios(
    { url: `/records/users/${activeUserID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const [{ data, loading, error }, refetch] = useAxios(`/records/residents`);
  const [anchorEl, setAnchorEl] = React.useState(null);
  //showing records on tables
  useEffect(() => {
    if (data) {
      setResidents(data.records);
    }
  }, [data]);

  //search function
  useEffect(() => {
    handleRefetch();
  }, [residentSearch.criteria]);

  // handle delete confirmation dialog
  useEffect(() => {
    if (deleteDialog.result) {
      executeResidentDeleteRequest();
    }
    // set delete dialog result to default value
    setResult(false);
  }, [deleteDialog.result]);

  //after resident successfully deleted proceed to user deletion
  useEffect(() => {
    if (deleteResidentResult > 0) {
      executeUserDeleteRequest();
    }
  }, [deleteResidentResult]);

  //set value to global state when active resident change
  useEffect(() => {
    setResidentID(activeResidentID);
  }, [activeResidentID]);

  // background task for fetching record base on criteria search
  const handleRefetch = async () => {
    await refetch({
      params: { filter: `first_name,cs,${residentSearch.criteria}` }
    });
  };
  //background task for deleting resident
  const executeResidentDeleteRequest = async () => {
    const { data } = await executeResidentDelete();
    setDeleteResidentResult(data);
    handleRefetch();
  };
  //background task for deleting user
  const executeUserDeleteRequest = async () => {
    const { data } = await executeUserDelete();
    await handleRefetch();
  };
  //callback for edit
  const handleEditClick = residentID => {
    navigate('/app/resident-form', { replace: true });
    setResidentID(residentID);
  };

  //callback for delete
  const handleDeleteClick = (residentID, userID) => {
    setOpenDialog(true);
    setActiveResidentID(residentID);
    setActiveUserID(userID);
  };

  //callback for change password
  const handleChangeRoleCallback = userID => {
    alert('Reset');
  };
  //callback for change password
  const handleResetPasswordCallBack = userID => {
    alert('Reset');
  };
  if (loading || deleteResidentLoading || deleteUserLoading)
    return <CircularProgress className={classes.progress} />;
  if (error || deleteResidentError || deleteUserError) return <p>Error!</p>;
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <DeleteDialog open={deleteDialog.open} />
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
                  <TableCell>
                    {//calculate age
                    moment().diff(resident.birthdate, 'years')}
                  </TableCell>
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
                      aria-label="Reset Password"
                      onClick={() => {
                        handleResetPasswordCallBack(resident.resident_id);
                      }}
                    >
                      <KeyIcon />
                    </IconButton>

                    <IconButton
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      aria-label="Menu"
                      onClick={e => setAnchorEl(e.target)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                      handleDeleteCallBack={() =>
                        handleDeleteClick(
                          resident.resident_id,
                          resident.user_id
                        )
                      }
                      handleChangeRoleCallBack={() =>
                        handleChangeRoleCallback(resident.user_id)
                      }
                    />
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
