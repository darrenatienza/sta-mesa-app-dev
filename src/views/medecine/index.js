import React, { useState } from 'react';
import { Box, Container, makeStyles } from '@material-ui/core';
import Page from 'src/components/Page';
import Results from './Results';
import Toolbar from './Toolbar';
import data from './data';
import useAxios from 'axios-hooks';
const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const CustomerListView = () => {
  const classes = useStyles();
  const [customers] = useState(data);

  const onSearch = criteria => {};
  const onAdd = data => {};
  const onEdit = data => {};
  const onDelete = () => {};
  
  return (
    <Page className={classes.root} title="Medicines">
      <Container maxWidth={false}>
        <Toolbar onSearch={onSearch} onAdd={onAdd} />
        <Box mt={3}>
          <Results customers={customers} onEdit={onEdit} onDelete={onDelete} />
        </Box>
      </Container>
    </Page>
  );
};

export default CustomerListView;
