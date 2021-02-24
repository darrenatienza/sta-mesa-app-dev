import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import {
  AppBar,
  Badge,
  Box,
  Hidden,
  IconButton,
  Toolbar,
  makeStyles,
  Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/NotificationsOutlined';
import InputIcon from '@material-ui/icons/Input';
import Logo from 'src/components/Logo';
import useAxios from 'axios-hooks';
const useStyles = makeStyles(() => ({
  root: {},
  logo: { marginRight: '10px' },
  title: { color: '#ffffff' },
  avatar: {
    width: 60,
    height: 60
  }
}));

const TopBar = ({ className, onMobileNavOpen, ...rest }) => {
  const navigate = useNavigate();
  const classes = useStyles();
  const [notifications] = useState([]);
  const [{ data, loading, error, response }, executeLogout] = useAxios(
    { url: `/logout`, method: 'POST' },
    {
      manual: true
    }
  );
  const logout = async () => {
    await executeLogout();
    navigate('/login');
  };
  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Box display="flex" alignItems="center">
            <Logo className={classes.logo} />
            <Hidden mdDown>
              <Typography variant="h4" className={classes.title}>
                Barangay Sta. Mesa Web Base System
              </Typography>
            </Hidden>
          </Box>
        </RouterLink>
        <Box flexGrow={1} />
        <Hidden mdDown>
          <IconButton color="inherit" onClick={logout}>
            <InputIcon />
          </IconButton>
        </Hidden>
        <Hidden lgUp>
          <IconButton color="inherit" onClick={onMobileNavOpen}>
            <MenuIcon />
          </IconButton>
        </Hidden>
      </Toolbar>
    </AppBar>
  );
};

TopBar.propTypes = {
  className: PropTypes.string,
  onMobileNavOpen: PropTypes.func
};

export default TopBar;
