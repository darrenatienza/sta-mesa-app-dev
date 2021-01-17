import React, { useEffect } from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import {
  useResidentSearch,
  usePersonView,
  useDeleteDialog,
  useResidentViewState
} from '../../../states';
const Menus = () => {
  const [
    residentViewState,
    {
      setPersonID,
      setOpenResetPasswordDialog,
      setOpenChangeGroupDialog,
      setOpenDeleteDialog,
      setAnchorEl
    }
  ] = useResidentViewState();
  const handleClose = event => {
    setAnchorEl(null);
  };
  const handleChangeGroup = () => {
    setOpenChangeGroupDialog(true);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setOpenDeleteDialog(true);
    setAnchorEl(null);
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={residentViewState.anchorEl}
      keepMounted
      open={Boolean(residentViewState.anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={() => handleChangeGroup()}>Change Role</MenuItem>
      <MenuItem onClick={() => handleDelete()}>Remove</MenuItem>
    </Menu>
  );
};

export default Menus;
