export const initialState = {
  isAdmin: true,
  currentPersonID: localStorage.getItem('currentPersonID') || 0,
  userName: localStorage.getItem('userName') || '',
  roles: JSON.parse(localStorage.getItem('roles')) || []
};

export const setIsAdmin = currentUser => value => {
  currentUser.setState({
    isAdmin: value
  });
};
export const setRoles = currentUser => value => {
  currentUser.setState({
    roles: value
  });
  localStorage.setItem('roles', JSON.stringify(value));
};
export const setCurrentPersonID = currentUser => value => {
  currentUser.setState({
    currentPersonID: value
  });
  localStorage.setItem('currentPersonID', value);
};
export const setUserName = currentUser => value => {
  currentUser.setState({
    userName: value
  });
  localStorage.setItem('userName', value);
};
