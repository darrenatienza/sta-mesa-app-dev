import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';

const Menus = ({
  anchorEl,
  setAnchorEl,
  handleDeleteCallBack,
  handleChangeRoleCallBack
}) => {
  const handleClose = event => {
    setAnchorEl(null);
  };
  const handleChangeRole = () => {
    handleChangeRoleCallBack();
    setAnchorEl(null);
  };
  const handleDelete = () => {
    handleDeleteCallBack();
    setAnchorEl(null);
  };
  return (
    <Menu
      id="simple-menu"
      anchorEl={anchorEl}
      keepMounted
      open={Boolean(anchorEl)}
      onClose={handleClose}
    >
      <MenuItem onClick={handleChangeRole}>Change Role</MenuItem>
      <MenuItem onClick={handleDelete}>Remove</MenuItem>
    </Menu>
  );
};

export default Menus;
