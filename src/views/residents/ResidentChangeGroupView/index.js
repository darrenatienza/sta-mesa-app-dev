import React, { useEffect, useState } from 'react';
import { useResidentViewState } from '../../../states';
import useAxios from 'axios-hooks';

import { Box, makeStyles } from '@material-ui/core';

import Results from './Results';
import ToolBar from './ToolBar';
const useStyles = makeStyles(theme => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  selectEmpty: {
    marginTop: theme.spacing(2)
  }
}));

const ResidentChangeGroupView = ({ className, ...rest }) => {
  const classes = useStyles();
  const [residentViewState] = useResidentViewState();
  const [selectedPersonRoleDeleteID, setSelectedPersonRoleDeleteID] = useState(
    0
  );
  const [
    {
      data: deletePersonRoleData,
      loading: deletePersonRoleLoading,
      error: deletePersonRoleError
    },
    executePersonRoleDelete
  ] = useAxios(
    {
      url: `/records/person_roles/${selectedPersonRoleDeleteID}`,
      method: 'DELETE'
    },
    {
      manual: true
    }
  );
  const [
    { data: roleListData, loading: roleListLoading, error: roleListError },
    refetchRoleList
  ] = useAxios({
    url: `/records/roles`
  });

  const [
    {
      data: postPersonRoleData,
      loading: postPersonRoleLoading,
      error: postPersonRoleError
    },
    executePersonRolePost
  ] = useAxios(
    { url: `/records/person_roles`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    {
      data: personRolesData,
      loading: personRolesLoading,
      error: personRolesError
    },
    refetchPersonRole
  ] = useAxios(
    `/records/view_person_roles?filter=person_id,eq,${residentViewState.currentPersonID}`,
    {
      manual: !residentViewState.currentPersonID
    }
  );

  useEffect(() => {
    if (selectedPersonRoleDeleteID > 0) {
      const performPersonRoleDelete = async () => {
        await executePersonRoleDelete();
        await refetchPersonRole();
      };
      performPersonRoleDelete();
    }
  }, [selectedPersonRoleDeleteID]);

  const onDelete = async personRoleID => {
    setSelectedPersonRoleDeleteID(personRoleID);
  };
  const onAdd = async roleID => {
    await executePersonRolePost({
      data: { person_id: residentViewState.currentPersonID, role_id: roleID }
    });
    await refetchPersonRole();
  };
  return (
    <>
      <Box mb={3} mt={3}>
        <ToolBar roles={roleListData} onAdd={onAdd} />
      </Box>
      <Results personRoles={personRolesData} onDelete={onDelete} />
    </>
  );
};
export default ResidentChangeGroupView;
