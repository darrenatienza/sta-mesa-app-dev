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
import DocumentRequestView from './views/document-request';
import BarangayClearanceView from './views/document-request/barangay-clearance';
import BlotterView from './views/document-request/blotter';
import BusinessClearanceView from './views/document-request/business-clearance';
import IndigencyView from './views/document-request/indigency';
import RelationshipView from './views/document-request/relationship';
import ResidencyView from './views/document-request/residency';
import TimeScheduleView from './views/time-schedule';
import MedicineView from './views/medecine';
import AboutView from './views/about';
import FbPostView from './views/fb-post';
import HomeView from './views/home';
const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'home', element: <HomeView /> },
      { path: 'account', element: <AccountView /> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'officials', element: <OfficialView /> },
      { path: 'residents', element: <ResidentView /> },
      { path: 'health-workers', element: <HealtWorkerView /> },
      { path: 'resident-form', element: <ResidentFormView /> },
      { path: 'health-workers', element: <HealthWorkerListView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'time-schedule', element: <TimeScheduleView /> },
      { path: 'medicines', element: <MedicineView /> },
      {
        path: 'document-requests',
        element: <DocumentRequestView />
      },
      {
        path: 'barangay-clearance',
        element: <BarangayClearanceView />
      },

      {
        path: 'business-clearance',
        element: <BusinessClearanceView />
      },
      {
        path: 'blotter',
        element: <BlotterView />
      },
      {
        path: 'residency',
        element: <ResidencyView />
      },
      {
        path: 'indigency',
        element: <IndigencyView />
      },
      {
        path: 'relationship',
        element: <RelationshipView />
      },
      { path: 'settings', element: <SettingsView /> },
      { path: 'about', element: <AboutView /> },

      { path: 'fb-post', element: <FbPostView /> },
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
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
