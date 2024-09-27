import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { SERVER_URL } from "./ServerURL";
import toast from "react-hot-toast";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [userInfo, setUserInfo] = useState({
    state: false,
    name: "",
    email: "",
  });
  const [user, setUser] = useState({});
  const [adminStatus, setAdminStatus] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  const [userExperience, setUserExperience] = useState([]);
  const [singleUserExperience, setSingleUserExperience] = useState([]);
  const [userCertificate, setUserCertificate] = useState([]);
  const [singleUserCertificate, setSingleUserCertificate] = useState([]);
  const [userAchievement, setUserAchievement] = useState([]);
  const [singleUserAchievement, setSingleUserAchievement] = useState([]);
  const [userEducation, setUserEducation] = useState([]);
  const [singleUserEducation, setSingleUserEducation] = useState([]);
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [friendStatus, setFriendStatus] = useState(0);
  const [statusValue, setStatusValue] = useState("");

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
      // console.log(res)
      if (!res.success) {
        console.error(res.error);
      } else {
        // console.log(res.data);
        setUserExperience(
          res.data.sort(
            (a, b) => new Date(a.startingMonth) - new Date(b.startingMonth)
          )
        );
        setUserExperience(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch user experience");
    }
  };
  const getSingleUserExperience = async (id) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/user/single-user/experience/${id}`,
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
        setSingleUserExperience(
          res.data.sort(
            (a, b) => new Date(b.startingMonth) - new Date(a.startingMonth)
          )
        );
        setSingleUserExperience(res.data);
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
  const getSingleUserCertificate = async (id) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/user/single-user/certificate/${id}`,
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
        setSingleUserCertificate(res.data);
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
  const getSingleUserAchievement = async (id) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/user/single-user/achievement/${id}`,
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
        setSingleUserAchievement(res.data);
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
        setUserEducation(
          res.data.sort(
            (a, b) => new Date(b.startingMonth) - new Date(a.startingMonth)
          )
        );
      }
    } catch (error) {
      console.error("Failed to fetch user education");
    }
  };
  const getSingleUserEducation = async (id) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/user/single-user/education/${id}`,
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
        setSingleUserEducation(res.data);
        setUserEducation(
          res.data.sort(
            (a, b) => new Date(b.startingMonth) - new Date(a.startingMonth)
          )
        );
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
        await isAdmin();
      }
    } catch (error) {
      console.error("Failed to fetch user");
    }
  };
  const getPosts = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/post/get-live-posts`, {
        method: "GET",
        // credentials: "include",
        // headers: {
        //   Authorization: `Bearer ${Cookies.get("token")}`,
        // },
      });
      const res = await response.json();
      if (!res.success) {
        console.error(res);
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
        method: "GET",
        // credentials: "include",
        // headers: {
        //   Authorization: `Bearer ${Cookies.get("token")}`,
        // },
      });
      const parsedRes = await res.json();
      // console.log(parsedRes);
      if (!parsedRes.success) {
        console.error(parsedRes.error);
      } else {
        if(userInfo.state){
          // console.log(userInfo, "true")
          setAllUsers(parsedRes.data.filter((user) => user.email !== userInfo.email));
        }else{
          // console.log(userInfo, "false")
          setAllUsers(parsedRes.data);
        }
      }
    } catch (error) {
      console.error("Failed to get users");
    }
  };
  const checkFriendStatus = async (id) => {
    try {
      // console.log(id);
      const res = await fetch(`${SERVER_URL}/user/check-status/${id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const parsedRes = await res.json();
      if (!parsedRes) console.error(parsedRes.error);
      else {
        // console.log(parsedRes);
        setFriendStatus(parsedRes.data);
        // console.log("Friend Statussss: ", friendStatus);
        if (parsedRes.data == 0) {
          setStatusValue("Connect");
        } else if (parsedRes.data == 1) {
          setStatusValue("Requested");
        } else if (parsedRes.data == 2) {
          setStatusValue("Accept Request");
        } else if (parsedRes.data == 3) {
          setStatusValue("Connected");
        }
      }
    } catch (error) {
      console.error("Failed to check status");
    }
  };
  const sendRequest = async (friendId) => {
    try {
      // console.log("Friend Id: " + friendId);
      const res = await fetch(`${SERVER_URL}/user/send-request/${friendId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes) console.error(parsedRes.error);
      else await checkFriendStatus(friendId);
    } catch (error) {
      console.error("Failed to send request");
    }
  };
  const acceptRequest = async (friendId) => {
    try {
      // console.log("Friend Id: " + friendId);
      const res = await fetch(`${SERVER_URL}/user/accept-request/${friendId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes) console.error(parsedRes.error);
      else await checkFriendStatus(friendId);
    } catch (error) {
      console.error("Failed to accept request");
    }
  };

  const isAdmin = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/admin/is-admin`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      const res = await response.json();

      if (!res.success) {
        console.error(res.error);
      } else {
        setAdminStatus(true)
      }
    } catch (error) {
      console.error("Failed to fetch admin status");
    }
  }

  useEffect(() => {
    getUser();
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
        checkFriendStatus,
        friendStatus,
        statusValue,
        sendRequest,
        acceptRequest,
        getSingleUserAchievement,
        getSingleUserCertificate,
        getSingleUserEducation,
        getSingleUserExperience,
        singleUserCertificate,
        singleUserAchievement,
        singleUserExperience,
        singleUserEducation,
        adminStatus,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
