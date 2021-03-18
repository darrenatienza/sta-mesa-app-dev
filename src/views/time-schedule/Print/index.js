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

  //Search base on the search query

  const handleSearch = async (month, duration, year) => {
    //splits the duration in two between hypen
    const durationArr = duration.split('-');
    // get value from first and last array
    const firstDay = durationArr[0];
    const lastDay = durationArr[1];
    // get the integer month value of selected month
    const MM = moment()
      .month(month)
      .format('MM');
    // format to correct date format
    const from = `${year}/${MM}/${firstDay}`;
    const to = `${year}/${MM}/${lastDay}`;
    console.log(from);
    console.log(to);
    //fetch data
    const { data } = await refetchList({
      params: {
        filter: `person_id,eq,${currentUser.currentPersonID}`,
        filter1: `log_date,ge,${from}`,
        filter2: `log_date,le,${to}`
      },
      paramsSerializer: params => {
        return qs.stringify(params, { arrayFormat: 'repeat' });
      }
    });
    console.log(data && data.records);
  };
  useEffect(() => {}, []);

  return (
    <div className={classes.root}>
      <Toolbar onSearch={handleSearch} />
      <PrintPreview />
    </div>
  );
};

export default Print;
