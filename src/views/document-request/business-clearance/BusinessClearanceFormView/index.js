import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import clsx from 'clsx';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useBusinessClearanceViewState } from '../../../../states';
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';
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
const BusinessClearanceFormView = ({ className, ...rest }) => {
  const classes = useStyles();

  //global state
  const [
    businessClearanceViewState,
    {
      setSelectedBusinessClearanceID,
      setShowFormView,
      setShowListView,
      setRefreshList
    }
  ] = useBusinessClearanceViewState();
  const [openSaveConfirmationDialog, setOpenSaveConfirmationDialog] = useState(
    false
  );
  // react hook form manager
  const { handleSubmit, setValue, control, errors } = useForm();
  // http request hooks
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/business_clearances/${businessClearanceViewState.selectedBusinessClearanceID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  const [
    { data: docStatsData, loading: docStatsLoading, error: docStatsError },
    refetchDocStats
  ] = useAxios(`/records/doc_statuses`);

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    { url: `/records/business_clearances`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/business_clearances/${businessClearanceViewState.selectedBusinessClearanceID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );
  // occurs when form view changes
  useEffect(() => {
    if (businessClearanceViewState.selectedBusinessClearanceID > 0) {
      refetch();
    } else {
      setValue('businessName', '');
      setValue('businessAddress', '');
      setValue('businessEngagement', '');

      setValue('orNumber', '');
    }
  }, [businessClearanceViewState.selectedBusinessClearanceID]);

  // occurs when data change after fetching data
  useEffect(() => {
    if (data) {
      setValue('businessName', data.name);
      setValue('businessAddress', data.address);
      setValue('businessEngagement', data.business_nature);
      setValue('orNumber', data.or_number);
    }
  }, [data]);

  // submit form callback
  const onSubmit = async data => {
    // submit
    if (businessClearanceViewState.selectedBusinessClearanceID > 0) {
      await executePut({
        data: {
          doc_status_id: data.docStatus,
          name: data.businessName,
          address: data.businessAddress,
          business_nature: data.businessEngagement,
          or_number: data.orNumber
        }
      });
    } else {
      await executePost({
        data: {
          doc_status_id: data.docStatus,
          name: data.businessName,
          address: data.businessAddress,
          business_nature: data.businessEngagement,
          or_number: data.orNumber
        }
      });
    }
    setOpenSaveConfirmationDialog(true);
    reloadList();
    handleClose();
  };
  const reloadList = () => {
    setRefreshList(true);
    setRefreshList(false);
  };
  // close form call back
  const handleClose = () => {
    setShowFormView(false);
    setShowListView(true);
    setSelectedBusinessClearanceID(0);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        autoComplete="off"
        noValidate
        className={clsx(classes.root, className)}
        {...rest}
      >
        <Card>
          <CardHeader
            subheader="The information can be edited"
            title="Barangay Clearance Request Detail"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item lg={12} md={6} xs={12}>
                <Controller
                  fullWidth
                  variant="outlined"
                  label="Business Name"
                  as={TextField}
                  name="businessName"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  error={errors.businessName && true}
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Controller
                  fullWidth
                  variant="outlined"
                  label="Business Address"
                  as={TextField}
                  name="businessAddress"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  error={errors.businessAddress && true}
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Controller
                  fullWidth
                  variant="outlined"
                  label="Business Engagement"
                  as={TextField}
                  name="businessEngagement"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  error={errors.businessEngagement && true}
                />
              </Grid>
              <Grid item lg={4} md={6} xs={12}>
                <Controller
                  fullWidth
                  variant="outlined"
                  label="OR Number"
                  as={TextField}
                  name="orNumber"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  error={errors.orNumber && true}
                />
              </Grid>
            </Grid>
          </CardContent>
          <Divider />

          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              variant="outlined"
              className={classes.cancelButton}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button color="primary" variant="contained" type="submit">
              {postLoading || putLoading ? `Loading...` : `Confirm`}
            </Button>
          </Box>
        </Card>
      </form>
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

export default BusinessClearanceFormView;
