import React, { useState, useEffect } from "react";
const AuthContext = React.createContext({
  isLoggedIn: false,
  onLogout: () => {},
  onLogin: () => {},
});

const AuthContextProvider = ({ children }) => {
  
  console.log(AuthContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const loginHandler = (email, password, college) => {
    localStorage.setItem("isLoggedIn", "1");
    setIsLoggedIn(true);
    setUserEmail(email);
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
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
        userEmail: userEmail,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export { AuthContextProvider, AuthContext };
