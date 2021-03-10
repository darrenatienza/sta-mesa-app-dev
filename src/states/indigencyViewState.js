export const initialState = {
  selectedIndigencyID: 0,
  showListView: true,
  showPrintPreview: false
};

export const setSelectedIndigencyID = indigencyViewState => value => {
  indigencyViewState.setState({
    selectedIndigencyID: value
  });
};
export const setShowPrintPreview = indigencyViewState => value => {
  indigencyViewState.setState({
    showPrintPreview: value
  });
};
export const setShowListView = indigencyViewState => value => {
  indigencyViewState.setState({
    showListView: value
  });
};
