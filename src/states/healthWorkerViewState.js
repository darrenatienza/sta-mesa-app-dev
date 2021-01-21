export const initialState = {
  healthWorkerID: 0,
  criteria: '',
  refeshList: false
};

export const setOfficialID = healthWorkerViewState => value => {
  healthWorkerViewState.setState({
    officialID: value
  });
};

export const resetHealthWorkerViewState = healthWorkerViewState => () => {
  healthWorkerViewState.setState({
    healthWorkerID: healthWorkerViewState.initialState.healthWorkerID,
    refeshList: healthWorkerViewState.initialState.refeshList
  });
};

export const setRefreshList = healthWorkerViewState => value => {
  healthWorkerViewState.setState({
    refeshList: value
  });
};
export const setCriteria = healthWorkerViewState => value => {
  healthWorkerViewState.setState({
    criteria: value
  });
};
