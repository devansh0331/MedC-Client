import {
  Avatar,
  Button,
  Card,
  CardBody,
  CardHeader,
  Dialog,
  DialogBody,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { BsBuildingsFill } from "react-icons/bs";
import { ImProfile } from "react-icons/im";
import { IoLocationSharp, IoPersonAddOutline } from "react-icons/io5";
import altprofile from "../assets/altprofile.png";
import { Link } from "react-router-dom";

function SinglePeopleCardHorizontal({
  user,
  activeTab,
  sendRequest,
  acceptRequest,
  getConnections,
  getSentRequests,
  getPendingRequests,
}) 
{
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);

  return (
    <Card className="Connections my-2 flex flex-row p-4">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 shrink-0 rounded-r-none flex flex-col lg:w-3/6 w-4/6"
      >
        <div className="flex flex-row gap-3 items-center">
          <Link to={`/user/${user._id}`}>
            <Avatar
              src={user.profileURL ? user.profileURL : altprofile}
              alt="Profile"
              size="lg"
              className="w-12 h-12 md:w-16 md:h-16"
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
      </CardHeader>

      <CardBody className="p-0 ml-auto">
        {activeTab == "Pending" && (
          <Button
            size="sm"
            color="light-blue"
            className="mr-2 xl:px-4 p-2 md:rounded-lg rounded-full"
            shadow
            hover
            onClick={async () => {
              await acceptRequest(user._id);
              getPendingRequests();
            }}
          >
            <span className="xl:hidden">
              <IoPersonAddOutline className="w-4 h-4" />
            </span>
            <span className="hidden xl:block">Accept Request</span>
          </Button>
        )}
        {activeTab == "Connections" && (
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
              <IoPersonAddOutline className="w-4 h-4" />
            </span>
            <span className="hidden xl:block">Connected</span>
          </Button>
        )}
        {activeTab == "Sent" && (
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
            }}
          >
            <span className="xl:hidden">
              <IoPersonAddOutline className="w-4 h-4" />
            </span>
            <span className="hidden xl:block">Requested</span>
          </Button>
        )}
        <Button
          size="sm"
          color="light-blue"
          variant="outlined"
          className="xl:px-4 p-2 xl:rounded-lg rounded-full"
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
            }}
            >Remove Connection</Button>
          </div>
        </DialogBody>
      </Dialog>
    </Card>
  );
}

export default SinglePeopleCardHorizontal;
