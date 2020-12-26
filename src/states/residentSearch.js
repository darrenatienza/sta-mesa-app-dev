export const initialState = {
  criteria: ''
};

export const setCriteria = residentSearch => criteria => {
  residentSearch.setState({ criteria: criteria });
};
