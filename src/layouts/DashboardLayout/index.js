import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import NavBar from './NavBar';
import TopBar from './TopBar';
import AdminNavBar from './NavBar/AdminNavBar';
import useAxios from 'axios-hooks';
import Cookies from 'js-cookie';
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  },
  contentContainer: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden'
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflow: 'auto'
  }
}));

const DashboardLayout = () => {
  const classes = useStyles();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const navigate = useNavigate();
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const [{ data, loading, error, response }, executeLogout] = useAxios(
    { url: `/logout`, method: 'POST' },
    {
      manual: true
    }
  );
  const logout = async () => {
    setOpenLogoutDialog(true);
  };
  const handleOnCloseLogoutDialog = async confirm => {
    if (confirm) {
      await executeLogout();
      navigate('/login');
    }
    setOpenLogoutDialog(false);
  };
  return (
    <div className={classes.root}>
      <TopBar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        onLogout={logout}
      />
      <NavBar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
      />
      <div className={classes.wrapper}>
        <div className={classes.contentContainer}>
          <div className={classes.content}>
            <Outlet />
            <ConfirmationDialog
              message="Do you want to logout"
              title="Logout"
              open={openLogoutDialog}
              onClose={handleOnCloseLogoutDialog}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
