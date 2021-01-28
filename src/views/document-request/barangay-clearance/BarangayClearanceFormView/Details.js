import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useBarangayClearanceViewState } from '../../../../states';
import useAxios from 'axios-hooks';
import moment from 'moment';
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
  Checkbox,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  cancelButton: {
    marginRight: '10px'
  }
}));

const Details = ({ className, detail, persons, ...rest }) => {
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView }
  ] = useBarangayClearanceViewState();

  const { register, handleSubmit, setValue, control, watch, errors } = useForm({
    detail
  });

  const [
    { data: postData, loading: postLoading, error: postError },
    executePost
  ] = useAxios(
    { url: `/records/officials`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    {
      url: `/records/officials/${barangayClearanceStateView.barangayClearanceID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );
  const onSubmit = data => {
    console.log(data);
    //if (barangayClearanceStateView.barangayClearanceID > 0) {
    //  executePut({
    //    data: { person_id: data.personID, position_id: value.positionID }
    //  });
    //} else {
    //  executePost({
    //    data: { person_id: value.personID, position_id: value.positionID }
    //  });
    //}
  };

  useEffect(() => {
    setValue('dateIssued', detail.dateIssued);
  }, [detail]);

  const handleClose = () => {
    setShowListView(true);
    setShowFormView(false);
  };
  const classes = useStyles();

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
                name="dateIssued"
                control={control}
                value={detail.dateIssued}
                rules={{ required: true }}
                render={props => (
                  <TextField
                    type="date"
                    variant="outlined"
                    onChange={e => props.onChange(e.target.value)}
                    label={props.value}
                    value={moment(props.value).format('YYYY-MM-DD')}
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                  ></TextField>
                )} // props contains: onChange, onBlur and value
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <FormControl
                fullWidth
                variant="outlined"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Residents
                </InputLabel>

                <Controller
                  name="personID"
                  control={control}
                  rules={{ required: true }}
                  render={props => (
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      label="Residents"
                      variant="outlined"
                      value={props.value}
                    >
                      {persons &&
                        persons.map(option => (
                          <MenuItem
                            key={option.person_id}
                            value={option.person_id}
                          >
                            {option.first_name}
                          </MenuItem>
                        ))}
                    </Select>
                  )} // props contains: onChange, onBlur and value
                />
              </FormControl>
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
          <Button color="primary" variant="contained" onSubmit="submit">
            {postLoading || putLoading ? `Loading...` : `Save Official`}
          </Button>
        </Box>
      </Card>
    </form>
  );
};

Details.propTypes = {
  className: PropTypes.string
};

export default Details;
