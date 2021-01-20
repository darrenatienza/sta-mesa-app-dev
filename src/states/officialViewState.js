export const initialState = {
  officialID: 0,
  isAdd: false,
  showOfficialFormView: false,
  showOfficialListView: true,
  criteria: '',
  refeshList: false
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
    showOfficialListView: officialViewState.initialState.showOfficialListView,
    isAdd: officialViewState.initialState.isAdd
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
export const setRefreshList = officialViewState => value => {
  officialViewState.setState({
    refeshList: value
  });
};
export const setCriteria = officialViewState => value => {
  officialViewState.setState({
    criteria: value
  });
};
