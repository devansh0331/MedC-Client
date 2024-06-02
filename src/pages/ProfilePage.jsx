import React, { useContext } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileAbout from "../components/ProfileAbout";
import ProfileDetails from "../components/ProfileDetails";
import EditProfile from "../components/EditProfile";
import { useState } from "react";
import EditAbout from "../components/EditAbout";
import { UserContext } from "../UserContext";
import SideBar from "../components/SideBar";
import EditDetails from "../components/EditExperience";

const ProfilePage = () => {
  const [close, setClose] = useState(false);
  const [closeAbout, setCloseAbout] = useState(false);
  const [closeDetails, setCloseDetails] = useState(false);
  const { userInfo } = useContext(UserContext);

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
    <div className="w-full h-screen flex">
      <SideBar 
      name={userInfo.name}
      email={userInfo.email}
      handleLogout={handleLogout}
      route="profile"
      />
    <div className="w-full h-screen bg-background overflow-hidden relative">
      {close ? <EditProfile close={close} setClose={setClose} /> : ""}
      {closeAbout ? (
        <EditAbout closeAbout={closeAbout} setCloseAbout={setCloseAbout} />
      ) : (
        ""
      )}
      {closeDetails ? (
        <EditDetails closeDetails={closeDetails} setCloseDetails={setCloseDetails} />
      ) : (
        ""
      )}
      <div className="w-3/5 mx-auto flex justify-around pt-20">
        <div className="mx-2 items-center flex flex-col">
          <ProfileCard
            name={userInfo.name}
            email={userInfo.email}
            setClose={setClose}
            route="profile"
          />
          <button className="mx-auto text-white bg-primary px-3 py-1 rounded-full my-4 hover:bg-background hover:border-2 hover:border-primary hover:text-primary">
            Download Resume
          </button>
        </div>
        <div className="mx-2">
          <ProfileAbout setCloseAbout={setCloseAbout} />
          <ProfileDetails setCloseDetails={setCloseDetails} />
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
