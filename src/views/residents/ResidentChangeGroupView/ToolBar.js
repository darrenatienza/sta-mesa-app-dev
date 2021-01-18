import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { NavLink as RouterLink, useNavigate } from 'react-router-dom';
import useAxios from 'axios-hooks';
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  IndeleteAdornment,
  SvgIcon,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
  CardHeader,
  Divider,
  Grid
} from '@material-ui/core';
import { Search as SearchIcon } from 'react-feather';
import { useResidentViewState, usePersonEntity } from '../../../states';

const useStyles = makeStyles(theme => ({
  root: {},
  formControl: {
    minWidth: 360
  },
  importButton: {
    marginRight: theme.spacing(1)
  },
  exportButton: {
    marginRight: theme.spacing(1)
  }
}));
const ToolBar = ({ className, ...rest }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [personEntity, { resetPersonEntity }] = usePersonEntity();
  const [roleID, setRoleID] = useState('');
  const [
    {
      data: deletePersonRoleData,
      loading: deletePersonRoleDataLoading,
      error: deletePersonRoleDataError
    },
    executePut
  ] = useAxios(
    { url: `/records/persons/${personEntity.personID}`, method: 'PUT' },
    {
      manual: true
    }
  );

  const [
    {
      data: postPersonRoleData,
      loading: postPersonRoleLoading,
      error: postPersonRoleError
    },
    executePersonRolePost
  ] = useAxios(
    { url: `/records/persons`, method: 'POST' },
    {
      manual: true
    }
  );
  const [
    {
      data: getPersonRoleListData,
      loading: getPersonRoleListDataLoading,
      error: getPersonRoleListDataError
    }
  ] = useAxios(
    {
      url: `/records/view_person_roles?filter=person_id,eq,${personEntity.personID}&filter=role_id,eq,${roleID}`
    },
    {
      manual: !personEntity.personID || !roleID
    }
  );

  const [
    {
      data: getRoleListData,
      loading: getRoleListDataLoading,
      error: getRoleListDataError
    }
  ] = useAxios({
    url: `/records/roles`
  });
  const handleAdd = event => {
    resetPersonEntity();
  };
  const handleChange = event => {
    setRoleID(event.target.value);
    console.log(event.target.value);
  };
  return (
    <div className={clsx(classes.root, className)} {...rest}>
      <Box>
        <Card>
          <CardHeader
            subheader="Please add group for selected resident."
            title="Resident Group"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={3}>
              <Grid item md={12} xs={12}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Groups
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    value={roleID}
                    onChange={handleChange}
                    label="Groups"
                  >
                    {getRoleListData &&
                      getRoleListData.records.map(option => (
                        <MenuItem key={option.role_id} value={option.role_id}>
                          {option.title}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              color="primary"
              variant="contained"
              onClick={handleAdd}
              display="flex"
              justifyContent="flex-end"
            >
              Add Group
            </Button>
          </Box>
        </Card>
      </Box>
    </div>
  );
};

export default ToolBar;
