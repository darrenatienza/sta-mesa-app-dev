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
  makeStyles,
  Typography
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {},
  cancelButton: {
    marginRight: '10px'
  },
  title2: {
    marginTop: '10px'
  }
}));

const Details = ({ className, detail, ...rest }) => {
  const [persons, setPersons] = useState([]);
  const [docStatuses, setDocStatuses] = useState([]);

  // fetch list of persons from database
  const [
    {
      data: getpersonsData,
      loading: getpersonsLoading,
      error: getpersonsError
    },
    refetchpersons
  ] = useAxios(`/records/persons`);
  // fetch list of persons from database

  const [
    {
      data: getDocStatusData,
      loading: getDocStatusDataLoading,
      error: getDocStatusDataError
    },
    refetchDocStatuses
  ] = useAxios(`/records/doc_statuses`);
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
      url: `/records/officials/${barangayClearanceStateView.barangayClearanceID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );

  useEffect(() => {
    getDocStatusData && setDocStatuses(getDocStatusData.records);
  }, [getDocStatusData]);

  useEffect(() => {
    getpersonsData && setPersons(getpersonsData.records);
  }, [getpersonsData]);

  const onSubmit = data => {
    // submit
    console.log(data);
  };

  useEffect(() => {
    console.table(detail);
    setValue('dateIssued', moment(detail.dateIssued).format('YYYY-MM-DD'));
    setValue('person', detail.personID);
    setValue('reason', detail.reason);
    setValue('docStatus', detail.docStatusID);
    setValue('resCertNo', detail.resCertNo);
    setValue('requestDate', moment(detail.requestDate).format('YYYY-MM-DD'));
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
          title="Barangay Clearance Request Detail"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item lg={12} md={12} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Date Requested"
                type="date"
                as={TextField}
                name="requestDate"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                as={TextField}
                select
                label="Resident"
                name="person"
                control={control}
                variant="outlined"
                defaultValue={''}
              >
                {persons &&
                  persons.map(option => (
                    <MenuItem key={option.person_id} value={option.person_id}>
                      {option.first_name}
                    </MenuItem>
                  ))}
              </Controller>
            </Grid>
            <Grid item md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Reason"
                as={TextField}
                name="reason"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <Divider />
              <Box className={classes.title2}>
                <Typography variant="body2" component="body2">
                  This portion must be accomplish by Admin Official
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Res Cert No."
                as={TextField}
                name="resCertNo"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item lg={6} md={6} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Date Issued"
                as={TextField}
                name="dateIssued"
                type="date"
                control={control}
                defaultValue=""
              />
            </Grid>
            <Grid item lg={12} md={12} xs={12}>
              <Controller
                fullWidth
                variant="outlined"
                label="Doc Status"
                select
                as={TextField}
                name="docStatus"
                control={control}
                defaultValue=""
              >
                {docStatuses &&
                  docStatuses.map(option => (
                    <MenuItem
                      key={option.doc_status_id}
                      value={option.doc_status_id}
                    >
                      {option.name}
                    </MenuItem>
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

Details.propTypes = {
  className: PropTypes.string
};

export default Details;
