import React from "react";

import Card from "../UI/Card/Card";
import classes from "./Home.module.css";
import { AuthContext } from "../../store/auth-context";
import { useContext } from "react";
const Home = () => {
  const authCtx = useContext(AuthContext)
  console.log(authCtx);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <h4>{authCtx.userEmail}</h4>
    </Card>
  );
};

export default Home;
