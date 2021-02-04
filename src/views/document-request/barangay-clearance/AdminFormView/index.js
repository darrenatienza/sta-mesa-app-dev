import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import clsx from 'clsx';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useBarangayClearanceViewState } from '../../../../states';
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
const AdminFormView = ({ className, ...rest }) => {
  const classes = useStyles();
  // row states
  const [affecteRows, setAffectedRows] = useState(0);

  const [docStats, setDocStats] = useState([]);
  //global state
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView }
  ] = useBarangayClearanceViewState();

  // react hook form manager
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    watch,
    errors
  } = useForm();
  // http request hooks
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/barangay_clearances/${barangayClearanceStateView.barangayClearanceID}`,
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
  // occurs when form view changes
  useEffect(() => {
    if (
      barangayClearanceStateView.showFormView &&
      barangayClearanceStateView.barangayClearanceID > 0
    ) {
      refetchDocStats();
      refetch();
    } else {
      setValue('resCertNo', '');
      setValue('dateIssued', moment().format('YYYY-MM-DD'));
      setValue('placeIssued', '');
      setValue('docStatus', '');
    }
  }, [barangayClearanceStateView.showFormView]);

  // occurs when docStatsData change after fetching data
  useEffect(() => {
    if (docStatsData) {
      setDocStats(docStatsData.records);
    }
  }, [docStatsData]);

  // occurs when data change after fetching data
  useEffect(() => {
    if (data) {
      setValue('resCertNo', data.res_cert_no);
      setValue('dateIssued', moment(data.date_issued).format('YYYY-MM-DD'));
      setValue('placeIssued', data.place_issued);
      setValue('docStatus', data.doc_status_id);
    }
  }, [data]);
  // occurs when affected rows changes
  useEffect(() => {
    setShowFormView(false);
    setShowListView(true);
    setAffectedRows(0);
  }, [affecteRows]);

  // submit form callback
  const onSubmit = async data => {
    // submit
    if (barangayClearanceStateView.barangayClearanceID > 0) {
      const { data: row } = await executePut({
        data: {
          doc_status_id: data.docStatus,
          res_cert_no: data.resCertNo,
          date_issued: data.dateIssued,
          place_issued: data.placeIssued
        }
      });
      setAffectedRows(row);
    } else {
      const { data: row } = await executePost({
        data: {
          person_id: 1,
          doc_status_id: 1,
          reason: data.reason
        }
      });
      setAffectedRows(row);
    }
  };
  // close form call back
  const handleClose = () => {
    setShowFormView(false);
    setShowListView(true);
  };

  return (
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
            <Grid item lg={8} md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Res. Cert. No."
                as={TextField}
                name="resCertNo"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.resCertNo && true}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Date Issued"
                type="date"
                as={TextField}
                name="dateIssued"
                control={control}
                rules={{ required: true }}
                defaultValue={moment().format('YYYY-MM-DD')}
                error={errors.dateIssued && true}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Placed Issued"
                as={TextField}
                name="placeIssued"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.placeIssued && true}
              />
            </Grid>
            <Grid item lg={8} md={6} xs={12}>
              <Controller
                fullWidth
                select
                variant="outlined"
                label="Document Status"
                as={TextField}
                name="docStatus"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.docStatus && true}
              >
                {docStats.length ? (
                  docStats.map(option => (
                    <MenuItem
                      key={option.doc_status_id}
                      value={option.doc_status_id}
                    >
                      {option.name}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem key={0}>Loading...</MenuItem>
                )}
              </Controller>
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
  );
};

export default AdminFormView;
