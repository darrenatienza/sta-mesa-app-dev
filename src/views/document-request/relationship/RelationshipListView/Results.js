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
  relationships,
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
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relationships
                .slice(page * limit, page * limit + limit)
                .map(relationship => (
                  <TableRow hover key={relationship.relationship_id}>
                    <TableCell padding="checkbox"></TableCell>
                    <TableCell>{relationship.request_date}</TableCell>
                    {isAdmin && (
                      <>
                        <TableCell>
                          <Typography color="textPrimary" variant="body1">
                            {`${relationship.first_name} ${relationship.middle_name} ${relationship.last_name}`}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          {moment().diff(relationship.birthdate, 'years')}
                        </TableCell>
                        <TableCell>{relationship.civil_status}</TableCell>
                      </>
                    )}
                    <TableCell>{relationship.reason}</TableCell>
                    <TableCell>
                      <Chip
                        color="primary"
                        label={relationship.doc_status}
                        size="small"
                        onClick={() => {
                          isAdmin &&
                            onUpdateDocumentStatus(
                              relationship.relationship_id
                            );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Print"
                        onClick={() => onPrint(relationship.relationship_id)}
                      >
                        <PrintIcon />
                      </IconButton>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Edit"
                        onClick={() => onEdit(relationship.relationship_id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-controls="simple-menu"
                        aria-haspopup="true"
                        aria-label="Menu"
                        onClick={() => onDelete(relationship.relationship_id)}
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
        count={relationships.length}
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
  relationships: PropTypes.array.isRequired
};

export default Results;
