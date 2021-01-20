import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Collapse,
  CircularProgress,
  makeStyles
} from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import { useOfficialViewState } from '../../../states';
import data from './data';
import useAxios from 'axios-hooks';
import { get } from 'lodash';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const OfficialListView = () => {
  const classes = useStyles();
  const [officials, setOfficials] = useState([]);
  const [
    officialViewState,
    { setOfficialID, setShowOfficialListView, setShowOfficialFormView }
  ] = useOfficialViewState();
  const [
    {
      data: getOfficialList,
      loading: getOfficialListLoading,
      error: getOfficialListError
    },
    refetch
  ] = useAxios(
    `/records/view_officials?filter=first_name,cs,${officialViewState.criteria}`
  );
  useEffect(() => {
    getOfficialList && setOfficials(getOfficialList.records);
  }, [getOfficialList]);
  return (
    <Collapse in={officialViewState.showOfficialListView}>
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Results officials={officials} />
        </Box>
      </Container>
    </Collapse>
  );
};

export default OfficialListView;
