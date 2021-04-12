import {
  Box,
  Card,
  CardContent,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { PureComponent } from 'react';
import Logo from 'src/components/Logo';
import moment from 'moment';
const useStyles = theme => ({
  root: { marginTop: theme.spacing(3), width: '50%' },
  avatar: {
    marginRight: theme.spacing(2)
  },
  header: {
    fontSize: '14px',
    textAlign: 'center'
  },
  headerTitle: {
    fontFamily: 'Algerian, Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '20px',
    marginTop: '30px'
  },
  paragraph: {
    marginTop: '16px',
    textIndent: '48px',
    marginBottom: '10px',
    textAlign: 'justify'
  },
  thumbBox: {
    height: '150px',
    border: '1px solid',
    borderColor: '#00000',
    marginBottom: '10px'
  },
  logo: {
    width: '75px',
    height: '75px'
  },
  field: { textDecoration: 'underline', fontWeight: 'bold' }
});

class PrintPreview extends Component {
  render() {
    const { classes, logRecords } = this.props;
    return (
      <div className={classes.root}>
        <Card>
          <CardContent>
            <Box border="1px solid">
              <Box display="flex" justifyContent="center" m={3}>
                <Box position="relative" width="100%">
                  <Box position="absolute" left="10%">
                    <Logo className={classes.logo} />
                  </Box>
                  <Box className={classes.header}>
                    <p>Republic of the Philippines</p>
                    <p>Province of Batangas</p>
                    <p>Municipality of Mabini</p>
                    <p>BARANGAY STA. MESA</p>
                    <p className={classes.headerTitle}>
                      OFFICE OF THE SANGGUNIANG BARANGAY
                    </p>
                  </Box>
                </Box>
              </Box>
              {/* table itself */}
              <Box mt={3}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Time In</TableCell>
                      <TableCell>Time Out</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {logRecords.map(logRecord => (
                      <TableRow key={logRecord.logDate}>
                        <TableCell>
                          {moment(logRecord.logDate).format('MM/DD/YYYY')}
                        </TableCell>
                        <TableCell>
                          {logRecord.timeIn &&
                            moment(logRecord.timeIn).format('LTS')}
                        </TableCell>
                        <TableCell>
                          {logRecord.timeOut &&
                            logRecord.has_time_out &&
                            moment(logRecord.timeOut).format('LTS')}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withTheme(withStyles(useStyles)(PrintPreview));
