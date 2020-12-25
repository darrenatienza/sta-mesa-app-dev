export const initialState = {
  officialID: 0,
  firstName: '',
  lastName: '',
  email: '',
  avatar: ''
};

export const setOfficialID = officialEntity => id => {
  officialEntity.setState({ officialID: id });
};
export const setFirstName = officialEntity => firstName => {
  officialEntity.setState({ firstName: firstName });
};
export const setLastName = officialEntity => lastName => {
  officialEntity.setState({ lastName: lastName });
};
export const setEmail = officialEntity => email => {
  officialEntity.setState({ email: email });
};
export const setAvatar = officialEntity => avatar => {
  officialEntity.setState({ avatar: avatar });
};
