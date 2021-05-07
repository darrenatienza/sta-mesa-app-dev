import React, { useEffect, useState } from 'react';
import Page from 'src/components/Page';
import { Box, Container, Grid, makeStyles, Collapse } from '@material-ui/core';
import BusinessClearanceListView from './BusinessClearanceListView';
import BusinessClearanceFormView from './BusinessClearanceFormView';
import { useBusinessClearanceViewState, useCurrentUser } from '../../../states';
import { ReportView } from './ReportView';
import ConfirmationDialog from 'src/views/shared/ConfirmationDialog';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
const BusinessClearanceView = () => {
  const classes = useStyles();
  const [currentUser, { isValidRole }] = useCurrentUser();
  const navigate = useNavigate();
  const [isAdmin] = useState(isValidRole('admin'));
  const [isOfficial] = useState(isValidRole('official'));
  const [showNotPermittedDialog, setShowNotPermittedDialog] = useState(false);
  const [
    barangayClearanceStateView,
    { setShowFormView, setShowListView }
  ] = useBusinessClearanceViewState();

  useEffect(() => {
    if (isAdmin || isOfficial) {
      setShowNotPermittedDialog(false);
    } else {
      setShowNotPermittedDialog(true);
    }
  }, []);
  const handleOnCloseNotPermittedDialog = () => {
    setShowNotPermittedDialog(false);
    navigate('/app/document-requests');
  };
  return (
    <Page className={classes.root} title="Business Clearance">
      <Container maxWidth={false}>
        {(isAdmin || isOfficial) && (
          <>
            <Collapse in={barangayClearanceStateView.showListView}>
              <BusinessClearanceListView />
            </Collapse>
            <Collapse in={barangayClearanceStateView.showFormView}>
              <BusinessClearanceFormView />
            </Collapse>
            <Collapse in={barangayClearanceStateView.showPrintPreview}>
              <ReportView />
            </Collapse>
          </>
        )}

        <ConfirmationDialog
          open={showNotPermittedDialog}
          hasCancel={false}
          title="Business Clearance"
          message="Administrator and Official are only allowed to use this facility"
          onClose={handleOnCloseNotPermittedDialog}
        />
      </Container>
    </Page>
  );
};

export default BusinessClearanceView;
