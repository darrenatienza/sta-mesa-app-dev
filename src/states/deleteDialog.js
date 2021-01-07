export const initialState = {
  open: false,
  result: false
};

export const setOpenDialog = deleteDialog => value => {
  deleteDialog.setState({ open: value });
};
export const setResult = deleteDialog => value => {
  deleteDialog.setState({ result: value });
};
