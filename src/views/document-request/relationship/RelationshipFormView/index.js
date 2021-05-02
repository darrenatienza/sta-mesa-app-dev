import React, { useState, useEffect, useRef } from 'react';
import useAxios from 'axios-hooks';
import clsx from 'clsx';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import {
  useBarangayClearanceViewState,
  useRelationship,
  useCurrentUser
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
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';
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
  const formRef = useRef();
  const [currentUser] = useCurrentUser();
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
  const [openSaveConfirmationDialog, setOpenSaveConfirmationDialog] = useState(
    false
  );
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
    } else {
      formRef.current.resetFields();
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
          person_id: currentUser.currentPersonID,
          doc_status_id: 1,
          person_related_with: data.personRelatedWith,
          relationship: data.relationship,
          reason: data.reason
        }
      });
    }
    setOpenSaveConfirmationDialog(true);
    setSelectedRelationshipID(0);
    formRef.current.resetFields();
    setShowFormView(false);
    setShowListView(true);
    setRefreshList(true);
  };
  // close form call back
  const onClose = () => {
    console.log('close');
    setShowFormView(false);
    setShowListView(true);
    setRefreshList(true);
    setRefreshList(false);
    setSelectedRelationshipID(0);
    formRef.current.resetFields();
  };

  return (
    <Box>
      <FormView
        data={data}
        onSubmit={onSubmit}
        onClose={onClose}
        ref={formRef}
      />
      <ConfirmationDialog
        open={openSaveConfirmationDialog}
        hasCancel={false}
        title="Successfully saved"
        message="Record successfully saved!"
        onClose={() => setOpenSaveConfirmationDialog(false)}
      />
    </Box>
  );
};

export default RelationshipFormView;
