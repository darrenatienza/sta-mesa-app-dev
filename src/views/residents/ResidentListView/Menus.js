import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import {
  useResidentSearch,
  usePersonView,
  useDeleteDialog,
  useResidentViewState
} from '../../../states';
const Menus = ({
  anchorEl,
  setAnchorEl,
  personID,
}) => {

  const [residentViewState, {setPersonID, setOpenResetPasswordDialog, setOpenChangeGroupDialog, setOpenDeleteDialog }] = useResidentViewState();
  const handleClose = event => {
    setAnchorEl(null);
  };
  const handleChangeGroup = () => {
    setOpenChangeGroupDialog(true);
    setAnchorEl(null);
  };
  const handleDelete = () => {
    setPersonID(personID);
    setOpenDeleteDialog(true);
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
      <MenuItem onClick={() => handleChangeGroup()}>Change Role</MenuItem>
      <MenuItem onClick={() => handleDelete()}>Remove</MenuItem>
    </Menu>
  );
};

export default Menus;
