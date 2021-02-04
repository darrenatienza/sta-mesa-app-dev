export const initialState = {
  barangayClearanceID: 0,
  showFormView: false,
  showListView: true,
  criteria: '',
  refeshList: false
};

export const setBarangayClearanceID = barangayClearanceViewState => value => {
  barangayClearanceViewState.setState({
    barangayClearanceID: value
  });
};

export const resetOfficialViewState = barangayClearanceViewState => () => {
  barangayClearanceViewState.setState({
    barangayClearanceID:
      barangayClearanceViewState.initialState.barangayClearanceID,
    showFormView: barangayClearanceViewState.initialState.showFormView,
    showListView: barangayClearanceViewState.initialState.showListView
  });
};

export const setShowFormView = barangayClearanceViewState => value => {
  barangayClearanceViewState.setState({
    showFormView: value
  });
};

export const setShowListView = barangayClearanceViewState => value => {
  barangayClearanceViewState.setState({
    showListView: value
  });
};
export const setRefreshList = barangayClearanceViewState => value => {
  barangayClearanceViewState.setState({
    refeshList: value
  });
};
export const setCriteria = barangayClearanceViewState => value => {
  barangayClearanceViewState.setState({
    criteria: value
  });
};
