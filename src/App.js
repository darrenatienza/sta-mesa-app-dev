import 'react-perfect-scrollbar/dist/css/styles.css';
import React from 'react';
import { useRoutes, useNavigate } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core';
import GlobalStyles from 'src/components/GlobalStyles';
import 'src/mixins/chartjs';
import theme from 'src/theme';
import routes from 'src/routes';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
import Axios from 'axios';
import Cookies from 'js-cookie';
const App = () => {
  const routing = useRoutes(routes);
  const navigate = useNavigate();
  const axios = Axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true
  });
  const cache = new LRU({ max: 10 });

  configure({ axios, cache });
  // request interceptor to add token to request headers
  // axios.interceptors.request.use(
  //   async config => {
  //     const cookie = Cookies.get('PHPSESSID');
  //     const path = window.location.pathname;
  //     if (!cookie) {
  //       if (path !== '/login' && path !== '/register') navigate('/login');
  //     }
  //     return config;
  //   },
  //   error => Promise.reject(error)
  // );
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      {routing}
    </ThemeProvider>
  );
};

export default App;
