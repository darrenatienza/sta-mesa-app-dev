export const initialState = {
  showMainView: true,
  showPrintPreview: false
};
export const setShowPrintPreview = timeScheduleViewState => value => {
  timeScheduleViewState.setState({
    showPrintPreview: value
  });
};
export const setShowMainView = timeScheduleViewState => value => {
  timeScheduleViewState.setState({
    showMainView: value
  });
};
