import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import Axios from 'axios';
const App = () => {
  const routing = useRoutes(routes);
  const axios = Axios.create({
    baseURL: 'http://localhost/sta-mesa-api/api.php'
  });
  const cache = new LRU({ max: 10 });

  configure({ axios, cache });
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
