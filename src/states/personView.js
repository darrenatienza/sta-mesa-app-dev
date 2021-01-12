export const initialState = {
  personID: 0,
};

export const setPersonID = personView => id => {
  personView.setState({ personID: id });
};

