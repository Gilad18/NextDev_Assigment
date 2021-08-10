export const newUser = (myObj) => {
  return (dispatch) => {
    dispatch({
      type: "NEW_USER",
      payload: myObj,
    });
  };
};
