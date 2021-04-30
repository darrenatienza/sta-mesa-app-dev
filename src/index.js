import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import App from './App';
import MessengerCustomerChat from 'react-messenger-customer-chat';
ReactDOM.render(
  <>
    {/* <MessengerCustomerChat pageId="105474534531476" appId="2569820816660455" /> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </>,

  document.getElementById('root')
);

serviceWorker.unregister();
