export const initialState = {
  isAdmin: true,
  currentPersonID: localStorage.getItem('currentPersonID') || 0,
  userName: localStorage.getItem('userName') || '',
  role: localStorage.getItem('role') || ''
};

export const setIsAdmin = currentUser => value => {
  currentUser.setState({
    isAdmin: value
  });
};
export const setRole = currentUser => value => {
  currentUser.setState({
    role: value
  });
  localStorage.setItem('role', value);
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
