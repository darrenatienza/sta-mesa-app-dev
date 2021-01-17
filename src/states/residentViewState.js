export const initialState = {
  showResidentListView: true,
  showResidentDetailView: false,
  showChangeGroupView: false,
  openDeleteDialog: false,
  openResetPasswordDialog: false,
  openChangeGroupDialog: false,

  anchorEl: null,
  criteria: ''
};
export const setShowChangeGroupView = residentViewState => value => {
  residentViewState.setState({ showChangeGroupView: value });
};
export const setAnchorEl = residentViewState => value => {
  residentViewState.setState({ anchorEl: value });
};
export const setShowResidentListView = residentViewState => value => {
  residentViewState.setState({ showResidentListView: value });
};
export const setShowResidentDetailView = residentViewState => value => {
  residentViewState.setState({ showResidentDetailView: value });
};
export const setOpenDeleteDialog = residentViewState => value => {
  residentViewState.setState({ openDeleteDialog: value });
};
export const setOpenResetPasswordDialog = residentViewState => value => {
  residentViewState.setState({ openResetPasswordDialog: value });
};
export const setOpenChangeGroupDialog = residentViewState => value => {
  residentViewState.setState({ openChangeGroupDialog: value });
};
export const setCriteria = residentViewState => value => {
  residentViewState.setState({ criteria: value });
};
