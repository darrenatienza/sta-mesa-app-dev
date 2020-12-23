export const initialState = {
  officialID: 1,
  firstName: '',
  lastName: ''
};

export const setValues1 = officialEntity => value => {
  officialEntity.setState({ officialEntity: value });
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
