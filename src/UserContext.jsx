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
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

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

  const getPosts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/post/all-posts`, {
        credentials: "include",
      });
      const res = await response.json();
      if (!res.success) {
        toast.error(res.error);
      } else {
        setPosts(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch posts");
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`${SERVER_URL}/post/single-post/like/${postId}`, {
        method: "POST",
        credentials: "include",
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        toast.error(parsedRes.error);
      } else {
        getPosts();
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  useEffect(() => {
    const name = Cookies.get("name");
    const email = Cookies.get("email");

    getUser();
    console.log(user);

    if (name === undefined || email === undefined) {
      const state = false;
      setUserInfo({ state, name, email });
    } else {
      const state = true;
      setUserInfo({ state, name, email });
    }
  }, []);

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        user,
        getUser,
        posts,
        userId,
        getPosts,
        handleLike,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
