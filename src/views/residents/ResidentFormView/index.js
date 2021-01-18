import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  makeStyles,
  CircularProgress,
  Collapse,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box
} from '@material-ui/core';
import Page from 'src/components/Page';
import Profile from './Profile';
import ProfileDetails from './ProfileDetails';
import useAxios from 'axios-hooks';
import { useOfficial, useResidentViewState } from '../../../states';
import { setAvatar } from 'src/states/official';
import ToolBar from './ToolBar';
import TabPanel, { a11yProps } from './TabPanel';
import ResidentChangeGroupView from '../ResidentChangeGroupView';
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

const ResidentFormView = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const classes = useStyles();
  const [residentViewState] = useResidentViewState();
  return (
    <Collapse in={residentViewState.showResidentDetailView}>
      <Container maxWidth="lg">
        <AppBar position="static" className={classes.appBar}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="simple tabs example"
          >
            <Tab label="General Information" {...a11yProps(0)} />
            <Tab label="Group" {...a11yProps(1)} />
            {false && <Tab label="User Account" {...a11yProps(2)} />}
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ProfileDetails />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ResidentChangeGroupView />
        </TabPanel>
      </Container>
    </Collapse>
  );
};

export default ResidentFormView;
