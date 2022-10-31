const initialState = {
  value: "",
  valid: null,
};
const reducer = (state, action) => {
  // console.log(action, state);
  const { type, field, val } = action;
  let valid = null;
  if (type === "USER_INPUT") {
    switch (field) {
      case "email":
        valid = val.includes("@");
        break;
      case "password":
        valid = val.trim().length > 6;
        break;

      case "college":
        valid = val.trim().length < 18;
        break;
      default:
        valid = false;
    }

    return { value: val, valid };
  }
  if (type === "INPUT_BLUR") {
    let { value, valid } = state;
    switch (field) {
      case "email":
        valid = value.includes("@");
        break;
      case "password":
        valid = value.trim().length > 6;
        break;

      case "college":
        valid = value.trim().length < 15;
        break;
      default:
        valid = false;
    }
    // console.warn({ value, valid });
    return { value, valid };
  }
};
export { initialState, reducer };
