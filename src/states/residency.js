export const initialState = {
  selectedResidencyID: 0,
  showFormView: false,
  showListView: true,
  refreshList: false
};
export const setSelectedResidencyID = residency => id => {
  residency.setState({ selectedResidencyID: id });
};
export const setShowFormView = residency => value => {
  residency.setState({ showFormView: value });
};
export const setShowListView = residency => value => {
  residency.setState({ showListView: value });
};
export const setRefreshList = residency => value => {
  residency.setState({ refreshList: value });
};
