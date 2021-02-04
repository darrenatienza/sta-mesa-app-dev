import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import clsx from 'clsx';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { useBarangayClearanceViewState } from '../../../../states';
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
const ClientFormView = ({ className, ...rest }) => {
  const classes = useStyles();
  // row states
  const [affecteRows, setAffectedRows] = useState(0);
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
      refetch();
    } else {
      setValue('reason', '');
    }
  }, [barangayClearanceStateView.showFormView]);
  // occurs when data change after fetching data
  useEffect(() => {
    if (data) {
      setValue('reason', data.reason);
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
        data: { reason: data.reason }
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
            <Grid item md={12} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Reason of Request"
                as={TextField}
                name="reason"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.reason}
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
  );
};

export default ClientFormView;
