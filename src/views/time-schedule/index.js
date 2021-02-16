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
  const [dateSearch, setDateSearch] = useState({
    dateFrom: moment().format('YYYY-MM-DD'),
    dateTo: moment()
      .add(1, 'day')
      .format('YYYY-MM-DD')
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
  useEffect(() => {
    listData && console.log(listData);
  }, [listData]);

  useEffect(() => {
    console.log(dateSearch);
    refetchList();
  }, [dateSearch.dateFrom, dateSearch.dateTo]);

  const onSearch = (dateFrom, dateTo) => {
    setDateSearch({
      dateFrom: dateFrom,
      dateTo: dateTo
    });
  };

  return (
    <Page className={classes.root} title="Time Schedules">
      <Details details={data && data.records[0]} />
      <Toolbar onSearch={onSearch} />
      <Results list={listData ? listData.records : []} />
    </Page>
  );
};

export default TimeScheduleView;
