import { Box, Card, CardContent } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { PureComponent } from 'react';
import Logo from 'src/components/Logo';
import moment from 'moment';
const useStyles = theme => ({
  root: { paddingTop: '24px', paddingBottom: '24px' },
  avatar: {
    marginRight: theme.spacing(2)
  },
  headerTitle: {
    fontFamily: 'Algerian, Tahoma, Geneva, Verdana, sans-serif',
    fontSize: '20px'
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
    width: '150px',
    height: '150px'
  },
  field: { textDecoration: 'underline', fontWeight: 'bold' }
});
class Preview extends PureComponent {
  constructor() {
    super();
  }

  render() {
    const { classes, data } = this.props;
    const age = moment().diff(data.birthdate, 'years');
    const gender =
      data.gender === 'male'
        ? ['He', 'his', 'him']
        : data.gender === 'female'
        ? ['She', 'her', 'her']
        : ['', '', ''];

    const civilStatus =
      data.civil_status &&
      `${data.civil_status.charAt(0).toUpperCase()}${data.civil_status.slice(
        1
      )}`;
    return (
      <div className={classes.root}>
        <Box display="flex" alignItems="center" position="relative">
          <Box position="relative" left="36px" top="16px">
            <Logo className={classes.logo} />
          </Box>
          <Box position="absolute" width="100%" textAlign="center">
            <Box>
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
        <Box maxWidth="90%" m="0 auto">
          <Box textAlign="center" mt={3} fontSize="24px">
            <p>
              <strong>CERTIFICATION / CLEARANCE</strong>
            </p>
          </Box>
          <Box mt={6} textAlign="end">
            <p className={classes.field}>{moment().format('MMMM DD, YYYY')}</p>
            <p>Date</p>
          </Box>
          <Box mt={4}>
            <p>TO WHOM IT MAY CONCERN:</p>
          </Box>
          <Box className={classes.paragraph}>
            <p>
              This is to certify that{' '}
              <span className={classes.field}>
                {data.first_name} {data.middle_name} {data.last_name}
              </span>
              , <span className={classes.field}>{age}</span> years old,{' '}
              <span className={classes.field}>{civilStatus}</span> and Filipino
              citizen is bonafide resident of Barangay Sta. Mesa, Mabini,
              Batangas and personally known to me of good moral character and
              law abiding citizen. {gender[0]} has not been convicted to any
              violation of laws and ordinances and does not have any existing
              record in the barangay.
            </p>
          </Box>
          <Box className={classes.paragraph}>
            <p>
              This Certification / Clearance is hereby issued upon the request
              of the above subject individual in connection to {gender[1]}{' '}
              application for{' '}
              <span className={classes.field}>{data.reason}</span> and for
              whatever legal purposes this may serve.
            </p>
          </Box>
          <Box className={classes.paragraph}>
            <p>
              Any favourable consideration extended to {gender[2]} will be
              highly appreciated by the undersigned.
            </p>
          </Box>

          <Box mt={12} mb={2} textAlign="end">
            <p>_________________________</p>
            <p>
              <strong>CRISTITO I. GONZALES</strong>
            </p>
            <p>Barangay Captain</p>
          </Box>

          <hr size="2" color="00000" />
          <Box display="flex" justifyContent="space-between">
            <Box width="150px" textAlign="center" mt={3} ml={3}>
              <Box className={classes.thumbBox} />
              <p>Thumb Mark</p>
            </Box>

            <Box mt={2}>
              <Box textAlign="justify">
                <p>
                  Res.Cert. No.:{' '}
                  <span className={classes.field}>{data.res_cert_no}</span>
                </p>
                <p>
                  Date Issued:{' '}
                  <span className={classes.field}>
                    {moment(data.date_issued).format('MM-DD-YYYY')}
                  </span>
                </p>
                <p>
                  Place Issued:{' '}
                  <span className={classes.field}>{data.place_issued}</span>
                </p>
              </Box>
              <Box mt={8} textAlign="end">
                <p>_________________________</p>
                <p>Signature</p>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}

export default withTheme(withStyles(useStyles)(Preview));
