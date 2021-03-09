import { Box } from '@material-ui/core';
import { withStyles, withTheme } from '@material-ui/core/styles';
import React, { Component } from 'react';
import Logo from 'src/components/Logo';

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
  field: { textDecoration: 'underline', fontWeight: 'bold' },
  name: { fontWeight: 'bold' }
});
class Preview extends Component {
  render() {
    const { classes, data } = this.props;
    return (
      <Box display="flex">
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
            <p class="side__position">Barangay Chairman</p>
          </Box>

          <Box marginTop="60px">
            <p>
              <strong>SB MEMBER</strong>
            </p>

            <Box marginTop="30px" textAlign="left" fontWeight="bold">
              <p class="side__name">HON. JONARD M. ORTEGA</p>
              <p class="side__name">HON. AILEEN A. MATIRA</p>
              <p class="side__name">HON. JUAN D. ALOLOD</p>
              <p class="side__name">HON. PLACIDO A. ORTEGA</p>
              <p class="side__name">HON. LUCILO O. INGCO</p>
              <p class="side__name">HON. ROMULO O. MACALALAD</p>
              <p class="side__name">HON. GERARDO I. MAUHAY</p>
            </Box>
          </Box>

          <div class="side__official">
            <p class="side__name">HON. KIM DENZEL G. HERNANDEZ</p>
            <p class="side__position">SK Chairman</p>
          </div>
          <div class="side__official">
            <p class="side__name">BRENDALYN O. ROSALES</p>
            <p class="side__position">Barangay Secretary</p>
          </div>
          <div class="side__official">
            <p class="side__name">JHONATAN V. MAGSINO</p>
            <p class="side__position">Barangay Treasurer</p>
          </div>
          <div class="side__footer">
            <p>Note: Valid only with Barangay Official Seal</p>
            <p>Certificate of Indigency Form Rev-002</p>
          </div>
        </Box>
        <div class="main">
          <div class="header">
            <div class="header__logo">
              <Logo />
            </div>

            <div class="header__container">
              <div class="header__container__text">
                <p>Republic of the Philippines</p>
                <p>Province of Batangas</p>
                <p>Municipality of Mabini</p>
                <p>
                  <strong>BARANGAY STA. MESA</strong>
                </p>
                <div class="header__title__text">
                  <p>
                    <strong>OFFICE OF THE SANGGUNIANG BARANGAY</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="content">
            <div class="content__title">
              <strong>BUSINESS CLEARANCE</strong>
            </div>

            <div class="content__recipient">
              <p>TO WHOM IT MAY CONCERN:</p>
            </div>
            <div class="content__paragraph">
              <p>
                This is to certify that{' '}
                <span style={{ textDecoration: 'underline' }}>
                  CONVERGE ICT Solutions, INC.
                </span>{' '}
                of NO. 99 E. RODRIGUEZ JR. AVE. BRGY. UGONG PASIG CITY PHIL. Is
                engaged/will be engaged in{' '}
                <span style={{ textDecoration: 'underline' }}>
                  LINE INSTALLATION, SURVEY, INSTALL POLE ERECTION{' '}
                </span>{' '}
                business/commercial Activity/ties under the business name of
                CONVERGE ICT sOLUTIONS, INC.at Sta.Mesa,Mabini,Batangas.
              </p>
            </div>
            <div class="content__paragraph">
              <p>BARANGAY CLEARANCE IS HEREBY GRANTED</p>
            </div>
            <div class="content__paragraph">
              <p>
                To the above mentioned business establishment after having duly
                paid appropriate barangay clearance/permit fees in compliance to
                all pertinent barangay ordinances,policies,rules and
                regulations.
              </p>
            </div>
            <div class="content__paragraph">
              <p>
                Issued this 6th day of November,2019 at Barangay
                Sta.Mesa,Mabini,Batangas upon the request of the herein grantee.
              </p>
            </div>
            <div class="content__sign__captain">
              <div class="content__sign__captain__content">
                <p style={{ textDecoration: 'underline' }}>
                  <strong>HON. CRISTITO I. GONZALES</strong>
                </p>
                <p>Barangay Captain</p>
              </div>
            </div>
            <div class="content_footer">
              <p>Paid under O.R no.________________</p>
              <p>At Barangay Sta. Mesa, Mabini, Batangas</p>
              <p>
                <i>On November 6, 2019</i>
              </p>
            </div>
          </div>
        </div>
      </Box>
    );
  }
}
export default withTheme(withStyles(useStyles)(Preview));
