import React, { useState, useReducer, useEffect, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import { initialState, reducer } from "./Helper";
import { AuthContext } from "../../store/auth-context";
import Input from "../UI/Input/Input";

const Login = () => {
  const { onLogin } = useContext(AuthContext);
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(reducer, initialState);
  const [passwordState, dispatchPassword] = useReducer(reducer, initialState);
  const [collegeState, dispatchCollege] = useReducer(reducer, initialState);

  const { valid: emailisValid } = emailState;
  const { valid: passwordisValid } = passwordState;
  const { valid: collegeisValid } = collegeState;

  useEffect(() => {
    // console.log(emailisValid, passwordisValid, collegeisValid);
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
        <Input
          type="email"
          label="Email"

          id="email"
          valid={emailState.valid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
        />

        <Input
          type="text"
          label="College"
          id="college"
          valid={collegeState.valid}
          value={collegeState.value}
          onChange={collegeChangeHandler}
          onBlur={validateCollegeHandler}
        />

        <Input
          type="password"
          label="Password"
          id="password"
          valid={passwordState.valid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
        />
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
