import moment from 'moment';
export const initialState = {
  personID: 0,
  firstName: '',
  middleName: '',
  lastName: '',
  civilStatus: 'single',
  phoneNumber: '',
  birthDate: moment().format('YYYY-MM-DD'),
  group: ''
};

export const setPersonID = personEntity => personID => {
  personEntity.setState({
    personID: personID
  });
};
export const setGroup = personEntity => value => {
  personEntity.setState({
    group: value
  });
};

export const setPersonEntity = personEntity => (
  personID,
  firstName,
  middleName,
  lastName,
  civilStatus,
  phoneNumber,
  birthDate,
  group
) => {
  personEntity.setState({
    personID: personID,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    civilStatus: civilStatus,
    phoneNumber: phoneNumber,
    birthDate: birthDate,
    group: group
  });
};
export const resetPersonEntity = personEntity => () => {
  personEntity.setState({
    personID: personEntity.initialState.personID,
    firstName: personEntity.initialState.firstName,
    middleName: personEntity.initialState.middleName,
    lastName: personEntity.initialState.lastName,
    civilStatus: personEntity.initialState.civilStatus,
    phoneNumber: personEntity.initialState.phoneNumber,
    birthDate: personEntity.initialState.birthDate,
    group: personEntity.initialState.group
  });
};
