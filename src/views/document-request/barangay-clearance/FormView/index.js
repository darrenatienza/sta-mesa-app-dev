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
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';
import hasValidRole from 'src/utils/hasValidRole';

const FormView = ({ className, ...rest }) => {
  //global state
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView, setRefreshList, setBarangayClearanceID }
  ] = useBarangayClearanceViewState();
  // state - global
  const [currentUser, { isValidRole }] = useCurrentUser();
  // state - admin
  const [isAdmin] = useState(isValidRole('admin'));

  const [openSaveConfirmationDialog, setOpenSaveConfirmationDialog] = useState(
    false
  );
  // http - get barangay clearance list
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/barangay_clearances/${barangayClearanceStateView.barangayClearanceID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );

  // http - post
  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    { url: `/records/barangay_clearances`, method: 'POST' },
    {
      manual: true
    }
  );
  // http - put
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
  useEffect(() => {
    let isAdmin = hasValidRole('admin');
    console.log(isAdmin);
  }, []);
  // occurs when the id is greater has change
  useEffect(() => {
    barangayClearanceStateView.barangayClearanceID > 0 &&
      barangayClearanceStateView.showFormView &&
      refetch();
  }, [barangayClearanceStateView.barangayClearanceID]);

  // callback - submit
  const onSubmit = async data => {
    // submit
    if (barangayClearanceStateView.barangayClearanceID > 0) {
      if (isAdmin) {
        await executePut({
          data: {
            reason: data.reason,
            res_cert_no: data.resCertNo,
            date_issued: data.dateIssued,
            place_issued: data.placeIssued
          }
        });
      } else {
        await executePut({
          data: {
            reason: data.reason
          }
        });
      }
    } else {
      if (isAdmin) {
        await executePost({
          data: {
            person_id: currentUser.currentPersonID,
            reason: data.reason,
            res_cert_no: data.resCertNo,
            date_issued: data.dateIssued,
            place_issued: data.placeIssued
          }
        });
      } else {
        await executePost({
          data: {
            person_id: currentUser.currentPersonID,
            reason: data.reason
          }
        });
      }
    }
    setOpenSaveConfirmationDialog(true);
    setRefreshList(true);
    onClose();
  };

  //callback - close
  const onClose = () => {
    setShowFormView(false);
    setShowListView(true);
    setBarangayClearanceID(0);
  };

  return (
    <>
      <Form
        data={data}
        onClose={onClose}
        onSubmit={onSubmit}
        isAdmin={isAdmin}
      />
      <ConfirmationDialog
        open={openSaveConfirmationDialog}
        hasCancel={false}
        title="Successfully saved"
        message="Record successfully saved!"
        onClose={() => setOpenSaveConfirmationDialog(false)}
      />
    </>
  );
};

export default FormView;
