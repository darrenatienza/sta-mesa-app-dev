import React, { useRef, useEffect } from 'react';
import { Box, Button, Card, makeStyles } from '@material-ui/core';
import { useReactToPrint } from 'react-to-print';
import { useIndigencyViewState } from 'src/states';
import Preview from './Preview';
import useAxios from 'axios-hooks';

const useStyles = makeStyles(theme => ({
  root: {},
  cardContainer: {
    padding: theme.spacing(2),
    margin: '0 auto'
  }
}));

export const ReportView = () => {
  const classes = useStyles();
  const [
    indigencyViewState,
    { setShowListView, setShowPrintPreview }
  ] = useIndigencyViewState();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current
  });
  // http - get barangay clearance list
  const [{ data, loading, error }, refetch] = useAxios(
    {
      url: `/records/view_indigencies?filter=indigency_id,eq,${indigencyViewState.selectedIndigencyID}`,
      method: 'GET'
    },
    {
      manual: true
    }
  );
  useEffect(() => {
    if (
      indigencyViewState.selectedIndigencyID > 0 &&
      indigencyViewState.showPrintPreview
    ) {
      console.log(indigencyViewState.selectedIndigencyID);
      refetch();
    }
  }, [indigencyViewState.selectedIndigencyID]);
  const handleClose = () => {
    setShowListView(true);
    setShowPrintPreview(false);
  };
  return (
    <div className={classes.root}>
      <Box display="flex">
        <Button variant="outlined" color="primary" onClick={handleClose}>
          Back
        </Button>
        <Box flexGrow="1" />
        <Button variant="contained" color="primary" onClick={handlePrint}>
          Print
        </Button>
      </Box>

      <Box mt={3} className={classes.cardContainer}>
        <Card>
          <Preview ref={componentRef} data={data ? data.records[0] : {}} />
        </Card>
      </Box>
    </div>
  );
};
export default ReportView;
