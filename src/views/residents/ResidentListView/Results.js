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
  usePersonView,
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
import ConfirmationDialog from '../../shared/ConfirmationDialog';
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
  const [personView, { setPersonID }] = usePersonView();
  const [residentSearch] = useResidentSearch();
  const [activePersonID, setActivePersonID] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteDialogResult, setDeleteDialogResult] = useState(false);
  const [persons, setPersons] = useState([]);
  const [openPassResetConfirmDialog, setOpenPassResetConfirmDialog] = useState(
    false
  );
  const [
    passResetConfirmDialogResult,
    setpassResetConfirmDialogResult
  ] = useState(false);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const [
    {
      data: deleteData,
      loading: deletePersonLoading,
      error: deletePersonError
    },
    executePersonDelete
  ] = useAxios(
    { url: `/records/persons/${activePersonID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  const [
    { data: getUserData, loading: getUserLoading, error: getUserError },
    refetchUser
  ] = useAxios(
    {
      url: `/records/users?filter=person_id,eq,${activePersonID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const [{ data, loading, error }, refetch] = useAxios(`/records/persons`);
  const [anchorEl, setAnchorEl] = React.useState(null);

  //showing records on tables
  useEffect(() => {
    if (data) {
      setPersons(data.records);
    }
  }, [data]);

  //search function
  useEffect(() => {
    handleRefetch();
  }, [residentSearch.criteria]);

  // background task for fetching record base on criteria search
  const handleRefetch = () => {
    refetch({
      params: { filter: `first_name,cs,${residentSearch.criteria}` }
    });
  };

  //background task for deleting person
  const executePersonDeleteAsync = async () => {
    await executePersonDelete();
    await handleRefetch();
    setActivePersonID(0);
    setDeleteDialogResult(false);
  };

  //callback for edit
  const handleEditClick = personID => {
    setPersonID(personID);
    navigate('/app/resident-form', { replace: true });
  };

  //callback for delete
  const handleDeleteClick = personID => {
    setOpenDelete(true);
    setActivePersonID(personID);
  };

  //handles person delete
  useEffect(() => {
    if (deleteDialogResult) {
      executePersonDeleteAsync();
    }
  }, [deleteDialogResult]);

  useEffect(() => {
    if (passResetConfirmDialogResult) passResetAsync();
  }, [passResetConfirmDialogResult]);

  const passResetAsync = async () => {
    await refetchUser();
    setpassResetConfirmDialogResult(false);
  };
  useEffect(() => {
    if (getUserData) {
      const userID = getUserData.records[0].user_id;
      //Todo: Add Reset Password Routine
    }
  }, [getUserData]);
  //callback for change password
  const handleChangeRoleCallback = personID => {};
  //callback for change password
  const handleResetPasswordCallBack = personID => {
    setActivePersonID(personID);

    setOpenPassResetConfirmDialog(true);
  };
  if (loading || deletePersonLoading || getUserLoading)
    return <CircularProgress className={classes.progress} />;
  if (error || deletePersonError || getUserError) return <p>Error!</p>;
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <DeleteDialog
        open={openDelete}
        setOpen={setOpenDelete}
        setResult={setDeleteDialogResult}
      />
      <ConfirmationDialog
        title="Reset Password"
        message="Do you want to reset password?"
        open={openPassResetConfirmDialog}
        setOpen={setOpenPassResetConfirmDialog}
        setResult={setpassResetConfirmDialogResult}
      />
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
              {persons.slice(0, limit).map(person => (
                <TableRow hover key={person.person_id} value={person.person_id}>
                  <TableCell padding="default"></TableCell>
                  <TableCell>
                    <Box alignItems="center" display="flex">
                      <Typography color="textPrimary" variant="body1">
                        {`${person.first_name} ${person.last_name}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {//calculate age
                    moment().diff(person.birthdate, 'years')}
                  </TableCell>
                  <TableCell>{person.civil_status}</TableCell>
                  <TableCell>{person.phone_number}</TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="Edit"
                      onClick={() => handleEditClick(person.person_id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Reset Password"
                      onClick={() => {
                        handleResetPasswordCallBack(person.person_id);
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
                        handleDeleteClick(person.person_id)
                      }
                      handleChangeRoleCallBack={() =>
                        handleChangeRoleCallback(person.user_id)
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
        count={persons.length}
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
