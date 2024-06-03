// const { createContext, useState, default: React } = require("react");

import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "./ServerURL";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    state: false,
    name: "",
    email: "",
  });
  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/profile`, {
        method: "GET",
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        console.error(res.error);
      } else {
        setUser(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch user");
    }
  };
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
    <UserContext.Provider value={{ userInfo, setUserInfo, user, getUser }}>
      {children}
    </UserContext.Provider>
  );
}
