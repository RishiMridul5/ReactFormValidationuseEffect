import React, { useState, useEffect } from "react";

import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import MainHeader from "./components/MainHeader/MainHeader";
import AuthContext from "./store/auth-context";

function App() {
  // console.log(`App rendered`);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const loginHandler = (email, password, college) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
  };

  const logoutHandler = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "1") setIsLoggedIn(true);
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, onLogout: logoutHandler, onLogin: loginHandler }}
    >
      <MainHeader />
      <main>
        {!isLoggedIn && <Login />}
        {isLoggedIn && <Home />}
      </main>
    </AuthContext.Provider>
  );
}

export default App;
