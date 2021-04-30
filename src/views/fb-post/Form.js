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

const ProfileDetails = ({
  className,
  medicine,
  onSave,
  onCloseForm,
  ...rest
}) => {
  const classes = useStyles();
  // react hook form manager
  const { handleSubmit, setValue, control, errors } = useForm();

  const onSubmit = data => {
    onSave(data);
    resetForm();
  };
  const onClose = () => {
    resetForm();
    onCloseForm();
  };
  const resetForm = () => {
    setValue('message', '');
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
          subheader="Write your new posts"
          title="Your new Fb Posts"
        />
        <Divider />
        <CardContent>
          <Controller
            fullWidth
            variant="outlined"
            label="Posts"
            as={TextField}
            name="message"
            multiline
            control={control}
            rules={{ required: true }}
            defaultValue=""
            error={errors.resCertNo && true}
            rows={4}
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Box mr={1}>
            <Button color="primary" variant="outlined" onClick={onClose}>
              Close
            </Button>
          </Box>

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
