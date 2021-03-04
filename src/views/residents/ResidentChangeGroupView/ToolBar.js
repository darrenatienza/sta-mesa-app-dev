import React, { useState, useEffect } from 'react';

import clsx from 'clsx';

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
  CardHeader,
  Divider,
  Grid
} from '@material-ui/core';

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
const ToolBar = ({ className, roles, onAdd, ...rest }) => {
  const classes = useStyles();
  const [selectedRoleID, setSelectedRoleID] = useState(0);
  const onSelectRole = roleID => {
    setSelectedRoleID(roleID);
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
                  <TextField
                    fullWidth
                    margin="normal"
                    select
                    name="roles"
                    label="Roles"
                    onChange={e => onSelectRole(e.target.value)}
                    variant="outlined"
                    SelectProps={{
                      native: true
                    }}
                  >
                    <option value={0}>Select Role here..</option>
                    {roles ? (
                      roles.records.map(option => (
                        <option key={option.role_id} value={option.role_id}>
                          {option.title}
                        </option>
                      ))
                    ) : (
                      <option></option>
                    )}
                  </TextField>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
          <Divider />
          <Box display="flex" justifyContent="flex-end" p={2}>
            <Button
              disabled={selectedRoleID == 0}
              color="primary"
              variant="contained"
              onClick={() => onAdd(selectedRoleID)}
              display="flex"
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
