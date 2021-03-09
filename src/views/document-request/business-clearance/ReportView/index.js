import React, { useRef, useEffect } from 'react';
import { Box, Button, Card, makeStyles } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import { useBusinessClearanceViewState } from 'src/states';
import Preview from './Preview';
import useAxios from 'axios-hooks';

const useStyles = makeStyles(theme => ({
  root: {},
  cardContainer: { padding: theme.spacing(2) }
}));

export const ReportView = () => {
  const classes = useStyles();
  const [
    businessClearanceViewState,
    { setShowListView, setShowPrintPreview }
  ] = useBusinessClearanceViewState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  // http - get barangay clearance list
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_business_clearance?filter=business_clearance_id,eq,${businessClearanceViewState.selectedBusinessClearanceID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  useEffect(() => {
    if (
      businessClearanceViewState.selectedBusinessClearanceID > 0 &&
      businessClearanceViewState.showPrintPreview
    ) {
      refetch();
    }
  }, [businessClearanceViewState.selectedBusinessClearanceID]);
  const handleClose = () => {
    setShowListView(true);
    setShowPrintPreview(false);
  };
  return (
    <div>
      <Box display="flex">
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Back
        </Button>
        <Box flexGrow="1" />
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      <Box mt={3}>
        <Card>
          <Preview ref={componentRef} data={data ? data.records[0] : {}} />
        </Card>
      </Box>
    </div>
  );
};
