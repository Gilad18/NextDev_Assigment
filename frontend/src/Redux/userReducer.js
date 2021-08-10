const reducers = (state = null, action) => {
  switch (action.type) {
    case "NEW_USER":
      return (state = action.payload);
    default:
      return state;
  }
};

export default reducers;
