import React, {
  useState,
  useEffect,
  forwardRef,
  useImperativeHandle
} from 'react';
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
const FormView = forwardRef(
  ({ className, data, onSubmit, onClose, reset, ...rest }, ref) => {
    const classes = useStyles();
    // react hook form manager
    const { handleSubmit, setValue, control, errors } = useForm();
    // occurs when data change after fetching data
    useEffect(() => {
      if (data) {
        setValue('residingSpan', data.residing_span);
      }
    }, [data]);
    useEffect(() => {
      if (reset) {
      }
    }, [reset]);
    useImperativeHandle(ref, () => ({
      resetFields() {
        setValue('residingSpan', '');
      }
    }));
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
                  label="Residing Span"
                  as={TextField}
                  name="residingSpan"
                  control={control}
                  rules={{ required: true }}
                  defaultValue=""
                  error={errors.residingSpan && true}
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
  }
);

export default FormView;
