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
  IconButton,
  makeStyles
} from '@material-ui/core';
import { FiDelete as DeleteIcon, FiEdit as EditIcon } from 'react-icons/fi';
import getInitials from 'src/utils/getInitials';

const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  medicines,
  onEdit,
  onDelete,
  isBhw,
  ...rest
}) => {
  const classes = useStyles();

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = event => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <PerfectScrollbar>
        <Box minWidth={1050}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="default" />
                <TableCell>Medicine Name</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Quantity</TableCell>
                {isBhw && <TableCell>Actions</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {medicines &&
                medicines
                  .slice(page * limit, page * limit + limit)
                  .map(medicine => (
                    <TableRow hover key={medicine.medecine_id}>
                      <TableCell padding="default" />
                      <TableCell>
                        <Box alignItems="center" display="flex">
                          <Typography color="textPrimary" variant="body1">
                            {medicine.name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{medicine.description}</TableCell>
                      <TableCell>{medicine.quantity}</TableCell>
                      {isBhw && (
                        <TableCell>
                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            aria-label="Menu"
                            onClick={() => onEdit(medicine.medecine_id)}
                          >
                            <EditIcon />
                          </IconButton>

                          <IconButton
                            aria-controls="simple-menu"
                            aria-haspopup="true"
                            aria-label="Menu"
                            onClick={() => onDelete(medicine.medecine_id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      )}
                    </TableRow>
                  ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={medicines ? medicines.length : 0}
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
  medicines: PropTypes.array.isRequired
};

export default Results;
