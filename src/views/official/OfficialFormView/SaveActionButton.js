import React from 'react';
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
import useAxios from 'axios-hooks';
import { useOfficialViewState } from '../../../states';
const SaveActionButton = ({ value }) => {
  const [
    officialViewState,
    {
      setOfficialID,
      setShowOfficialListView,
      setShowOfficialFormView,
      setRefreshList
    }
  ] = useOfficialViewState();
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
    { url: `/records/officials/${value.officialID}`, method: 'PUT' },
    {
      manual: true
    }
  );
  const handleSave = () => {
    if (officialViewState.officialID > 0) {
      executePut({
        data: { person_id: value.personID, position_id: value.positionID }
      });
    } else {
      executePost({
        data: { person_id: value.personID, position_id: value.positionID }
      });
    }
    setRefreshList(true);
    setOfficialID(0);
    setShowOfficialListView(true);
    setShowOfficialFormView(false);
  };
  return (
    <Button color="primary" variant="contained" onClick={handleSave}>
      {postLoading || putLoading ? `Loading...` : `Save Official`}
    </Button>
  );
};

export default SaveActionButton;
