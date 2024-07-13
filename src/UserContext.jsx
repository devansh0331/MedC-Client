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
  const [allUsers, setAllUsers] = useState([]);
  const [userExperience, setUserExperience] = useState([]);
  const [userCertificate, setUserCertificate] = useState([]);
  const [userAchievement, setUserAchievement] = useState([]);
  const [userEducation, setUserEducation] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);

  const getUserExperience = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/auth/update-profile/get/experience`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();

      if (!res.success) {
        console.error(res.error);
      } else {
        console.log(res.data);
        setUserExperience(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch user experience");
    }
  };
  const getUserCertificate = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/auth/update-profile/get/certificate`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();

      if (!res.success) {
        console.error(res.error);
      } else {
        setUserCertificate(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch user certificate");
    }
  };
  const getUserAchievement = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/auth/update-profile/get/achievement`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();

      if (!res.success) {
        console.error(res.error);
      } else {
        setUserAchievement(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch user achievement");
    }
  };
  const getUserEducation = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/auth/update-profile/get/education`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();

      if (!res.success) {
        console.error(res.error);
      } else {
        setUserEducation(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch user education");
    }
  };

  const getUser = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/profile`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const res = await response.json();
      console.log("User context: ", res);
      if (!res.success) {
        console.error(res.error);
      } else {
        const name = Cookies.get("name");
        const email = Cookies.get("email");

        if (name === undefined || email === undefined) {
          const state = false;
          setUserInfo({ state, name, email });
        } else {
          const state = true;
          setUserInfo({ state, name, email });
        }
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
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
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
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        toast.error(parsedRes.error);
      } else {
        getPosts();
      }
    } catch (error) {
      console.error("Failed to like post");
    }
  };

  const getAllUsers = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/user/all-user`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      console.log(parsedRes);
      if (!parsedRes.success) {
        console.error(parsedRes.error);
      } else {
        setAllUsers(parsedRes.data);
      }
    } catch (error) {
      console.error("Failed to get users");
    }
  };

  useEffect(() => {
    // const name = Cookies.get("name");
    // const email = Cookies.get("email");

    getUser();
    // console.log(user);

    // if (name === undefined || email === undefined) {
    //   const state = false;
    //   setUserInfo({ state, name, email });
    // } else {
    //   const state = true;
    //   setUserInfo({ state, name, email });
    // }
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
        getUserAchievement,
        getUserExperience,
        getUserEducation,
        getUserCertificate,
        userAchievement,
        userExperience,
        userEducation,
        userCertificate,
        getAllUsers,
        allUsers,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
