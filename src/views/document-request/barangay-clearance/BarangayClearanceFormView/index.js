import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Collapse,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Details from './Details';
import useAxios from 'axios-hooks';
import moment from 'moment';
import { useBarangayClearanceViewState } from '../../../../states';

import { setAvatar } from 'src/states/official';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  progress: {
    margin: 10
  }
}));

const BarangayClearanceFormView = () => {
  const classes = useStyles();

  const [persons, setPersons] = useState([]);
  const [detail, setDetail] = useState({
    personID: '',
    reason: '',
    requestDate: moment().format('YYYY-MM-DD'),
    resCertNo: '',
    dateIssued: moment().format('YYYY-MM-DD'),
    docStatusID: ''
  });
  const [
    barangayClearanceViewState,
    { setShowFormView, setShowListView }
  ] = useBarangayClearanceViewState();

  // fetch list of persons from database
  const [
    {
      data: getpersonsData,
      loading: getpersonsLoading,
      error: getpersonsError
    },
    refetchpersons
  ] = useAxios(`/records/persons`);

  // fetch barangay clearance data from database
  const [
    {
      data: getBarangayClearanceData,
      loading: getBarangayClearnceDataLoading,
      error: getBarangayClearnceDataError
    },
    refetchBarangayClearance
  ] = useAxios(
    {
      url: `/records/barangay_clearances/${barangayClearanceViewState.barangayClearanceID}`,
      method: 'GET'
    },
    { manual: true }
  );
  useEffect(() => {
    getpersonsData && setPersons(getpersonsData.records);
  }, [getpersonsData]);

  useEffect(() => {
    if (barangayClearanceViewState.showFormView) {
      if (barangayClearanceViewState.barangayClearanceID > 0) {
        refetchBarangayClearance();
      }
    }
  }, [barangayClearanceViewState.showFormView]);

  useEffect(() => {
    setTimeout(() => {
      getBarangayClearanceData &&
        setDetail({
          ...detail,
          personID: getBarangayClearanceData.person_id,
          reason: getBarangayClearanceData.reason,
          requestDate: getBarangayClearanceData.request_date,
          resCertNo: getBarangayClearanceData.res_cert_no,
          dateIssued: getBarangayClearanceData.date_issued,
          docStatusID: getBarangayClearanceData.doc_status_id
        });
    });
  }, [getBarangayClearanceData]);
  return (
    <Container maxWidth="lg">
      <Details detail={detail && detail} persons={persons} />
    </Container>
  );
};

export default BarangayClearanceFormView;
