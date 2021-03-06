import React, { useState, useEffect } from 'react';
import useAxios from 'axios-hooks';
import clsx from 'clsx';
import _ from 'lodash/fp';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
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
const Form = ({
  className,
  data,
  documentStatusList,
  onSubmit,
  onClose,
  isAdmin,
  ...rest
}) => {
  const classes = useStyles();

  // react hook form manager
  const {
    register,
    handleSubmit: formSubmit,
    reset,
    setValue,
    control,
    watch,
    errors
  } = useForm();

  useEffect(() => {
    if (data) {
      console.log(data);
      setValue('reason', data.reason);
      setValue('resCertNo', data.res_cert_no);
      setValue('dateIssued', moment(data.date_issued).format('YYYY-MM-DD'));
      setValue('placeIssued', data.place_issued);
      setValue('docStatus', data.doc_status_id);
    }
  }, [data]);
  const handleSubmit = data => {
    onSubmit(data);
    resetFields();
  };
  const handleClose = () => {
    onClose();
    resetFields();
  };
  const resetFields = () => {
    setValue('reason', '');
    setValue('resCertNo', '');
    setValue('dateIssued', moment().format('YYYY-MM-DD'));
    setValue('placeIssued', '');
    setValue('docStatus', 0);
  };
  return (
    <form
      onSubmit={formSubmit(handleSubmit)}
      autoComplete="off"
      noValidate
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader title="Barangay Clearance Request Detail" />
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
                error={errors.reason && true}
              />
            </Grid>

            {isAdmin && (
              <>
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
                    defaultValue={0}
                    error={errors.docStatus && true}
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option value={0}>Select Document Status...</option>
                    {documentStatusList &&
                      documentStatusList.records.map(option => (
                        <option
                          key={option.doc_status_id}
                          value={option.doc_status_id}
                        >
                          {option.name}
                        </option>
                      ))}
                  </Controller>
                </Grid>
              </>
            )}
          </Grid>
        </CardContent>
        <Divider />

        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button
            color="primary"
            variant="outlined"
            className={classes.cancelButton}
            onClick={() => handleClose()}
          >
            Cancel
          </Button>
          <Button color="primary" variant="contained" type="submit">
            Confirm
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default Form;
