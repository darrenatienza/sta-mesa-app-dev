import React, { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useCurrentUser } from '../../../states';
import useAxios from 'axios-hooks';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Account = () => {
  const classes = useStyles();
  const [currentUser] = useCurrentUser();
  const [isSuccess, setIsSuccess] = useState(false);
  const [{ data, loading, error }, refetch] = useAxios(
    { url: `/records/persons/${currentUser.currentPersonID}`, method: 'GET' },
    { manual: true }
  );
  const [
    { data: putData, loading: putLoading, error: putError },
    executePut
  ] = useAxios(
    { url: `/records/persons/${currentUser.currentPersonID}`, method: 'PUT' },
    {
      manual: true
    }
  );
  useEffect(() => {
    const performAccountFetch = async () => {
      await refetch();
    };
    performAccountFetch();
  }, []);
  useEffect(() => {
    const timeOutId = setTimeout(() => setIsSuccess(false), 3000);
    return () => clearTimeout(timeOutId);
  }, [isSuccess]);

  const onSave = async data => {
    const { data: val } = await executePut({
      data: {
        first_name: data.firstName,
        middle_name: data.middleName,
        last_name: data.lastName,
        civil_status: data.civilStatus,
        phone_number: data.phoneNumber,
        birthdate: data.birthDate,
        gender: data.gender
      }
    });
    val > 0 && setIsSuccess(true);
  };
  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <ProfileDetails
          profile={data}
          onSave={onSave}
          isLoading={putLoading}
          isError={putError}
          isSuccess={isSuccess}
        />
      </Container>
    </Page>
  );
};

export default Account;
