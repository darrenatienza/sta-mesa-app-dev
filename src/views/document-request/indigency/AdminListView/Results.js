import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import useAxios from 'axios-hooks';
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
  Chip,
  IconButton,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import { Printer as PrintIcon, Delete as DeleteIcon } from 'react-feather';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, indigencies, reloadList, ...rest }) => {
  const classes = useStyles();
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);
  const [selectedID, setSelectedID] = useState(0);
  const [
    { data: deleteData, loading: deleteLoading, error: deleteError },
    executeDelete
  ] = useAxios(
    { url: `/records/indigencies/${selectedID}`, method: 'DELETE' },
    {
      manual: true
    }
  );
  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  // users actions
  const handlePrint = () => {};
  // users actions
  const handleDelete = id => {
    console.log(id);
    setSelectedID(id);
  };
  //performs delete
  useEffect(() => {
    if (selectedID > 0) {
      const performDelete = async () => {
        const { data: row } = await executeDelete();
        if (row > 0) {
          reloadList();
        }
      };
      performDelete();
    }
  }, [selectedID]);
  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Request Date</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Age</TableCell>
                <TableCell>Civil Status</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {indigencies &&
                indigencies.slice(0, limit).map(indigency => (
                  <TableRow hover key={indigency.indigency_id}>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>{indigency.request_date}</TableCell>
                    <TableCell>
                      <Box alignItems="center" display="flex">
                        <Avatar className={classes.avatar}>
                          {getInitials(indigency.first_name)}
                        </Avatar>
                        <Typography color="textPrimary" variant="body1">
                          {`${indigency.first_name} ${indigency.middle_name} ${indigency.last_name}`}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {moment().diff(indigency.birthdate, 'years')}
                    </TableCell>
                    <TableCell>{indigency.civil_status}</TableCell>

                    <TableCell>
                      <Chip
                        color="primary"
                        label={indigency.doc_status}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Menu"
                        onClick={() => handlePrint(indigency.indigency_id)}
                      >
                        <PrintIcon />
                      </IconButton>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Menu"
                        onClick={() => handleDelete(indigency.indigency_id)}
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
        count={indigencies ? indigencies.length : 0}
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
  indigencies: PropTypes.array.isRequired
};

export default Results;
