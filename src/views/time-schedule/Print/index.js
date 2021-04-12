import React, { useEffect, useState } from 'react';
import useAxios from 'axios-hooks';
import { Card, Collapse, Container, makeStyles } from '@material-ui/core';

import moment from 'moment';
import { useCurrentUser } from 'src/states';
import PrintPreview from './PrintPreview';
import Toolbar from './Toolbar';
import qs from 'qs';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Print = () => {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const [logRecords, setLogRecords] = useState([]);
  const [
    { data: listData, loading: listLoading, error: listError },
    refetchList
  ] = useAxios(
    {
      url: `/records/time_schedules`,
      method: 'GET'
    },
    {
      manual: true
    }
  );

  const getDaysOfMonth = (month, year, lastDay, firstDay) => {
    let arrDays = [];

    for (let index = firstDay; index <= lastDay; index++) {
      const current = moment()
        .month(month)
        .year(year)
        .date(index);

      arrDays.push(current.format('YYYY-MM-DD'));
    }

    return arrDays.sort((a, b) => b - a);
  };

  //Search base on the search query
  const handleSearch = async (month, duration, year) => {
    if (month && year && duration) {
      console.log('val ' + duration);
      //splits the duration in two between hypen
      const durationArr = duration.split('-');
      // get value from first and last array
      const firstDay = durationArr[0];
      const lastDay = durationArr[1];
      console.log(lastDay);
      // get the integer month value of selected month
      const MM = moment()
        .month(month)
        .format('MM');
      // format to correct date format
      const from = `${year}/${MM}/${firstDay}`;
      const to = `${year}/${MM}/${lastDay}`;
      //fetch data
      const { data } = await refetchList({
        url: `/records/time_schedules?filter=${currentUser.currentPersonID}&filter=log_date,ge,${from}&filter=log_date,le,${to}`
      });

      // loop through last day of selected duration
      const dateList = getDaysOfMonth(month, year, lastDay, firstDay);
      setLogRecords([]);
      dateList.forEach(date => {
        const logs = data.records.filter(x => x.log_date.includes(date));

        if (logs.length > 0) {
          const logDate = date;
          const timeIn = logs[0].time_in;
          const timeOut = logs[0].time_out;
          const has_time_out = logs[0].has_time_out;
          console.log(has_time_out);
          setLogRecords(logRecords => [
            ...logRecords,
            {
              logDate: logDate,
              timeIn: timeIn,
              timeOut: timeOut,
              has_time_out: has_time_out
            }
          ]);
        } else {
          setLogRecords(logRecords => [
            ...logRecords,
            {
              logDate: date,
              timeIn: '',
              timeOut: ''
            }
          ]);
        }
      });
    }
  };

  return (
    <div className={classes.root}>
      <Toolbar onSearch={handleSearch} />
      <PrintPreview logRecords={logRecords} />
    </div>
  );
};

export default Print;
