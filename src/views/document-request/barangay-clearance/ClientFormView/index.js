import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import clsx from 'clsx';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import {
  useBarangayClearanceViewState,
  useCurrentUser
} from '../../../../states';

import Form from './Form';

const ClientFormView = ({ className, ...rest }) => {
  //global state
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView }
  ] = useBarangayClearanceViewState();
  const [currentUser, { isValidRole }] = useCurrentUser();
  const [isAdmin] = useState(isValidRole('admin'));
  // http request hooks
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/barangay_clearances/${barangayClearanceStateView.barangayClearanceID}`,
      method: 'GET'
    },
    {
      manual: !barangayClearanceStateView.barangayClearanceID
    }
  );
  const [
    { data: docStatusData, loading: docStatusLoading, error: docStatusError },
    refetchDocStatus
  ] = useAxios(
    {
      url: `/records/doc_statuses`,
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
    { url: `/records/barangay_clearances`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/barangay_clearances/${barangayClearanceStateView.barangayClearanceID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );

  // submit form callback
  const onSubmit = async data => {
    // submit
    if (barangayClearanceStateView.barangayClearanceID > 0) {
      await executePut({
        data: {
          reason: data.reason,
          doc_status_id: data.docStatus,
          res_cert_no: data.resCertNo,
          date_issued: data.dateIssued,
          place_issued: data.placeIssued
        }
      });
    } else {
      await executePost({
        data: {
          person_id: currentUser.currentPersonID,
          doc_status_id: 1,
          reason: data.reason
        }
      });
    }
    setShowFormView(false);
    setShowListView(true);
  };

  // close form call back
  const onClose = () => {
    setShowFormView(false);
    setShowListView(true);
  };
  return (
    <Form
      data={data}
      onClose={onClose}
      onSubmit={onSubmit}
      isAdmin={isAdmin}
      documentStatusList={docStatusData}
    />
  );
};

export default ClientFormView;
