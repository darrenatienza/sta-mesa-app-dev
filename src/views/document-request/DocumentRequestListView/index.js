import React, { useState } from 'react';
import { Box, Container, Grid, makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from 'src/components/Page';
import Toolbar from './Toolbar';
import ProductCard from './ProductCard';
import data from './data';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  productCard: {
    height: '100%'
  }
}));

const DocumentRequestListView = () => {
  const classes = useStyles();
  const [products] = useState(data);

  return (
    <>
      <Box mt={3}>
        <Grid container spacing={3}>
          {products.map(product => (
            <Grid item key={product.id} lg={4} md={6} xs={12}>
              <ProductCard className={classes.productCard} product={product} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default DocumentRequestListView;
