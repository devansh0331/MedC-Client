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
  const {
    userInfo,
    checkFriendStatus,
    statusValue,
    sendRequest,
    acceptRequest,
  } = useContext(UserContext);
  const [isExisting, setIsExisting] = useState(false);
  const [user, setUser] = useState();

  const userId = useParams();
  // console.log(userId.id);

  const getSingleUser = async () => {
    try {
      const _id = userId.id;

      const response = await fetch(`${SERVER_URL}/user/single-user/${_id}`, {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const data = await response.json();

      if (!data.success) toast.error(data.error);
      else {
        setUser(data.user);
        setIsExisting(data.isExisting);
        await checkFriendStatus(data.user._id);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getSingleUser();
    // console.log(user);
  }, [userId]);
  const setToast = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else toast.error(msg);
  };

  return (
    <div className="bg-background w-full overflow-x-hidden lg:h-[90vh] lg:overflow-y-hidden pb-5 lg:pb-0 scrollbar-thin">
      <div className="flex">
        <SideBar />
        <div className="w-[85%] flex flex-col lg:flex-row mx-auto mt-5 gap-5">
          <div className="w-min mx-auto">
          <ProfileCard
            user={user ? user : {}}
            setToast={setToast}
            getSingleUser={getSingleUser}
            isExisting={isExisting}
            statusValue={statusValue}
            sendRequest={sendRequest}
            acceptRequest={acceptRequest}
          />
          </div>
          <div className="w-full">
          <ProfileDetails
            user={user ? user : {}}
            setToast={setToast}
            getSingleUser={getSingleUser}
            isExisting={isExisting}
            name={user ? user.name : ""}
            bio={user ? user.bio : ""}
            profileURL={user ? user.profileURL : ""}
          />
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
}

export default SingleUserProfilePage;
