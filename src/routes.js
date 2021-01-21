import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import AccountView from 'src/views/account/AccountView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import ProductListView from 'src/views/document-request/DocumentRequestListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import OfficialListView from './views/official/OfficialListView';
import HealthWorkerListView from './views/health-workers/HealthWorkerListView';
import OfficialFormView from './views/official/OfficialFormView';
import ResidentListView from './views/residents/ResidentListView';
import ResidentFormView from './views/residents/ResidentFormView';
import ResidentView from './views/residents';
import OfficialView from './views/official';
import HealtWorkerView from './views/health-workers';
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'officials', element: <OfficialView /> },
      { path: 'residents', element: <ResidentView /> },
      { path: 'health-workers', element: <HealtWorkerView /> },
      { path: 'resident-form', element: <ResidentFormView /> },
      { path: 'health-workers', element: <HealthWorkerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'products', element: <ProductListView /> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
