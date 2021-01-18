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
import { useResidentViewState, usePersonEntity } from '../../../states';
import useAxios from 'axios-hooks';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  Key as KeyIcon
} from 'react-feather';
import DeleteDialog from '../../shared/DeleteDialog';
import ConfirmationDialog from '../../shared/ConfirmationDialog';
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

  const [
    residentViewState,
    {
      setOpenResetPasswordDialog,
      setShowResidentDetailView,
      setShowResidentListView,
      setAnchorEl
    }
  ] = useResidentViewState();

  const [personEntity, { setPersonEntity, setPersonID }] = usePersonEntity();

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

  const [
    {
      data: getPersonData,
      loading: getPersonDataLoading,
      error: getPersonDataError
    },
    refetchPersonData
  ] = useAxios(`/records/persons/${personEntity.personID}`, {
    manual: !personEntity.personID
  });

  //search function
  useEffect(() => {
    refetch();
  }, [residentViewState.criteria || residentViewState.openDeleteDialog]);

  useEffect(() => {
    // this must be use

    getPersonData &&
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
  }, [getPersonData]);

  useEffect(() => {
    residentViewState.showResidentListView && refetch();
  }, [residentViewState.showResidentListView]);

  const handleResetPassword = personID => {
    setOpenResetPasswordDialog(true);
  };

  const handleEdit = personID => {
    setShowResidentListView(false);
    setShowResidentDetailView(true);
  };

  const handleShowMenu = e => {};
  const handleRowClick = personID => {
    setPersonID(personID);
  };
  if (loading || getPersonDataLoading)
    return <CircularProgress className={classes.progress} />;
  if (error || getPersonDataError) return <p>Error!</p>;
  return (
    <>
      <Box mt={0}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <PerfectScrollbar>
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell>Current Group</TableCell>

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
                        onClick={e => handleRowClick(person.person_id)}
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
                          <IconButton
                            aria-label="Reset Password"
                            onClick={() => {
                              handleResetPassword(person.person_id);
                            }}
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
      </Box>
    </>
  );
};

Results.propTypes = {
  className: PropTypes.string
};

export default Results;
