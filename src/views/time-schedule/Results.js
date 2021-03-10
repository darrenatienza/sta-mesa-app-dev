import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Divider,
  SvgIcon,
  makeStyles,
  CardHeader,
  Typography,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from '@material-ui/core';
const useStyles = makeStyles(theme => ({
  root: {
    paddingTop: theme.spacing(3),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3)
  }
}));
const Results = ({ className, list, ...rest }) => {
  const classes = useStyles();

  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Card>
        <CardHeader title="Time Records" />
        <Divider />
        <CardContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Date / Time</TableCell>
                <TableCell>Time In</TableCell>
                <TableCell>Time Out</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {list &&
                list.map(item => (
                  <TableRow key={item.time_schedule_id}>
                    <TableCell>{item.create_time_stamp}</TableCell>
                    <TableCell>{moment(item.time_in).format('LTS')}</TableCell>
                    <TableCell>
                      {item.has_time_out && moment(item.time_out).format('LTS')}
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </CardContent>
        <Divider />

        <Box display="flex" justifyContent="flex-end" p={1}>
          <Button variant="contained" color="primary">
            Print Preview
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default Results;
