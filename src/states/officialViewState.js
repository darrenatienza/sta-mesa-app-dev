export const initialState = {
  officialID: 0,
  showOfficialFormView: false,
  showOfficialListView: true,
  criteria: ''
};

export const setOfficialID = officialViewState => value => {
  officialViewState.setState({
    officialID: value
  });
};

export const resetOfficialViewState = officialViewState => () => {
  officialViewState.setState({
    officialID: officialViewState.initialState.officialID,
    showOfficialFormView: officialViewState.initialState.showOfficialFormView,
    showOfficialListView: officialViewState.initialState.showOfficialListView
  });
};

export const setShowOfficialFormView = officialViewState => value => {
  officialViewState.setState({
    showOfficialFormView: value
  });
};

export const setShowOfficialListView = officialViewState => value => {
  officialViewState.setState({
    showOfficialListView: value
  });
};
