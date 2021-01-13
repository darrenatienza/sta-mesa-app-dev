export const initialState = {
    userID: 0,
    personID:0,
    openDeleteDialog: false,
    openResetPasswordDialog: false,
    openChangeGroupDialog: false,
    criteria: ''
  };
  

  export const setUserID = residentViewState => value => {
    residentViewState.setState({ userID: value });
};
export const setPersonID = residentViewState => value => {
    residentViewState.setState({ personID: value });
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