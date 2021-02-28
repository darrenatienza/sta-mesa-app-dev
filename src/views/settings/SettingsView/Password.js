import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  makeStyles
} from '@material-ui/core';
import { useForm, Controller } from 'react-hook-form';
import { Alert } from '@material-ui/lab';
const useStyles = makeStyles({
  root: {}
});

const Password = ({
  className,
  onUpdate,
  isError,
  isLoading,
  isSuccess,
  ...rest
}) => {
  const classes = useStyles();
  const methods = useForm();
  const { handleSubmit, control, setError, errors, setValue, reset } = methods;
  const onSubmit = data => {
    if (data.password !== data.confirm) {
      setError('password', { shouldFocus: true });
      setError('confirm', { shouldFocus: true });
    } else {
      onUpdate(data);
    }
  };
  useEffect(() => {
    if (isSuccess) {
      setValue('oldPassword', '');
      setValue('password', '');
      setValue('confirm', '');
    }
  }, [isSuccess]);
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          {isSuccess && (
            <Alert severity="success" variant="filled">
              Successfully saved!
            </Alert>
          )}
          {isLoading && (
            <Alert severity="info" variant="filled">
              Loading please wait..
            </Alert>
          )}
          {isError && (
            <Alert severity="error" variant="filled">
              Error while saving your details.
            </Alert>
          )}
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Old Password"
            margin="normal"
            name="oldPassword"
            type="password"
            variant="outlined"
            defaultValue=""
            rules={{ required: true }}
            error={errors.oldPassword && true}
          />
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Password"
            margin="normal"
            name="password"
            type="password"
            variant="outlined"
            defaultValue=""
            rules={{ required: true }}
            error={errors.password && true}
          />
          <Controller
            as={TextField}
            control={control}
            fullWidth
            label="Confirm password"
            margin="normal"
            name="confirm"
            type="password"
            variant="outlined"
            defaultValue=""
            rules={{ required: true }}
            error={errors.confirm && true}
          />
        </CardContent>
        <Divider />
        <Box display="flex" justifyContent="flex-end" p={2}>
          <Button color="primary" variant="contained" type="submit">
            Update
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Password.propTypes = {
  className: PropTypes.string
};

export default Password;
