import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useOfficialViewState } from '../../../states';
import useAxios from 'axios-hooks';
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
  MenuItem,
  InputLabel,
  Select,
  FormControl,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  cancelButton: {
    marginRight: '10px'
  }
}));

const ProfileDetails = ({
  className,
  onClose,
  personList,
  positionList,
  onSubmit,
  values,
  ...rest
}) => {
  const classes = useStyles();
  const method = useForm();
  const { handleSubmit, control, setValue } = method;
  useEffect(() => {
    if (values) {
      console.log(values);
      setValue('personID', values.person_id);
      setValue('positionID', values.position_id);
    }
  }, [values]);
  const onCloseForm = () => {
    onClose();
    reset();
  };
  const reset = () => {
    setValue('personID', 0);
    setValue('positionID', 0);
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
          title="Official Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                as={TextField}
                control={control}
                select
                name="personID"
                id="demo-simple-select-outlined"
                label="Residents"
                variant="outlined"
                defaultValue={0}
                SelectProps={{
                  native: true
                }}
              >
                <option value={0}>Select here...</option>
                {personList &&
                  personList?.map(option => (
                    <option key={option.person_id} value={option.person_id}>
                      {`${option.first_name} ${option.last_name}`}
                    </option>
                  ))}
              </Controller>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                as={TextField}
                select
                control={control}
                variant="outlined"
                name="positionID"
                id="position-label"
                label="Position"
                defaultValue={0}
                SelectProps={{
                  native: true
                }}
              >
                <option value={0}>Select here...</option>
                {positionList &&
                  positionList.map(option => (
                    <option key={option.position_id} value={option.position_id}>
                      {option.title}
                    </option>
                  ))}
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
            onClick={() => onCloseForm()}
          >
            Cancel
          </Button>
          <Button
            color="primary"
            variant="contained"
            className={classes.saveButton}
            type="submit"
          >
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
