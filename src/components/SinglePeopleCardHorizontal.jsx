import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import React, { useContext, useEffect, useState } from "react";
import { BsBuildingsFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { IoLocationSharp, IoPersonAddOutline } from "react-icons/io5";
import altprofile from "../assets/altprofile.png";
import { Link, useNavigate } from "react-router-dom";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import { UserContext } from "../UserContext";
import { FaUserClock } from "react-icons/fa";
import { FaUserFriends } from "react-icons/fa";
import { MdOutlinePresentToAll } from "react-icons/md";
import { RiUserSharedLine } from "react-icons/ri";

function SinglePeopleCardHorizontal({
  user,
  activeTab,
  // sendRequest,
  // acceptRequest,
  getConnections,
  getSentRequests,
  getPendingRequests,
}) 
{
  const [open, setOpen] = useState(false);
  const [friendStatus, setFriendStatus] = useState(0);
  const handleOpen = () => setOpen(!open);
  const navigate = useNavigate();
  const {
    getAllUsers,
    allUsers,
    sendRequest,
    acceptRequest,
    userInfo,
  } = useContext(UserContext);


  const getFriendStatus = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/user/check-status/${user._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      
      const res = await response.json();
      if (res.success) {
        // console.log(res.data);
        setFriendStatus(res.data);
      }else{
        console.log(res.error);
      }
    } catch (error) {
      console.log(error);
       
    }
  }

  useEffect(() => {
    getFriendStatus();
  }, [user]);

  return (
    <div className="Connections my-2 flex flex-row p-4 bg-white rounded-lg">
      <div
        className="m-0 shrink-0 rounded-r-none flex flex-col lg:w-3/6 w-4/6 text-gray-700"
      >
        <div className="flex flex-row gap-3 items-center">
          <Link to={`/user/${user._id}`}>
            <img
              src={user.profileURL ? user.profileURL : altprofile}
              alt="Profile"
              size="lg"
              className="w-12 h-12 md:w-16 md:h-16 rounded-full profile-pic"
            />
          </Link>
          <div className="">
            <Link to={`/user/${user._id}`}>
              <Typography className="font-bold">{user.name}</Typography>
            </Link>
            {user.bio && (
              <Typography>{user.bio ? user.bio : "New User"}</Typography>
            )}
          </div>
        </div>

        <div className="flex flex-row mt-2">
          <ul className="flex sm:flex-row flex-col text-lg">
            <li className="flex items-center my-1">
              <IoLocationSharp />
              <Typography className="ml-2">
                {user.location ? user.location : "India"}
              </Typography>
            </li>
            {user.work && (
              <li className="flex items-center my-1 sm:ml-4">
                <BsBuildingsFill />
                <Typography className="ml-2">ABC Hospital</Typography>
              </li>
            )}
          </ul>
        </div>
      </div>

      <CardBody className="p-0 ml-auto">
        {friendStatus == 2 && (
          <Button
            size="sm"
            color="light-blue"
            className="mr-2 xl:px-4 p-2 md:rounded-lg rounded-full"
            shadow
            hover
            onClick={async () => {
              await acceptRequest(user._id);
              getPendingRequests();
              getFriendStatus();
            }}
          >
            <span className="xl:hidden">
              <FaUserClock className="w-4 h-4" />
            </span>
            <span className="hidden xl:block">Accept Request</span>
          </Button>
        )}
        {friendStatus == 3 && (
          <Button
            size="sm"
            color="green"
            className="mr-2 xl:px-4 p-2 md:rounded-lg rounded-full"
            shadow
            hover
            // onClick={async () => {
            //   await sendRequest(user._id);
            //   getConnections();
            // }}
            onClick={() => handleOpen()}
          >
            <span className="xl:hidden">
              <FaUserFriends className="w-4 h-4" />
            </span>
            <span className="hidden xl:block">Connected</span>
          </Button>
        )}
        {friendStatus == 1 && (
          <Button
            variant="outlined"
            size="sm"
            color="black"
            className="mr-2 xl:px-4 p-2 md:rounded-lg rounded-full"
            shadow
            hover
            onClick={async () => {
              await sendRequest(user._id);
              getSentRequests();
              getFriendStatus();
            }}
          >
            <span className="xl:hidden">
              <RiUserSharedLine  className="w-4 h-4" />
            </span>
            <span className="hidden xl:block">Requested</span>
          </Button>
        )}
        {friendStatus == 0 && (
          <Button
            variant=""
            size="sm"
            color="blue"
            className="mr-2 xl:px-4 p-2 md:rounded-lg rounded-full"
            shadow
            hover
            onClick={async () => {
              await sendRequest(user._id);
              getSentRequests();
              getFriendStatus();
            }}
          >
            <span className="xl:hidden">
              <IoPersonAddOutline className="w-4 h-4" />
            </span>
            <span className="hidden xl:block">Connect</span>
          </Button>
        )}

        <Button
          size="sm"
          color="light-blue"
          variant="outlined"
          className="xl:px-4 p-2 xl:rounded-lg rounded-full"
          onClick={()=> navigate(`/user/${user._id}`)}
        >
          <span className="xl:hidden">
            <ImProfile className="w-4 h-4" />
          </span>
          <span className="hidden xl:block">View Profile</span>
        </Button>
      </CardBody>
      
      <Dialog size="xs" open={open} handler={handleOpen} className="">
        <DialogBody className="flex flex-col">
          <Typography className="text-gray-800 text-lg mb-8">Are you sure you want to remove connection?</Typography>
          <div className="flex justify-between">
            <Button
            color="blue"
            variant="outlined"
            size="sm"
            onClick={handleOpen}
            >Cancel</Button>
            <Button
            color="blue"
            size="sm"
             onClick={async () => {
              await sendRequest(user._id);
              getConnections();
              getFriendStatus();
            }}
            >Remove Connection</Button>
          </div>
        </DialogBody>
      </Dialog>
    </div>
  );
}

export default SinglePeopleCardHorizontal;
