export const initialState = {
  isAdmin: true
};

export const setIsAdmin = currentUser => value => {
  currentUser.setState({
    isAdmin: value
  });
};
