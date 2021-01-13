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

  useResidentViewState
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
  const [residentViewState, {setPersonID, setOpenResetPasswordDialog  }] = useResidentViewState();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const [{ data, loading, error }, refetch] =
    useAxios(`/records/persons?filter=first_name,cs,${residentViewState.criteria}`
     );
  const [anchorEl, setAnchorEl] = React.useState(null);

  //search function
  useEffect(() => {
    refetch();
  }, [residentViewState.criteria || residentViewState.openDeleteDialog]);

  const handleResetPassword = (personID) => {
    console.log(personID);
    setPersonID(personID);
    setOpenResetPasswordDialog(true);
  }
  const handleEdit = (personID) => { 
    setPersonID(personID);
    navigate('/app/resident-form')
  }

  if (loading )
    return <CircularProgress className={classes.progress} />;
  if (error ) return <p>Error!</p>;
  return (
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
              {data?.records.slice(0, limit).map(person => (
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
                      onClick={e => setAnchorEl(e.target)}
                    >
                      <MenuIcon />
                    </IconButton>
                    <Menu
                      anchorEl={anchorEl}
                      setAnchorEl={setAnchorEl}
                      personID = {person.person_id}
                     
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
        count={data?.records.length}
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
