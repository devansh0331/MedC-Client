import React, { useContext, useEffect } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileAbout from "../components/ProfileAbout";
import ProfileDetails from "../components/ProfileDetails";
import EditProfile from "../components/EditProfile";
import { useState } from "react";
import EditAbout from "../components/EditAbout";
import { UserContext } from "../UserContext";
import SideBar from "../components/SideBar";
import EditDetails from "../components/EditExperience";
import toast, { Toaster } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import NavMain from "../components/NavMain";

const ProfilePage = () => {
  const [close, setClose] = useState(false);
  const [closeAbout, setCloseAbout] = useState(false);
  const [closeDetails, setCloseDetails] = useState(false);
  const { userInfo, user, getUser } = useContext(UserContext);

  useEffect(() => {
    getUser();
  }, []);

  const setToast = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else toast.error(msg);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    try {
      Cookies.remove("token");
      Cookies.remove("name");
      Cookies.remove("email");
      toast.success("Logged Out");
      setTimeout(() => {
        navigate("/signin");
      }, 1000);
    } catch (error) {
      toast.error(error); 
    }
  };

    return (
      <div className="bg-background w-full overflow-x-hidden">
        <div className="flex">
          <SideBar/>
          <div className="w-[80%] flex mx-auto mt-5 gap-5">
            <ProfileCard />
            <ProfileDetails />
          </div>
        </div>
      </div>
  );
};

export default ProfilePage;
