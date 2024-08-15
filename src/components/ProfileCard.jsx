import React, { useContext, useEffect } from "react";
import profile2 from "../assets/profile2.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { useState } from "react";
// import EditProfile from "./EditProfile";
import altprofile from "../assets/altprofile.png";
import { FaRegEdit } from "react-icons/fa";
import { RiGalleryFill } from "react-icons/ri";
import { IoClose } from "react-icons/io5";
import { IoDocumentTextSharp } from "react-icons/io5";
import { Country, State, City } from "country-state-city";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Typography,
  Avatar,
  Button,
  Dialog,
  CardFooter,
} from "@material-tailwind/react";
import EditProfileNew from "./EditProfileNew";
import { UserContext } from "../UserContext";
import Resume from "../assets/Resume.pdf";

const ProfileCard = (props) => {
  const [check, setCheck] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  const handleOpenProfile = () => setOpenProfile(!openProfile);
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const { user } = useContext(UserContext);

  const [resume, setResume] = useState(Resume);
  const [number, setNumber] = useState("");

  // console.log(props.user);

  const handleResumeDownload = () => {
    const pdfUrl = resume;
    const link = document.createElement("a");  
    link.href = pdfUrl;
    link.download = `${props.user.name} Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};

  const handleNumber = (num) => {
    if (num.length <= 10) {
      setNumber(num);
    }
  };
  return (
    <>
      <Card className="min-w-80 bg-white p-4 h-min">
        {props.isExisting && (
          <div
            className="flex justify-end pt-2 px-2 -mt-4 -mr-4  cursor-pointer"
            onClick={handleOpenEdit}
          >
            <FaRegEdit />
          </div>
        )}
        <div className="flex flex-col">
          <CardHeader
            className="flex flex-col items-center m-0 pb-2 mb-2 rounded-none justify-around border-b-2"
            floated={false}
            shadow={false}
            color="transparent"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <Avatar
              src={props.user.profileURL ? props.user.profileURL : altprofile}
              size="xl"
              className="mb-3 cursor-pointer w-24 h-24"
              alt="profile"
              onClick={handleOpenProfile}
            />
            <div className="flex flex-col items-center">
              <Typography className="text-lg font-semibold">
                {props.user.name}
              </Typography>
              <Typography className="text-md">{props.user.bio}</Typography>
            </div>
          </CardHeader>
          <CardBody
            className={`flex flex-col px-4 py-1 ${
              props.route === "single-post" ? "" : "border-b-2"
            }`}
          >
            {props.user.location && (
              <div className="flex flex-row gap-1 items-center mb-1">
                <IoLocationSharp className="text-gray-700" />
                <Typography className="ml-2">{props.user.location}</Typography>
              </div>
            )}
            <div className="flex flex-row gap-1 items-center mb-1">
              <MdEmail className="text-gray-700" />
              <Typography className="ml-2">{props.user.email}</Typography>
            </div>
            {props.user.contact && (
              <div className="flex flex-row gap-1 items-center mb-1">
                <FaPhoneAlt className="text-gray-700" />
                <Typography className="ml-2">{props.user.contact}</Typography>
              </div>
            )}
            {props.user.linkedin && (
              <div className="flex flex-row gap-1 items-center mb-1">
                <FaLinkedinIn className="text-gray-700" />
                <Typography className="ml-2">{props.user.linkedin}</Typography>
              </div>
            )}
            {props.user.twitter && (
              <div className="flex flex-row gap-1 items-center mb-1">
                <FaXTwitter className="text-gray-700" />
                <Typography className="ml-2">{props.user.twitter}</Typography>
              </div>
            )}
          </CardBody>
          {props.route === "single-post" ? (
            ""
          ) : props.user._id === user._id ? (
            <CardBody className="flex flex-col px-4 py-2 border-b-2">
              <div className="flex flex-row gap-1 items-center mb-1 justify-between">
                <Typography className="">Saved Jobs</Typography>
                <Typography className="text-base text-white bg-blue-500 px-2 rounded-full">
                  38
                </Typography>
              </div>
              <div className="flex flex-row gap-1 items-center mb-1 justify-between">
                <Typography className="text-base">Posted Jobs</Typography>
                <Typography className="text-base text-white bg-blue-500 px-2 rounded-full">
                  08
                </Typography>
              </div>
              <div
                className={`flex flex-row gap-1 items-center mb-1 justify-between`}
              >
                <Typography className="text-base">Applied Jobs</Typography>
                <Typography className="text-base text-white bg-blue-500 px-2 rounded-full">
                  30
                </Typography>
              </div>
            </CardBody>
          ) : (
            ""
          )}

          <CardFooter
            className={`flex px-4 py-2 mt-2  ${
              props.user._id === user._id ? "justify-center" : "justify-between"
            }`}
          >
            {props.route === "single-post" ? (
              ""
            ) : (
              <Button variant="outlined" size="sm" color="blue" onClick={handleResumeDownload}>
                Resume
              </Button>
            )}
            {props.user._id === user._id ? (
              ""
            ) : (
              <>
                {props.statusValue == "Connect" && (
                  <Button
                    variant="filled"
                    onClick={() => props.sendRequest(props.user._id)}
                    size="sm"
                    color="blue"
                  >
                    {props.statusValue}
                  </Button>
                )}
                {props.statusValue == "Accept Request" && (
                  <Button
                    variant="filled"
                    onClick={() => props.acceptRequest(props.user._id)}
                    size="sm"
                    color="light-blue"
                  >
                    {props.statusValue}
                  </Button>
                )}
                {props.statusValue == "Connected" && (
                  <Button
                    variant="filled"
                    onClick={() => props.sendRequest(props.user._id)}
                    size="sm"
                    color="green"
                  >
                    {props.statusValue}
                  </Button>
                )}
                {props.statusValue == "Requested" && (
                  <Button
                    variant="outlined"
                    onClick={() => props.sendRequest(props.user._id)}
                    size="sm"
                    color="black"
                  >
                    {props.statusValue}
                  </Button>
                )}
              </>
            )}
          </CardFooter>
        </div>
      </Card>

      {/* OPEN PROFILE PICTURE */}
      <Dialog
        open={openProfile}
        handler={handleOpenProfile}
        className="flex justify-between p-4 gap-4 items-center border-8 border-blue-400"
        size="md"
      >
        <img
          src={props.user.profileURL ? props.user.profileURL : altprofile}
          className="w-80 h-80 object-cover "
          alt="profile"
        />
        <div className="w-full flex flex-col justify-center items-center">
          <Typography className="text-3xl font-bold">
            {props.user.name}
          </Typography>
          <Typography className="text-2xl text-left">
            {props.user.bio}
          </Typography>
        </div>
      </Dialog>

      {/* EDIT PROFILE */}
      {openEdit && props.isExisting && (
        <EditProfileNew
          user={props ? props.user : {}}
          openEdit={openEdit}
          setToast={props ? props.setToast : {}}
          setOpenEdit={setOpenEdit}
          getSingleUser={props ? props.getSingleUser : {}}
        />
      )}
    </>
  );
};

export default ProfileCard;
