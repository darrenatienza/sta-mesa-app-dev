import { Card, CardContent } from '@material-ui/core';
import React, { Component } from 'react';

const Preview = () => {
  return (
    <div>
      <Card>
        <CardContent>asdfasdf</CardContent>
      </Card>
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
          <div className="content">
            <div className="content__title">
              <strong>CERTIFICATION / CLEARANCE</strong>
            </div>
            <div className="content__date">
              <p>_____________________</p>
              <p>Date</p>
            </div>
            <div className="content__recipient">
              <p>TO WHOM IT MAY CONCERN:</p>
            </div>
            <div className="content__paragraph">
              <p>
                This is to certify that
                ________________________________________, _____ years old,
                single/married/widower and Filipino citizen is bonafide resident
                of Barangay Sta. Mesa, Mabini, Batangas and personally known to
                me of good moral character and law abiding citizen. He/She has
                not been convicted to any violation of laws and ordinances and
                does not have any existing record in the barangay.
              </p>
            </div>
            <div className="content__paragraph">
              <p>
                This Certification / Clearance is hereby issued upon the request
                of the above subject individual in connection to his/her
                application for________________________________ and for whatever
                legal purposes this may serve.
              </p>
            </div>
            <div className="content__paragraph">
              <p>
                Any favourable consideration extended to him/her will be highly
                appreciated by the undersigned.
              </p>
            </div>

            <div className="content__sign__captain">
              <p>______________________</p>
              <p>CRISTITO I. GONZALES</p>
              <p>Barangay Captain</p>
            </div>
            <hr size="2" color="00000" />
            <div className="footer">
              <div className="footer__right">
                <div className="footer__thumb">
                  <div className="footer__thumb__box"></div>
                  <p>Thumb Mark</p>
                </div>
              </div>
              <div className="footer__left">
                <div className="footer__doc_info">
                  <p>Res.Cert. No.______________</p>
                  <p>Date Issued:_______________</p>
                  <p>Place Issued:______________</p>
                </div>
                <div className="footer__sign">
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
};

export default Preview;
