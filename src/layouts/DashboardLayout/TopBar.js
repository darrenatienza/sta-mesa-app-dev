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

import { useCurrentUser } from '../../states';
const useStyles = makeStyles(() => ({
  root: {},
  logo: { marginRight: '10px' },
  title: { color: '#ffffff' },
  avatar: {
    width: 60,
    height: 60
  },
  userName: {
    fontWeight: 'bold'
  }
}));

const TopBar = ({ className, onMobileNavOpen, onLogout, ...rest }) => {
  const classes = useStyles();
  const [notifications] = useState([]);
  const [currentUser] = useCurrentUser();

  return (
    <AppBar className={clsx(classes.root, className)} elevation={0} {...rest}>
      <Toolbar>
        <RouterLink to="/">
          <Box display="flex" alignItems="center">
            <Logo className={classes.logo} />
            <Hidden mdDown>
              <Typography variant="h4" className={classes.title}>
                LOCAL GOVERNMENT UNIT (LGU) INFORMATION SYSTEM
              </Typography>
            </Hidden>
          </Box>
        </RouterLink>
        <Box flexGrow={1} />
        <Typography variant="body1" className={classes.title}>
          Welcome{' '}
          <span className={classes.userName}>{currentUser.userName}</span>
        </Typography>
        <Hidden mdDown>
          <IconButton color="inherit" onClick={onLogout}>
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
