import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Collapse, Container, makeStyles } from '@material-ui/core';
import Toolbar from './Toolbar';
import Page from 'src/components/Page';
import Details from './Details';
import Results from './Results';
import moment from 'moment';
import { useCurrentUser, useTimeScheduleViewState } from 'src/states';
import PrintPreview from './Print/PrintPreview';
import Print from './Print';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  alert: {
    marginBottom: '10px'
  }
}));
const TimeScheduleView = () => {
  const classes = useStyles();
  // retrieved the current id of time schedules of current person login
  const [currentID, setCurrentID] = useState(0);
  const [currentUser] = useCurrentUser();
  const [
    showTimeOutNotPermittedAlert,
    setShowTimeOutNotPermittedAlert
  ] = useState(false);
  const [
    timeScheduleViewState,
    { setShowPrintPreview, setShowMainView }
  ] = useTimeScheduleViewState();
  const sqlDateTimeFormat = 'YYYY-MM-DD HH:mm:ss';
  const sqlDateFormat = 'YYYY-MM-DD';
  const [dateSearch, setDateSearch] = useState({
    dateFrom: moment().format(sqlDateFormat),
    dateTo: moment().format(sqlDateFormat)
  });

  const [
    { data: listData, loading: listLoading, error: listError },
    refetchList
  ] = useAxios(
    {
      url: `/records/time_schedules?filter=person_id,eq,${currentUser.currentPersonID}&filter=log_date,ge,${dateSearch.dateFrom}&filter=log_date,le,${dateSearch.dateTo}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const [{ data: data, loading: loading, error: error }, refetch] = useAxios(
    {
      url: `/records/time_schedules?filter=person_id,eq,${
        currentUser.currentPersonID
      }&filter=log_date,eq,${moment().format('YYYY-MM-DD')}`,
      method: 'GET'
    },
    {
      manual: false
    }
  );
  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    {
      url: `/records/time_schedules`,
      method: 'POST'
    },
    {
      manual: true
    }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/time_schedules/${currentID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );

  useEffect(() => {
    //listData && console.log(listData);
  }, [listData]);

  useEffect(() => {
    //console.log(dateSearch);
    refetchList();
  }, [dateSearch.dateFrom, dateSearch.dateTo]);
  useEffect(() => {
    if (data && data.records.length > 0) {
      setCurrentID(data.records[0].time_schedule_id);
    }
  }, [data]);
  const onSearch = (dateFrom, dateTo) => {
    setDateSearch({
      dateFrom: dateFrom,
      dateTo: dateTo
    });
  };
  const onTimeIn = async () => {
    console.log('timein');
    await executePost({
      data: {
        // time in not required to provide json value because it is auto generated once
        // the record created
        time_in: moment().format(sqlDateTimeFormat),
        person_id: currentUser.currentPersonID
      }
    });
    await refetchList();
    await refetch();
  };
  const onTimeOut = async () => {
    if (validToTimeOut()) {
      await executePut({
        data: {
          time_out: moment().format(sqlDateTimeFormat),
          has_time_out: 1
        }
      });
      await refetchList();
      await refetch();
      setShowTimeOutNotPermittedAlert(false);
    } else {
      setShowTimeOutNotPermittedAlert(true);
    }
  };
  const validToTimeOut = () => {
    // must be 5hours duration to logout
    const timeIn = data && data.records[0].time_in;
    var duration = moment.duration(moment().diff(timeIn));
    var hours = duration.asHours();
    return hours < 5 ? false : true;
  };
  const handlePrintPreview = () => {
    setShowPrintPreview(true);
    setShowMainView(false);
  };
  const handleOnBack = () => {
    setShowPrintPreview(false);
    setShowMainView(false);
  };
  return (
    <Page className={classes.root} title="Time Schedules">
      <Container maxWidth={false}>
        <Collapse in={timeScheduleViewState.showMainView}>
          {showTimeOutNotPermittedAlert && (
            <Alert
              severity="error"
              className={classes.alert}
              onClose={() => setShowTimeOutNotPermittedAlert(false)}
            >
              The time duration to time out is minimum of 5 hours!
            </Alert>
          )}
          <Details
            details={data && data.records[0]}
            onTimeIn={onTimeIn}
            onTimeOut={onTimeOut}
          />
          <Toolbar onSearch={onSearch} onBack={handleOnBack} />
          <Results
            list={listData ? listData.records : []}
            onPrintPreview={handlePrintPreview}
          />
        </Collapse>
        <Collapse in={timeScheduleViewState.showPrintPreview}>
          <Print />
        </Collapse>
      </Container>
    </Page>
  );
};

export default TimeScheduleView;
