import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import clsx from 'clsx';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import {
  useBarangayClearanceViewState,
  useRelationship
} from '../../../../states';
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
const RelationshipFormView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [reset, setReset] = useState(false);
  //global state
  const [
    relationship,
    {
      setSelectedRelationshipID,
      setShowFormView,
      setShowListView,
      setRefreshList
    }
  ] = useRelationship();

  // http request hooks
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/relationships/${relationship.selectedRelationshipID}`,
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
    { url: `/records/relationships`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/relationships/${relationship.selectedRelationshipID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );
  // occurs when form view changes
  useEffect(() => {
    if (relationship.selectedRelationshipID > 0) {
      refetch();
    }
  }, [relationship.selectedRelationshipID]);

  // submit form callback
  const onSubmit = async data => {
    // submit
    if (relationship.selectedRelationshipID > 0) {
      const { data: row } = await executePut({
        data: {
          person_related_with: data.personRelatedWith,
          relationship: data.relationship,
          reason: data.reason
        }
      });
    } else {
      const { data: row } = await executePost({
        data: {
          person_id: 1,
          doc_status_id: 1,
          person_related_with: data.personRelatedWith,
          relationship: data.relationship,
          reason: data.reason
        }
      });
    }
    setReset(true);
    setReset(false);
    setRefreshList(true);
    setRefreshList(false);
  };
  // close form call back
  const onClose = () => {
    setShowFormView(false);
    setShowListView(true);

    setRefreshList(true);
    setRefreshList(false);
  };

  return (
    <FormView data={data} onSubmit={onSubmit} onClose={onClose} reset={reset} />
  );
};

export default RelationshipFormView;
