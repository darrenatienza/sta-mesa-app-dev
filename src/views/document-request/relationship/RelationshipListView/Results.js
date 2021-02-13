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
  Key as KeyIcon
} from 'react-feather';
const useStyles = makeStyles(theme => ({
  root: {},
  avatar: {
    marginRight: theme.spacing(2)
  }
}));

const Results = ({ className, onEdit, onDelete, relationships, ...rest }) => {
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
                <TableCell>Person Related with</TableCell>
                <TableCell>Relationship</TableCell>
                <TableCell>Reason</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {relationships.slice(0, limit).map(relationship => (
                <TableRow hover key={relationship.relationship_id}>
                  <TableCell padding="checkbox"></TableCell>
                  <TableCell>{relationship.request_date}</TableCell>
                  <TableCell>{relationship.person_related_with}</TableCell>
                  <TableCell>{relationship.relationship}</TableCell>
                  <TableCell>{relationship.reason}</TableCell>
                  <TableCell>
                    <Chip
                      color="primary"
                      label={relationship.doc_status}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton
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
