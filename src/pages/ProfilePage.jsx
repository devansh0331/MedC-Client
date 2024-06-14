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
    <div className="w-screen h-screen relative flex z-0">
      <SideBar
        name={userInfo.name}
        email={userInfo.email}
        handleLogout={handleLogout}
        className="absolute z-20 h-screen left-0"
        route="profile"
      />
      <div className="w-full h-full bg-background overflow-x-hidden absolute sm:pl-16">
        {close ? (
          <EditProfile
            name={user.name}
            email={user.email}
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
        <div className="w-full lg:w-4/5 xl:w-3/5 mx-auto flex flex-col md:flex-row justify-around pt-20">
          <div className="mx-2 items-center  flex flex-col">
            <ProfileCard
              profileURL={user.profileURL ? user.profileURL : ""}
              contact={user.contact ? user.contact : ""}
              location={user.location ? user.location : ""}
              name={user.name ? user.name : ""}
              email={user.email ? user.email : ""}
              bio={user.bio ? user.bio : ""}
              linkedin={user.linkedin ? "/" + user.linkedin.split("/")[4] : ""}
              twitter={user.twitter ? "/" + user.twitter.split("/")[3] : ""}
              website={user.website ? user.website : ""}
              setClose={setClose}
              profile={true}
            />
            <button className="mx-auto text-white bg-primary px-3 py-1 rounded-full my-4 hover:bg-background hover:border-2 hover:border-primary hover:text-primary">
              Upload Resume
            </button>
          </div>
          <div className="w-full mx-2 overflow-x-hidden overflow-y-scroll scrollbar-thin md:overflow-y-hidden ">
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
