// const { createContext, useState, default: React } = require("react");

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    state: false,
    name: "",
    email: "",
  });

  useEffect(() => {
    const name = Cookies.get("name");
    const email = Cookies.get("email");
    if (name === undefined || email === undefined) {
      const state = false;
      setUserInfo({ state, name, email });
    } else {
      const state = true;
      setUserInfo({ state, name, email });
    }
  }, []);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
