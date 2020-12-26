export const initialState = {
  residentID: 0,
  firstName: '',
  middleName: '',
  lastName: '',
  age: 0,
  civilStatus: '',
  phoneNumber: ''
};

export const setResidentID = residentEntity => id => {
  residentEntity.setState({ residentID: id });
};
export const setFirstName = residentEntity => firstName => {
  residentEntity.setState({ firstName: firstName });
};
export const setMiddleName = residentEntity => middleName => {
  residentEntity.setState({ middleName: middleName });
};
export const setLastName = residentEntity => lastName => {
  residentEntity.setState({ lastName: lastName });
};
export const setAge = residentEntity => age => {
  residentEntity.setState({ age: age });
};
export const setCivilStatus = residentEntity => civilStatus => {
  residentEntity.setState({ civilStatus: civilStatus });
};
export const setPhoneNumber = residentEntity => phoneNumber => {
  residentEntity.setState({ phoneNumber: phoneNumber });
};
