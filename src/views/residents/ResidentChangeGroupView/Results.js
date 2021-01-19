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
  useResidentViewState,
  usePersonEntity,
  useResidentChangeRoleViewState
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
import ResidentDeleteView from '../ResidentDeleteView';
import { version } from 'moment';
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
  const [
    residentChangeRoleViewState,
    { setRefetchResults, setRefetchRoleResults }
  ] = useResidentChangeRoleViewState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [personRoleIDOnDelete, setPersonRoleIDOnDelete] = useState(27);
  const [affectedRows, setAffectedRows] = useState(0);
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };
  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const [{ data, loading, error }, refetch] = useAxios(
    `/records/view_person_roles?filter=person_id,eq,${personEntity.personID}`,
    {
      manual: !personEntity.personID
    }
  );

  const [
    {
      data: deletePersonRoleData,
      loading: deletePersonRoleDataLoading,
      error: deletePersonRoleDataError
    },
    executeDeletePersonRoleData
  ] = useAxios(
    { url: `/records/person_roles/${personRoleIDOnDelete}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  useEffect(() => {
    if (residentChangeRoleViewState.refetchResults) {
      refetch();
      setRefetchRoleResults(true);
      setRefetchResults(false);
    }
  }, [residentChangeRoleViewState.refetchResults]);
  // if id change, delete happens
  useEffect(() => {
    executeDeletePersonRole();
  }, [personRoleIDOnDelete]);
  //TODO: Add POSt Method
  const executeDeletePersonRole = async () => {
    await executeDeletePersonRoleData();
    await refetch();
  };
  const handleRoleDelete = personRoleIDOnDelete => {
    setPersonRoleIDOnDelete(personRoleIDOnDelete);
  };
  if (loading || deletePersonRoleDataLoading)
    return <CircularProgress className={classes.progress} />;
  if (error || deletePersonRoleDataError) return <p>Error!</p>;
  return (
    <>
      <Box mt={0}>
        <Card className={clsx(classes.root, className)} {...rest}>
          <PerfectScrollbar>
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="default">Current Group</TableCell>

                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data &&
                    data.records.slice(0, limit).map(v => (
                      <TableRow
                        hover
                        key={v.person_role_id}
                        value={v.person_role_id}
                      >
                        <TableCell>
                          <Box alignItems="center" display="flex">
                            <Typography color="textPrimary" variant="body1">
                              {`${v.title}`}
                            </Typography>
                          </Box>
                        </TableCell>

                        <TableCell>
                          <IconButton
                            aria-label="Reset Password"
                            onClick={() => {
                              handleRoleDelete(v.person_role_id);
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
