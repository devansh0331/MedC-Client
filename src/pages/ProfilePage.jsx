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

const ProfilePage = () => {
  const [close, setClose] = useState(false);
  const [closeAbout, setCloseAbout] = useState(false);
  const [closeDetails, setCloseDetails] = useState(false);
  const { userInfo } = useContext(UserContext);

  const [user, setUser] = useState({});

  const getUser = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/profile`, {
        method: "GET",
        credentials: "include",
      });

      const res = await response.json();

      if (!res.success) {
        toast.error(res.error);
      } else {
        setUser(res.data);
      }
    } catch (error) {
      toast.error("Failed to fetch user");
    }
  };

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
    <div className="w-full h-screen flex">
      <SideBar
        name={userInfo.name}
        email={userInfo.email}
        handleLogout={handleLogout}
        route="profile"
      />
      <div className="w-full h-screen bg-background overflow-hidden relative">
        {close ? (
          <EditProfile
            name={userInfo.name}
            email={userInfo.email}
            bio={user.bio ? user.bio : ""}
            contact={user.contact ? user.contact : ""}
            location={user.location ? user.location : ""}
            linkedin={user.linkedin ? user.linkedin : ""}
            website={user.website ? user.website : ""}
            twitter={user.twitter ? user.twitter : ""}
            setToast={setToast}
            getUser={getUser}
            close={close}
            setClose={setClose}
          />
        ) : (
          ""
        )}
        {closeAbout ? (
          <EditAbout
            about={user.about}
            getUser={getUser}
            setToast={setToast}
            closeAbout={closeAbout}
            setCloseAbout={setCloseAbout}
          />
        ) : (
          ""
        )}
        {closeDetails ? (
          <EditDetails
            closeDetails={closeDetails}
            setCloseDetails={setCloseDetails}
          />
        ) : (
          ""
        )}
        <div className="w-3/5 mx-auto flex justify-around pt-20">
          <div className="mx-2 items-center flex flex-col">
            <ProfileCard
              contact={user.contact ? user.contact : ""}
              location={user.location ? user.location : ""}
              name={user.name ? user.name : ""}
              email={user.email ? user.email : ""}
              bio={user.bio ? user.bio : ""}
              linkedin={user.linkedin ? user.linkedin : ""}
              setClose={setClose}
              route="profile"
            />
            <button className="mx-auto text-white bg-primary px-3 py-1 rounded-full my-4 hover:bg-background hover:border-2 hover:border-primary hover:text-primary">
              Download Resume
            </button>
          </div>
          <div className="mx-2">
            <ProfileAbout
              about={user.about ? user.about : ""}
              setCloseAbout={setCloseAbout}
            />
            <ProfileDetails setCloseDetails={setCloseDetails} />
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default ProfilePage;
