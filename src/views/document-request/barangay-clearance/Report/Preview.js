import React, { Component } from 'react';
import './style.css';
class Preview extends Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="header">
            <div className="header__logo">
              <img
                src="images/sta_mesa_logo.png"
                alt="Logo"
                width="150"
                height="150"
              />
            </div>

            <div className="header__container">
              <div className="header__container__text">
                <p>Republic of the Philippines</p>
                <p>Province of Batangas</p>
                <p>Municipality of Mabini</p>
                <p>BARANGAY STA. MESA</p>
                <p className="header__title__text">
                  OFFICE OF THE SANGGUNIANG BARANGAY
                </p>
              </div>
            </div>
            <div class="content">
              <div class="content__title">
                <strong>CERTIFICATION / CLEARANCE</strong>
              </div>
              <div class="content__date">
                <p>_____________________</p>
                <p>Date</p>
              </div>
              <div class="content__recipient">
                <p>TO WHOM IT MAY CONCERN:</p>
              </div>
              <div class="content__paragraph">
                <p>
                  This is to certify that
                  ________________________________________, _____ years old,
                  single/married/widower and Filipino citizen is bonafide
                  resident of Barangay Sta. Mesa, Mabini, Batangas and
                  personally known to me of good moral character and law abiding
                  citizen. He/She has not been convicted to any violation of
                  laws and ordinances and does not have any existing record in
                  the barangay.
                </p>
              </div>
              <div class="content__paragraph">
                <p>
                  This Certification / Clearance is hereby issued upon the
                  request of the above subject individual in connection to
                  his/her application for________________________________ and
                  for whatever legal purposes this may serve.
                </p>
              </div>
              <div class="content__paragraph">
                <p>
                  Any favourable consideration extended to him/her will be
                  highly appreciated by the undersigned.
                </p>
              </div>

              <div class="content__sign__captain">
                <p>______________________</p>
                <p>
                  CRISTITO I. GONZALES
                  <p>Barangay Captain</p>
                </p>
              </div>
              <hr size="2" color="00000" />
              <div class="footer">
                <div class="footer__right">
                  <div class="footer__thumb">
                    <div class="footer__thumb__box"></div>
                    <p>Thumb Mark</p>
                  </div>
                </div>
                <div class="footer__left">
                  <div class="footer__doc_info">
                    <p>Res.Cert. No.______________</p>
                    <p>Date Issued:_______________</p>
                    <p>Place Issued:______________</p>
                  </div>
                  <div class="footer__sign">
                    <p>_________________________</p>
                    <p>Signature</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Preview;
