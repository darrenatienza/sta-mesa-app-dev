import React, { useState, useEffect, useRef } from 'react';
import useAxios from 'axios-hooks';
import clsx from 'clsx';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useResidency } from '../../../../states';
import FormView from './FormView';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  Checkbox,
  makeStyles,
  Typography
} from '@material-ui/core';
const useStyles = makeStyles(() => ({
  root: { marginTop: '5px' },
  cancelButton: {
    marginRight: '10px'
  },
  title2: {
    marginTop: '10px'
  }
}));
const ResidencyFormView = ({ className, ...rest }) => {
  const classes = useStyles();
  const formRef = useRef();
  const [reset, setReset] = useState(false);
  //global state
  const [
    residency,
    { setSelectedResidencyID, setShowFormView, setShowListView, setRefreshList }
  ] = useResidency();

  // http request hooks
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/residencies/${residency.selectedResidencyID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    { url: `/records/residencies`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/residencies/${residency.selectedResidencyID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );
  // occurs when form view changes
  useEffect(() => {
    if (residency.selectedResidencyID > 0) {
      refetch();
    } else {
      formRef.current.resetFields();
    }
  }, [residency.selectedResidencyID]);

  // submit form callback
  const onSubmit = async data => {
    // submit
    if (residency.selectedResidencyID > 0) {
      const { data: row } = await executePut({
        data: {
          residing_span: data.residingSpan
        }
      });
    } else {
      const { data: row } = await executePost({
        data: {
          person_id: 1,
          doc_status_id: 1,
          residing_span: data.residingSpan
        }
      });
    }
    setSelectedResidencyID(0);
    formRef.current.resetFields();
    setShowFormView(false);
    setShowListView(true);
    setRefreshList(true);
    setRefreshList(false);
  };
  // close form call back
  const onClose = () => {
    console.log('close');
    setShowFormView(false);
    setShowListView(true);
    setRefreshList(true);
    setRefreshList(false);
    setSelectedResidencyID(0);
    formRef.current.resetFields();
  };

  return (
    <FormView data={data} onSubmit={onSubmit} onClose={onClose} ref={formRef} />
  );
};

export default ResidencyFormView;
