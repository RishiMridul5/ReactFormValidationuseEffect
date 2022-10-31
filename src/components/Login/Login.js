import React, { useState, useReducer, useEffect, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { initialState, reducer } from "./Helper";
import AuthContext from "../../store/auth-context";

const Login = () => {
  const {onLogin} = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(reducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(reducer, initialState);
  const [collegeState, dispatchCollege] = useReducer(reducer, initialState);

  const { valid: emailisValid } = emailState;
  const { valid: passwordisValid } = passwordState;
  const { valid: collegeisValid } = collegeState;

  useEffect(() => {
    console.log(emailisValid, passwordisValid, collegeisValid);
    const timer = setTimeout(() => {
      if (emailisValid && passwordisValid && collegeisValid) {
        setFormIsValid(true);
        console.log(`Form inputs are valid`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [emailisValid, passwordisValid, collegeisValid]);

  const emailChangeHandler = (e) => {
    dispatchEmail({
      type: "USER_INPUT",
      field: "email",
      val: e.target.value,
    });
  };

  const collegeChangeHandler = (e) => {
    dispatchCollege({
      type: "USER_INPUT",
      field: "college",
      val: e.target.value,
    });
  };

  const passwordChangeHandler = (e) => {
    dispatchPassword({
      type: "USER_INPUT",
      field: "password",
      val: e.target.value,
    });
  };

  const validateEmailHandler = () => {
    dispatchEmail({
      type: "INPUT_BLUR",
      field: "email",
    });
  };

  const validateCollegeHandler = () => {
    dispatchCollege({
      type: "INPUT_BLUR",
      field: "college",
    });
  };
  const validatePasswordHandler = (e) => {
    dispatchPassword({
      type: "INPUT_BLUR",
      field: "password",
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    onLogin(emailState.value, passwordState.value, collegeState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.valid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.val}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            collegeState.valid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={collegeState.value}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.valid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
