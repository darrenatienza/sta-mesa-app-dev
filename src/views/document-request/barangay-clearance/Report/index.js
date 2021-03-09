import { Box, Button, Card } from '@material-ui/core';
import React, { useEffect, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import {
  useBarangayClearanceViewState,
  useCurrentUser
} from '../../../../states';
import Preview from './Preview';
import useAxios from 'axios-hooks';
const Report = () => {
  const [
    barangayClearanceStateView,
    { setShowListView, setShowPrintPreview }
  ] = useBarangayClearanceViewState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  // http - get barangay clearance list
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_barangay_clearances?filter=barangay_clearance_id,eq,${barangayClearanceStateView.barangayClearanceID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  useEffect(() => {
    if (
      barangayClearanceStateView.barangayClearanceID > 0 &&
      barangayClearanceStateView.showPrintPreview
    ) {
      refetch();
    }
  }, [barangayClearanceStateView.barangayClearanceID]);
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

export default Report;
