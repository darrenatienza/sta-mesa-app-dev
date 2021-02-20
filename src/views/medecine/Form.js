import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ProfileDetails = ({ className, medicine, onSave, ...rest }) => {
  const classes = useStyles();
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

  useEffect(() => {
    if (medicine) {
      setValue('name', medicine.name);
      setValue('description', medicine.description);
      setValue('quantity', medicine.quantity);
    }
  }, [medicine]);
  const onSubmit = data => {
    setValue('name', '');
    setValue('description', '');
    setValue('quantity', '');
    onSave(data);
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
          title="Medicine Information"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Medicine Name"
                as={TextField}
                name="name"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.resCertNo && true}
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Description"
                as={TextField}
                name="description"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.resCertNo && true}
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Quantity"
                type="number"
                as={TextField}
                name="quantity"
                control={control}
                rules={{ required: true }}
                defaultValue=""
                error={errors.resCertNo && true}
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Card>
    </form>
  );
};

ProfileDetails.propTypes = {
  className: PropTypes.string
};

export default ProfileDetails;
