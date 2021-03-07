import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
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
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, healthWorkers, ...rest }) => {
  const classes = useStyles();
  const [selectedCustomerIds, setSelectedCustomerIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    alert(newPage);
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell padding="default">Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Birthdate</TableCell>
                <TableCell>Civil Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {healthWorkers &&
                healthWorkers
                  .slice(page * limit, page * limit + limit)
                  .map(healthWorker => (
                    <TableRow hover key={healthWorker.person_role_id}>
                      <TableCell padding="checkbox"></TableCell>
                      <TableCell padding="default">
                        <Typography color="textPrimary" variant="body1">
                          {`${healthWorker.first_name} ${healthWorker.middle_name} ${healthWorker.last_name}`}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        {moment().diff(healthWorker.birthdate, 'years')}
                      </TableCell>
                      <TableCell>
                        {moment(healthWorker.birthdate).format('YYYY-MM-DD')}
                      </TableCell>
                      <TableCell>{healthWorker.civil_status}</TableCell>
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={healthWorkers && healthWorkers.length}
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
  className: PropTypes.string,
  healthWorkers: PropTypes.array.isRequired
};

export default Results;
