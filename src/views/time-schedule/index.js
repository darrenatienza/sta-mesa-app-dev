import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { makeStyles } from '@material-ui/core';
import Toolbar from './Toolbar';
import Page from 'src/components/Page';
import Details from './Details';
import Results from './Results';
import moment from 'moment';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));
const TimeScheduleView = () => {
  const classes = useStyles();
  const [currentID, setCurrentID] = useState(0);
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
      url: `/records/time_schedules?filter=person_id,eq,${1}&filter=log_date,ge,${
        dateSearch.dateFrom
      }&filter=log_date,le,${dateSearch.dateTo}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const [{ data: data, loading: loading, error: error }, refetch] = useAxios(
    {
      url: `/records/time_schedules?filter=person_id,eq,${1}&filter=log_date,eq,${moment().format(
        'YYYY-MM-DD'
      )}`,
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
    await executePost({
      data: {
        // time in not required to provide json value because it is auto generated once
        // the record created
        person_id: 1
      }
    });
    await refetchList();
    await refetch();
  };
  const onTimeOut = async () => {
    await executePut({
      data: {
        time_out: moment().format(sqlDateTimeFormat),
        has_time_out: 1
      }
    });
    await refetchList();
    await refetch();
  };
  return (
    <Page className={classes.root} title="Time Schedules">
      <Details
        details={data && data.records[0]}
        onTimeIn={onTimeIn}
        onTimeOut={onTimeOut}
      />
      <Toolbar onSearch={onSearch} />
      <Results list={listData ? listData.records : []} />
    </Page>
  );
};

export default TimeScheduleView;