export const initialState = {
  selectedBusinessClearanceID: 0,
  showListView: true,
  showFormView: false,
  refreshList: false,
  showPrintPreview: false
};

export const setSelectedBusinessClearanceID = businessClearanceViewState => value => {
  businessClearanceViewState.setState({
    selectedBusinessClearanceID: value
  });
};
export const setShowPrintPreview = businessClearanceViewState => value => {
  businessClearanceViewState.setState({
    showPrintPreview: value
  });
};
export const setShowListView = businessClearanceViewState => value => {
  businessClearanceViewState.setState({
    showListView: value
  });
};
export const setShowFormView = businessClearanceViewState => value => {
  businessClearanceViewState.setState({
    showFormView: value
  });
};
export const setRefreshList = businessClearanceViewState => value => {
  businessClearanceViewState.setState({
    refreshList: value
  });
};
