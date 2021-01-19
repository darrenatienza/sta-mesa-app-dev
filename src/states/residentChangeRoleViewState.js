export const initialState = {
  refetchResults: false,
  refetchRoleResults: false
};
// trigger to fetch results
export const setRefetchResults = residentChangeRoleViewState => value => {
  residentChangeRoleViewState.setState({ refetchResults: value });
};

// trigger to fetch results
export const setRefetchRoleResults = residentChangeRoleViewState => value => {
  residentChangeRoleViewState.setState({ refetchRoleResults: value });
};
