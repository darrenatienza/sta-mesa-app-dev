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
import { useResidentViewState, usePersonEntity } from '../../../states';
import useAxios from 'axios-hooks';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  Key as KeyIcon
} from 'react-feather';
import DeleteDialog from '../../shared/DeleteDialog';

import ResidentDeleteView from '../ResidentDeleteView';

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
  const [selectedPersonID, setSelectedPersonID] = useState(0);
  const [
    residentViewState,
    {
      setOpenResetPasswordDialog,
      setShowResidentDetailView,
      setShowResidentListView,
      setOpenDeleteDialog,
      setDeleteSuccess
    }
  ] = useResidentViewState();

  const [
    personEntity,
    { setPersonEntity, setPersonID, resetPersonEntity }
  ] = usePersonEntity();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const [{ data, loading, error }, refetch] = useAxios(
    `/records/persons?filter=first_name,cs,${residentViewState.criteria}`
  );
  useEffect(() => {
    resetPersonEntity();
  }, []);
  const [
    {
      data: getPersonData,
      loading: getPersonDataLoading,
      error: getPersonDataError
    },
    refetchPersonData
  ] = useAxios(`/records/persons/${selectedPersonID}`, {
    manual: true
  });

  //search function
  useEffect(() => {
    if (residentViewState.isDeleteSuccess) {
      refetch();
      setDeleteSuccess(false);
    }
  }, [residentViewState.isDeleteSuccess]);

  useEffect(() => {
    // this must be use

    if (getPersonData) {
      setPersonEntity(
        getPersonData.person_id,
        getPersonData.first_name,
        getPersonData.middle_name,
        getPersonData.last_name,
        getPersonData.civil_status,
        getPersonData.phone_number,
        getPersonData.birthdate,
        getPersonData.group
      );
    }
  }, [getPersonData]);

  useEffect(() => {
    residentViewState.showResidentListView && refetch();
  }, [residentViewState.showResidentListView]);

  const handleResetPassword = personID => {
    setOpenResetPasswordDialog(true);
  };

  const executeRefetchPersonData = async () => {
    await refetchPersonData();
  };
  useEffect(() => {
    selectedPersonID && executeRefetchPersonData();
  }, [selectedPersonID]);
  const handleEdit = personID => {
    setSelectedPersonID(personID);
    setShowResidentListView(false);
    setShowResidentDetailView(true);
  };

  const handleDelete = personID => {
    setPersonID(personID);
    setOpenDeleteDialog(true);
  };
  if (loading || getPersonDataLoading)
    return <CircularProgress className={classes.progress} />;
  if (error || getPersonDataError) return <p>Error!</p>;
  return (
    <>
      <Card className={clsx(classes.root, className)} {...rest}>
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
                {data &&
                  data.records.slice(0, limit).map(person => (
                    <TableRow
                      hover
                      key={person.person_id}
                      value={person.person_id}
                    >
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
                          onClick={() => handleEdit(person.person_id)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          aria-label="Reset Password"
                          onClick={() => {
                            handleResetPassword(person.person_id);
                          }}
                        >
                          <KeyIcon />
                        </IconButton>

                        <IconButton
                          aria-controls="simple-menu"
                          aria-haspopup="true"
                          aria-label="Menu"
                          onClick={() => handleDelete(person.person_id)}
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
          count={data && data.records.length}
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
