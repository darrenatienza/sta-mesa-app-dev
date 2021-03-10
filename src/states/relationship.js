export const initialState = {
  selectedRelationshipID: 0,
  showFormView: false,
  showListView: true,
  refreshList: false,
  showPrintPreview: false
};
export const setSelectedRelationshipID = relationship => id => {
  relationship.setState({ selectedRelationshipID: id });
};
export const setShowFormView = relationship => value => {
  relationship.setState({ showFormView: value });
};
export const setShowListView = relationship => value => {
  relationship.setState({ showListView: value });
};
export const setRefreshList = relationship => value => {
  relationship.setState({ refreshList: value });
};
export const setShowPrintPreview = relationship => value => {
  relationship.setState({ showPrintPreview: value });
};
