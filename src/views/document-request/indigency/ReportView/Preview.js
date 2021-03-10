import { Box } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import moment from 'moment';
import React, { Component } from 'react';
import Logo from 'src/components/Logo';

const useStyles = theme => ({
  root: { padding: '24px' },
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
    width: '100px',
    height: '100px'
  },
  field: { textDecoration: 'underline', fontWeight: 'bold' },
  name: { fontWeight: 'bold' }
});
class Preview extends Component {
  render() {
    function ordinal(number) {
      switch (number) {
        case 1:
        case 21:
          return number + 'st';
          break;
        case 2:
        case 22:
          return number + 'nd';
          break;
        case 3:
        case 23:
          return number + 'rd';
          break;
        default:
          return number + 'th';
      }
    }
    const { classes, data } = this.props;
    const gender =
      data.gender === 'male'
        ? ['He', 'his', 'him', 'Mr']
        : data.gender === 'female'
        ? ['She', 'her', 'her', 'Ms']
        : ['', '', '', ''];
    const civilStatus =
      data.civil_status &&
      `${data.civil_status.charAt(0).toUpperCase()}${data.civil_status.slice(
        1
      )}`;
    const gender1 =
      data.gender &&
      `${data.gender.charAt(0).toUpperCase()}${data.gender.slice(1)}`;
    return (
      <div className={classes.root}>
        <Box display="flex" height="950px">
          <Box
            position="relative"
            minWidth="255px"
            border="1px solid"
            textAlign="center"
            paddingTop="50px"
            paddingLeft="10px"
            fontFamily="Calibri, Tahoma, Geneva, Verdana, sans-serif"
            fontSize="14px"
          >
            <Box fontFamily="Impact, Haettenschweiler, Arial Narrow Bold, sans-serif">
              <p>SANGGUNIANG BARANGAY</p>
            </Box>

            <Box marginTop="60px">
              <p className={classes.name}>HON. CRISTITO I. GONZALES</p>
              <p>Barangay Chairman</p>
            </Box>

            <Box marginTop="60px">
              <p>
                <strong>SB MEMBER</strong>
              </p>

              <Box marginTop="30px" textAlign="left" fontWeight="bold">
                <p>HON. JONARD M. ORTEGA</p>
                <p>HON. AILEEN A. MATIRA</p>
                <p>HON. JUAN D. ALOLOD</p>
                <p>HON. PLACIDO A. ORTEGA</p>
                <p>HON. LUCILO O. INGCO</p>
                <p>HON. ROMULO O. MACALALAD</p>
                <p>HON. GERARDO I. MAUHAY</p>
              </Box>
            </Box>

            <Box marginTop="60px">
              <p className={classes.name}>HON. KIM DENZEL G. HERNANDEZ</p>
              <p>SK Chairman</p>
            </Box>
            <Box marginTop="60px">
              <p className={classes.name}>BRENDALYN O. ROSALES</p>
              <p>Barangay Secretary</p>
            </Box>
            <Box marginTop="60px">
              <p className={classes.name}>JHONATAN V. MAGSINO</p>
              <p>Barangay Treasurer</p>
            </Box>
            <Box
              position="absolute"
              textAlign="left"
              bottom="8px"
              fontSize="12px"
            >
              <p>Note: Valid only with Barangay Official Seal</p>
              <p>Certificate of Indigency Form Rev-002</p>
            </Box>
          </Box>
          <Box border="solid 1px">
            <Box position="relative" display="flex" textAlign="center">
              <Box position="relative" top="5px" left="10px">
                <Logo className={classes.logo} />
              </Box>

              <Box
                position="absolute"
                width="100%"
                top="14px"
                fontFamily="Arial, Helvetica, sans-serif"
                fontSize="14px"
                textAlign="center"
              >
                <Box>
                  <p>Republic of the Philippines</p>
                  <p>Province of Batangas</p>
                  <p>Municipality of Mabini</p>
                  <p>
                    <strong>BARANGAY STA. MESA</strong>
                  </p>
                  <Box
                    marginTop="24px"
                    fontFamily={`"Calibri", Tahoma, Geneva, Verdana, sans-serif`}
                    fontSize="19px"
                  >
                    <p>
                      <strong>OFFICE OF THE SANGGUNIANG BARANGAY</strong>
                    </p>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
              fontFamily={`"Calibri", Tahoma, Geneva, Verdana, sans-serif`}
              margin="0 auto"
              width="90%"
            >
              <Box
                fontFamily={`Tahoma, Geneva, Verdana, sans-serif`}
                marginTop="60px"
                textAlign="center"
                fontSize="24px"
              >
                <strong>CERTIFICATE OF INDIGENCY</strong>
              </Box>

              <Box fontWeight="bold" marginTop="32px">
                <p>TO WHOM IT MAY CONCERN:</p>
              </Box>
              <Box className={classes.paragraph}>
                <p>
                  This is to certify that{' '}
                  <span className={classes.field}>{`${
                    data.first_name
                  } ${data.middle_name && data.middle_name.charAt(0)}. ${
                    data.last_name
                  }`}</span>
                  , {moment().diff(data.birthdate, 'years')} years old ,{' '}
                  {gender1}, {civilStatus}, is presently residing at Barangay
                  Sta Mesa, Mabini, Batangas and personally known to me of good
                  moral character.
                </p>
              </Box>
              <Box className={classes.paragraph}>
                <p>
                  This certifies further that {gender[1]} parent(s) has no
                  permanent source of income.
                </p>
              </Box>
              <Box className={classes.paragraph}>
                <p>
                  This certificate is issued on {ordinal(moment().format('DD'))}{' '}
                  day of {moment().format('MMMM, YYYY')} upon request of{' '}
                  {gender[3]}. {data.last_name} for whatever legal purposes this
                  may serve {gender[2]} best.
                </p>
              </Box>
              <Box
                display="flex"
                justifyContent="flex-end"
                fontFamily={`"Calibri", Tahoma, Geneva, Verdana, sans-serif`}
                marginTop="48px"
                marginBottom="24px"
              >
                <Box textAlign="center">
                  <p>
                    <span className={classes.field}>
                      HON. CRISTITO I. GONZALES
                    </span>
                  </p>
                  <p>Barangay Captain</p>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    );
  }
}
export default withTheme(withStyles(useStyles)(Preview));
