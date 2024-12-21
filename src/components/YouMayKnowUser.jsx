import React, { useContext, useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Card,
  Typography,
  Button,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { Link } from "react-router-dom";
import { UserContext } from "../UserContext";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import { RiUserSharedLine } from "react-icons/ri";
import { FaUserClock } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { IoPersonAddOutline } from "react-icons/io5";
import { use } from "react";

const YouMayKnowUser = (props) => {
  const { sendRequest, checkFriendStatus } = useContext(UserContext);
  const [friendStatus, setFriendStatus] = useState(null);

  const getFriendStatus = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/user/check-status/${props.user._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      const res = await response.json();
      console.log(res);

      if (res.success) {
        setFriendStatus(res.data);
      } else {
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFriendStatus();
  }, []);

  return (
    <ListItem className="cursor-default">
      <ListItemPrefix>
        <img
          className="w-9 h-9 rounded-full profile-pic "
          src={props.user.profileURL ? props.user.profileURL : altprofile}
          alt="altprofile"
        />
      </ListItemPrefix>
      <Link to={`/user/${props.user._id}`}>
        <div className="flex flex-col">
          <Typography className="font-medium text-sm">
            {props.user.name}
          </Typography>
          {props.user.bio && (
            <Typography className="text-sm text-gray-600">
              {props.user.bio ? props.user.bio : "New User"}
            </Typography>
          )}
        </div>
      </Link>
      <ListItemSuffix>
        <div className="">
          {friendStatus == 2 && (
            <FaUserClock
              className="w-4 h-4"
              onClick={async () => {
                await acceptRequest(props.user._id);
                getPendingRequests();
                getFriendStatus();
              }}
            />
          )}
          {friendStatus == 3 && <FaUserFriends className="w-4 h-4" />}
          {friendStatus == 1 && (
            <Button
                className="p-2 md:rounded-lg rounded-full"
                color="blue"
            >
            <RiUserSharedLine
              className="w-4 h-4"
              onClick={async () => {
                  await sendRequest(props.user._id);
                  getSentRequests();
                  getFriendStatus();
                }}
                />
                </Button>
          )}
          {friendStatus == 0 && (
            <Button
                color="green"
                className="p-2 md:rounded-lg rounded-full"
            >
            <IoPersonAddOutline
              className="w-4 h-4"
              onClick={async () => {
                  await sendRequest(props.user._id);
                  getFriendStatus();
                }}
                />
                </Button>
          )}
        </div>
      </ListItemSuffix>
    </ListItem>
  );
};

export default YouMayKnowUser;
