import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Collapse,
  makeStyles,
  CircularProgress
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import useAxios from 'axios-hooks';
import { useOfficialViewState } from '../../../states';
import { setAvatar } from 'src/states/official';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  progress: {
    margin: 10
  }
}));

const OfficialFormView = () => {
  const classes = useStyles();
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
    { data: personList, loading: personListLoading, error: personListError },
    refetchPersonList
  ] = useAxios(`/records/persons`);

  const [
    {
      data: positionList,
      loading: getPositionListLoading,
      error: getPositionListError
    },
    refetchPositionList
  ] = useAxios(`/records/positions`);

  const [
    {
      data: getOfficialData,
      loading: getOfficialLoading,
      error: getOfficialError
    },
    refetchOfficialData
  ] = useAxios(
    {
      url: `/records/officials/${officialViewState.officialID}`,
      method: 'GET'
    },
    { manual: true }
  );

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
      url: `/records/officials/${officialViewState.officialID}`,
      method: 'PUT'
    },
    {
      manual: true
    }
  );
  const onSubmit = async data => {
    if (officialViewState.officialID > 0) {
      await executePut({
        data: { person_id: data.personID, position_id: data.positionID }
      });
    } else {
      await executePost({
        data: { person_id: data.personID, position_id: data.positionID }
      });
    }
    setRefreshList(true);
    setOfficialID(0);
    setShowOfficialListView(true);
    setShowOfficialFormView(false);
  };

  useEffect(() => {
    if (officialViewState.officialID > 0) {
      refetchOfficialData();
    }
  }, [officialViewState.officialID]);

  const onClose = () => {
    setOfficialID(0);
    setShowOfficialListView(true);
    setShowOfficialFormView(false);
  };

  return (
    <ProfileDetails
      personList={(personList && personList.records) || []}
      positionList={(positionList && positionList.records) || []}
      values={getOfficialData}
      onClose={onClose}
      onSubmit={onSubmit}
    />
  );
};

export default OfficialFormView;
