import React, { useEffect, useState } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  Avatar,
  Box,
  Button,
  Divider,
  Drawer,
  Hidden,
  List,
  Typography,
  makeStyles
} from '@material-ui/core';
import {
  AlertCircle as AlertCircleIcon,
  BarChart as BarChartIcon,
  Lock as LockIcon,
  Settings as SettingsIcon,
  ShoppingBag as ShoppingBagIcon,
  User as UserIcon,
  UserPlus as UserPlusIcon,
  Users as UsersIcon,
  Calendar as CalendarIcon,
  File as FileIcon,
  HelpCircle as AboutIcon
} from 'react-feather';

import NavItem from './NavItem';
import { useCurrentUser } from '../../../states';
import { BiCapsule as CapsuleIcon } from 'react-icons/bi';
const user = {
  avatar: '/static/images/avatars/avatar_6.png',
  jobTitle: 'Senior Developer',
  name: 'Katarina Smith'
};

const items = [
  {
    id: 1,
    href: '/app/dashboard',
    icon: BarChartIcon,
    title: 'Dashboard'
  },
  {
    id: 2,
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    id: 3,
    href: '/app/medicines',
    icon: CapsuleIcon,
    title: 'Medicines'
  },
  {
    id: 4,
    href: '/app/residents',
    icon: UsersIcon,
    title: 'Residents'
  },
  {
    id: 5,
    href: '/app/officials',
    icon: UsersIcon,
    title: 'Brgy Officials'
  },
  {
    id: 6,
    href: '/app/time-schedule',
    icon: CalendarIcon,
    title: 'Time Schedule'
  },
  {
    id: 7,
    href: '/app/health-workers',
    icon: UsersIcon,
    title: 'Brgy Health Workers'
  },
  {
    id: 8,
    href: '/app/document-requests',
    icon: FileIcon,
    title: 'Document Requests'
  },
  {
    id: 9,
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  }
];
const resident = [
  {
    id: 2,
    href: '/app/account',
    icon: UserIcon,
    title: 'Account'
  },
  {
    id: 3,
    href: '/app/medicines',
    icon: CapsuleIcon,
    title: 'Medicines'
  },

  {
    id: 8,
    href: '/app/document-requests',
    icon: FileIcon,
    title: 'Document Requests'
  },
  {
    id: 9,
    href: '/app/settings',
    icon: SettingsIcon,
    title: 'Settings'
  },
  {
    id: 10,
    href: '/app/about',
    icon: AboutIcon,
    title: 'About'
  }
];
const admin = [
  {
    id: 4,
    href: '/app/residents',
    icon: UsersIcon,
    title: 'Residents'
  },
  {
    id: 5,
    href: '/app/officials',
    icon: UsersIcon,
    title: 'Brgy Officials'
  },

  {
    id: 7,
    href: '/app/health-workers',
    icon: UsersIcon,
    title: 'Brgy Health Workers'
  }
];

const official = [
  {
    id: 6,
    href: '/app/time-schedule',
    icon: CalendarIcon,
    title: 'Time Schedule'
  }
];

const useStyles = makeStyles(() => ({
  mobileDrawer: {
    width: 256
  },
  desktopDrawer: {
    width: 256,
    top: 64,
    height: 'calc(100% - 64px)'
  },
  avatar: {
    cursor: 'pointer',
    width: 64,
    height: 64
  }
}));

const NavBar = ({ onMobileClose, openMobile }) => {
  const classes = useStyles();
  const location = useLocation();
  const [listItems, setListItems] = useState(resident);

  const [currentUser] = useCurrentUser();

  useEffect(() => {
    //conditionally add menus depending on current roles
    currentUser.roles.map(x => {
      switch (x.title) {
        case 'admin':
          setListItems(listItems => listItems.concat(admin));
          break;
        case 'official':
          setListItems(listItems => listItems.concat(official));
          break;
        default:
          break;
      }
    });
  }, [currentUser.roles]);
  useEffect(() => {
    if (openMobile && onMobileClose) {
      onMobileClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const content = (
    <Box height="100%" display="flex" flexDirection="column">
      <Box p={2}>
        <List>
          {listItems
            .sort((a, b) => (a.id > b.id ? 1 : -1))
            .map(item => (
              <NavItem
                href={item.href}
                key={item.title}
                title={item.title}
                icon={item.icon}
              />
            ))}
        </List>
      </Box>
      <Box flexGrow={1} />
    </Box>
  );

  return (
    <>
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.mobileDrawer }}
          onClose={onMobileClose}
          open={openMobile}
          variant="temporary"
        >
          {content}
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer
          anchor="left"
          classes={{ paper: classes.desktopDrawer }}
          open
          variant="persistent"
        >
          {content}
        </Drawer>
      </Hidden>
    </>
  );
};

NavBar.propTypes = {
  onMobileClose: PropTypes.func,
  openMobile: PropTypes.bool
};

NavBar.defaultProps = {
  onMobileClose: () => {},
  openMobile: false
};

export default NavBar;
