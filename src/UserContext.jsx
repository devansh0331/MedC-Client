// const { createContext, useState, default: React } = require("react");

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext({});

const [signnedin, setSignnedin] = useState(false);
export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    signnedin: false,
    name: "",
    email: "",
  });

  useEffect(() => {
    const name = Cookies.get("name");
    const email = Cookies.get("email");
    setSignnedin(true);
    setUserInfo({ name, email });
  }, [userInfo.name]);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
}
