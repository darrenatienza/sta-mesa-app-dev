import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  CircularProgress,
  IconButton,
  makeStyles
} from '@material-ui/core';

import { useResidentViewState, usePersonEntity } from '../../../states';
import useAxios from 'axios-hooks';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  Key as KeyIcon,
  Power as ActivateIcon,
  Eye as ViewIcon
} from 'react-feather';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  },
  name: {}
}));

const Results = ({
  className,
  residents,
  onDelete,
  onReset,
  onViewDetail,
  onActivateUser,
  isAdmin,
  isOfficial,
  ...rest
}) => {
  const classes = useStyles();
  const navigate = useNavigate();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };
  const adminActionButtons = person => {
    return (
      <>
        <IconButton
          aria-label="Activate"
          onClick={() => {
            onActivateUser(person.user_id, person.active);
          }}
        >
          <ActivateIcon color={!person.active ? 'red' : 'currentColor'} />
        </IconButton>
        <IconButton
          aria-label="Reset Password"
          onClick={() => {
            onViewDetail(person.person_id);
          }}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          aria-label="Reset Password"
          onClick={() => {
            onReset(person.person_id);
          }}
        >
          <KeyIcon />
        </IconButton>

        <IconButton
          aria-controls="simple-menu"
          aria-haspopup="true"
          aria-label="Menu"
          onClick={() => onDelete(person.person_id)}
        >
          <DeleteIcon />
        </IconButton>
      </>
    );
  };
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
                {residents &&
                  (residents.records || []).slice(0, limit).map(person => (
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
                        {isAdmin && adminActionButtons(person)}
                        {isOfficial && !isAdmin && (
                          <IconButton
                            aria-label="View Information"
                            onClick={() => {
                              onViewDetail(person.person_id);
                            }}
                          >
                            <ViewIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>

        <TablePagination
          component="div"
          count={residents ? residents.records && residents.records.length : 0}
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
