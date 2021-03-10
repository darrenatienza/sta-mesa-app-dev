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
  root: { marginTop: '5px', maxWidth: '768px' },
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
        setValue('personRelatedWith', data.person_related_with);
        setValue('reason', data.reason);
      }
    }, [data]);
    useEffect(() => {
      if (reset) {
      }
    }, [reset]);
    useImperativeHandle(ref, () => ({
      resetFields() {
        setValue('personRelatedWith', '');
        setValue('reason', '');
      }
    }));
    return (
      <div className={classes.root}>
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
              title="Relationship Request Detail"
            />
            <Divider />

            <CardContent>
              <Box mb={3}>
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
              </Box>
              <Box mb={3}>
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
              </Box>
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
      </div>
    );
  }
);

export default FormView;
