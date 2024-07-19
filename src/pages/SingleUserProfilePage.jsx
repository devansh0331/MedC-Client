import React, { useContext, useEffect, useState } from "react";
import ProfileCard from "../components/ProfileCard";
import ProfileAbout from "../components/ProfileAbout";
import ProfileDetails from "../components/ProfileDetails";
import EditProfile from "../components/EditProfile";
import EditAbout from "../components/EditAbout";
import { UserContext } from "../UserContext";
import SideBar from "../components/SideBar";
import EditDetails from "../components/EditExperience";
import toast, { Toaster } from "react-hot-toast";
import { SERVER_URL } from "../ServerURL";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

function SingleUserProfilePage() {
  const [close, setClose] = useState(false);
  const [closeAbout, setCloseAbout] = useState(false);
  const [closeDetails, setCloseDetails] = useState(false);
  const { userInfo, checkFriendStatus, statusValue } = useContext(UserContext);
  const [isExisting, setIsExisting] = useState(false);
  const [user, setUser] = useState();

  const userId = useParams();
  console.log(userId.id);

  const getSingleUser = async () => {
    try {
      console.log("Heyyy");
      const _id = userId.id;

      const response = await fetch(`${SERVER_URL}/user/single-user/${_id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!data.success) toast.error(data.error);
      else {
        setUser(data.data);
        setIsExisting(data.isExisting);
        await checkFriendStatus(data.data._id);

        console.log(statusValue);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSingleUser();
  }, []);

  const setToast = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else toast.error(msg);
  };

  return (
    <div className="w-screen h-screen relative flex z-0">
      <SideBar
        name={userInfo.name}
        email={userInfo.email}
        // handleLogout={handleLogout}
        // className="absolute z-20 h-screen left-0"
        className="left-0 sm:block hidden"
        route="profile"
      />
      <div className="w-full h-full bg-background overflow-x-hidden absolute sm:pl-16">
        {isExisting && close ? (
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
            getSingleUser={getSingleUser}
            close={close}
            setClose={setClose}
          />
        ) : (
          ""
        )}
        {isExisting && closeAbout ? (
          <EditAbout
            about={user.about}
            getUser={getSingleUser}
            setToast={setToast}
            closeAbout={closeAbout}
            setCloseAbout={setCloseAbout}
          />
        ) : (
          ""
        )}
        {isExisting && closeDetails ? (
          <EditDetails
            closeDetails={closeDetails}
            setCloseDetails={setCloseDetails}
          />
        ) : (
          ""
        )}
        <div className="w-full  lg:w-4/5 mx-auto flex flex-col md:flex-row justify-around pt-20">
          <div className="mx-2  items-center w-full md:w-5/6  flex flex-col">
            {user && (
              <ProfileCard
                profileURL={user.profileURL ? user.profileURL : ""}
                contact={user.contact ? user.contact : ""}
                location={user.location ? user.location : ""}
                name={user.name ? user.name : ""}
                email={user.email ? user.email : ""}
                bio={user.bio ? user.bio : ""}
                linkedin={
                  user.linkedin ? "/" + user.linkedin.split("/")[4] : ""
                }
                twitter={user.twitter ? "/" + user.twitter.split("/")[3] : ""}
                website={user.website ? user.website : ""}
                setClose={setClose}
                profile={true}
                isExisting={isExisting}
              />
            )}
            <div className="w-full flex justify-evenly">
              {isExisting ? (
                <button className="mx-auto text-white bg-primary px-3 py-1 rounded-full my-4 border-2 border-primary hover:bg-background hover:border-2 hover:border-primary hover:text-primary shadow-md">
                  Upload Resume
                </button>
              ) : (
                <button className="mx-auto text-white bg-primary px-3 py-1 rounded-full my-4 border-2 border-primary hover:bg-background hover:border-2 hover:border-primary hover:text-primary shadow-md">
                  Download Resume
                </button>
              )}
              {!isExisting && (
                <button className="mx-auto text-white bg-primary px-3 py-1 rounded-full my-4 border-2 border-primary hover:bg-background hover:border-2 hover:border-primary hover:text-primary shadow-md">
                  {statusValue}
                </button>
              )}
            </div>
          </div>
          <div className="w-full mx-2 overflow-x-hidden overflow-y-scroll scrollbar-thin md:overflow-y-hidden ">
            {user && (
              <ProfileAbout
                about={user.about ? user.about : ""}
                setCloseAbout={setCloseAbout}
                isExisting={isExisting}
              />
            )}
            {user && (
              <ProfileDetails
                isExisting={isExisting}
                setCloseDetails={setCloseDetails}
              />
            )}
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default SingleUserProfilePage;
