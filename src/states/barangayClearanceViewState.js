import moment from 'moment';
export const initialState = {
  barangayClearanceID: 0,
  showFormView: false,
  showListView: true,
  criteria: '',
  filterCriteria: '',
  filterDate: moment().format('YYYY-MM-DD'),
  refreshList: false
};

export const setFilterCriteria = barangayClearanceViewState => value => {
  barangayClearanceViewState.setState({
    filterCriteria: value
  });
};
export const setFilterDate = barangayClearanceViewState => value => {
  barangayClearanceViewState.setState({
    filterDate: value
  });
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
    refreshList: value
  });
};
export const setCriteria = barangayClearanceViewState => value => {
  barangayClearanceViewState.setState({
    criteria: value
  });
};
