export const initialState = {
  isAdmin: true,
  currentPersonID: 1,
  userName: ''
};

export const setIsAdmin = currentUser => value => {
  currentUser.setState({
    isAdmin: value
  });
};
export const setCurrentPersonID = currentUser => value => {
  currentUser.setState({
    currentPersonID: value
  });
};
export const setUserName = currentUser => value => {
  currentUser.setState({
    userName: value
  });
};
