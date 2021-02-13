import React, { useState, useEffect, forwardRef } from 'react';
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
const FormView = ({ className, data, onSubmit, onClose, reset, ...rest }) => {
  const classes = useStyles();
  // react hook form manager
  const { handleSubmit, setValue, control, errors } = useForm();
  // occurs when data change after fetching data
  useEffect(() => {
    if (data) {
      setValue('personRelatedWith', data.person_related_with);
      setValue('relationship', data.relationship);
      setValue('reason', data.reason);
    }
  }, [data]);
  useEffect(() => {
    if (reset) {
      setValue('personRelatedWith', '');
      setValue('relationship', '');
      setValue('reason', '');
    }
  }, [reset]);
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
                label="Person related with"
                as={TextField}
                name="personRelatedWith"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.personRelatedWith && true}
              />
            </Grid>
            <Grid item lg={4} md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Relationship"
                as={TextField}
                name="relationship"
                control={control}
                defaultValue=""
                rules={{ required: true }}
                error={errors.relationship && true}
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Reason of request"
                as={TextField}
                name="reason"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.reason && true}
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
            onClick={onClose}
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

export default FormView;
