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
  Chip,
  IconButton,
  makeStyles
} from '@material-ui/core';
import getInitials from 'src/utils/getInitials';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Menu as MenuIcon,
  Key as KeyIcon,
  Printer as PrintIcon
} from 'react-feather';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({
  className,
  onEdit,
  onDelete,
  onUpdateDocumentStatus,
  residencies,
  isAdmin,
  onPrint,
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
                <TableCell padding="checkbox"></TableCell>
                <TableCell>Request Date</TableCell>
                {isAdmin && (
                  <>
                    <TableCell>Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Civil Status</TableCell>
                  </>
                )}
                <TableCell>Residing Span</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {residencies
                .slice(page * limit, page * limit + limit)
                .map(residency => (
                  <TableRow hover key={residency.residency_id}>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>{residency.create_time_stamp}</TableCell>
                    {isAdmin && (
                      <>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {`${residency.first_name} ${residency.middle_name} ${residency.last_name}`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {moment().diff(residency.birthdate, 'years')}
                        </TableCell>
                        <TableCell>{residency.civil_status}</TableCell>
                      </>
                    )}
                    <TableCell>{residency.residing_span}</TableCell>

                    <TableCell>
                      <Chip
                        color="primary"
                        label={residency.doc_status}
                        size="small"
                        onClick={() =>
                          isAdmin &&
                          onUpdateDocumentStatus(residency.residency_id)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Print"
                        onClick={() => onPrint(residency.residency_id)}
                      >
                        <PrintIcon />
                      </IconButton>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Menu"
                        onClick={() => onEdit(residency.residency_id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Menu"
                        onClick={() => onDelete(residency.residency_id)}
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
        count={residencies.length}
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
  residencies: PropTypes.array.isRequired
};

export default Results;
