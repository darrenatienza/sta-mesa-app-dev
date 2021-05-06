import React, { useState, useEffect } from 'react';
import { Container, Grid, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import { useCurrentUser } from '../../../states';
import useAxios from 'axios-hooks';
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';
import Resizer from 'react-image-file-resizer';
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
  const [openSaveDialog, setOpenSaveDialog] = useState(false);
  const [accountDetail, setAccountDetail] = useState();
  const [imagePreview, setImagePreview] = useState();
  const [currentFile, setCurrentFile] = useState();
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
    setAccountDetail(data);
    setOpenSaveDialog(true);
  };
  const handleOnCloseSaveDialog = async confirm => {
    if (confirm) {
      console.log(currentFile);
      const { data: val } = await executePut({
        data: {
          first_name: accountDetail.firstName,
          middle_name: accountDetail.middleName,
          last_name: accountDetail.lastName,
          civil_status: accountDetail.civilStatus,
          phone_number: accountDetail.phoneNumber,
          birthdate: accountDetail.birthDate,
          gender: accountDetail.gender,
          profile_pic: currentFile,
          address: accountDetail.address
        }
      });

      val > 0 && setIsSuccess(true);
    }
    setOpenSaveDialog(false);
  };
  const handleOnChangeImage = async event => {
    let file = event.target.files[0];
    if (file) {
      const image = await resizeFile(file);
      const pureBase64 = image.split(';')[1].split(',')[1];
      console.log(image);
      setCurrentFile(pureBase64);
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const resizeFile = file =>
    new Promise(resolve => {
      Resizer.imageFileResizer(
        file,
        300,
        300,
        'JPEG',
        100,
        0,
        uri => {
          resolve(uri);
        },
        'base64'
      );
    });

  return (
    <Page className={classes.root} title="Account">
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item lg={3} xs={12}>
            <Profile
              profile={data ?? {}}
              onChangeImage={handleOnChangeImage}
              imagePreview={imagePreview}
            />
          </Grid>
          <Grid item lg={9} xs={12}>
            <ProfileDetails
              profile={data}
              onSave={onSave}
              isLoading={putLoading}
              isError={putError}
              isSuccess={isSuccess}
            />
          </Grid>
        </Grid>

        <ConfirmationDialog
          message="Do you want to save changes"
          title="Save Details"
          open={openSaveDialog}
          onClose={handleOnCloseSaveDialog}
        />
      </Container>
    </Page>
  );
};

export default Account;
