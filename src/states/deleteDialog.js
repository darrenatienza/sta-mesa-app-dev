export const initialState = {
  open: false,
  url: ''
};

export const setOpenDialog = deleteDialog => value => {
  deleteDialog.setState({ open: value });
};
export const setDeleteUrl = deleteDialog => value => {
  deleteDialog.setState({ url: value });
};
