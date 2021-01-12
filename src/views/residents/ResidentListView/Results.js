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
import { setPersonID } from 'src/states/personView';
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
  const [activePersonID, setActivePersonID] = useState(0);
  const [openDelete, setOpenDelete] = useState(false);
  const [deleteResult, setDeleteResult] = useState(false);
  const [residents, setResidents] = useState([]);
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const [
    {
      data: deleteData,
      loading: deleteResidentLoading,
      error: deleteResidentError
    },
    executePersonDelete
  ] = useAxios(
    { url: `/records/persons/${activePersonID}`, method: 'DELETE' },
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
      setResidents(data.records);
    }
  }, [data]);

  //search function
  useEffect(() => {
    handleRefetch();
  }, [residentSearch.criteria]);

 

  // background task for fetching record base on criteria search
  const handleRefetch = async () => {
    await refetch({
      params: { filter: `first_name,cs,${residentSearch.criteria}` }
    });
  };

  //background task for deleting resident
  const executePersonDeleteRequest = async () => {
    const { data } = await executePersonDelete();
    handleRefetch();
  };

  //callback for edit
  const handleEditClick = personID => {
    navigate('/app/resident-form', { replace: true });
    setPersonID(personID);
  };

  //callback for delete
  const handleDeleteClick = (personID) => {
    setOpenDelete(true);
    setActivePersonID(personID);
  };
  useEffect(() => {
    if (deleteResult) {
      {
        executePersonDelete();
     }
   }
  }, [deleteResult])
  //callback for change password
  const handleChangeRoleCallback = userID => {
    alert('Reset');
  };
  //callback for change password
  const handleResetPasswordCallBack = userID => {
    alert('Reset');
  };
  if (loading || deleteResidentLoading)
    return <CircularProgress className={classes.progress} />;
  if (error || deleteResidentError) return <p>Error!</p>;
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <DeleteDialog open={openDelete} setOpen={setOpenDelete} setResult = {setDeleteResult} />
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
                  key={resident.person_id}
                  value={resident.person_id}
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
                      onClick={() => handleEditClick(resident.person_id)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="Reset Password"
                      onClick={() => {
                        handleResetPasswordCallBack(resident.person_id);
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
                          resident.person_id
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
