export const initialState = {
  showResidentListView: true,
  showResidentDetailView: false,
  criteria: '',
  currentPersonID: null
};

export const setCurrentPersonID = residentViewState => value => {
  residentViewState.setState({ currentPersonID: value });
};

export const setShowResidentListView = residentViewState => value => {
  residentViewState.setState({ showResidentListView: value });
};
export const setShowResidentDetailView = residentViewState => value => {
  residentViewState.setState({ showResidentDetailView: value });
};

export const setCriteria = residentViewState => value => {
  residentViewState.setState({ criteria: value });
};
