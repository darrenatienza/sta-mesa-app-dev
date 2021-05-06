export default (roleName = '') => {
  let isAdmin = false;
  let mRoles = JSON.parse(localStorage.getItem('roles')) || [];
  mRoles.forEach(r => {
    if (r.title === roleName) {
      isAdmin = true;
    }
  });
  return isAdmin;
};
