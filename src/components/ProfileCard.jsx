import React, { useContext, useEffect } from "react";
import profile2 from "../assets/profile2.png";
import { FaFileDownload } from "react-icons/fa";
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
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  CardFooter,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Radio,
} from "@material-tailwind/react";
import EditProfileNew from "./EditProfileNew";
import { UserContext } from "../UserContext";
import Resume from "../assets/Resume.pdf";
import { useNavigate } from "react-router-dom";
import { FaEllipsisVertical } from "react-icons/fa6";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import ResumeDialog from "./ResumeDialog";

const ProfileCard = (props) => {
  const [check, setCheck] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openReport, setOpenReport] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [reportReason, setReportReason] = useState("");
  const CityArr = City.getCitiesOfCountry("IN");
  const StateArr = State.getStatesOfCountry("IN");
  const handleOpenProfile = () => setOpenProfile(!openProfile);
  const handleOpenEdit = () => setOpenEdit(!openEdit);
  const handleOpenMenu = () => setOpenMenu(!openEdit);
  const handleOpenReport = () => setOpenReport(!openReport);
  const { user } = useContext(UserContext);
  const [linkedin, setLinkedin] = useState(props.user.linkedin);
  const [twitter, setTwitter] = useState(props.user.twitter);
  const [resume, setResume] = useState(Resume);
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  const [openResumeDialog, setOpenResumeDialog] = useState(false);
  // console.log("user", user);
  
  const handleResumeDialog = () => {
    setOpenResumeDialog(!openResumeDialog);
  }
  const trimSocials = () => {
    if (props.user.linkedin?.includes("https://www.linkedin.com/in/")) {
      const username = props.user.linkedin.slice(28);
      // console.log("l1",username);
      setLinkedin(username);
    } else if (props.user.linkedin?.startsWith("www.linkedin.com/in/")) {
      const username = props.user.linkedin.slice(20);
      // console.log("l2",username);
      setLinkedin(username);
    } else {
      setLinkedin(props.user.linkedin);
    }
    if (props.user.twitter?.includes("https://x.com/")) {
      const username = props.user.twitter.slice(14);
      // console.log('t1',username);
      setTwitter(username);
    } else if (props.user.twitter?.startsWith("x.com/")) {
      const username = props.user.twitter.slice(6);
      // console.log('t2',username);
      setTwitter(username);
    } else if (props.user.twitter?.startsWith("https://twitter.com/")) {
      const username = props.user.twitter.slice(19);
      // console.log('t2',username);
      setTwitter(username);
    } else if (props.user.twitter?.startsWith("twitter.com/")) {
      const username = props.user.twitter.slice(12);
      // console.log('t2',username);
      setTwitter(username);
    } else {
      setTwitter(props.user.twitter);
    }
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (!selectedFile || selectedFile.type !== "application/pdf") {
      setResume(null);
      alert("Please select a PDF file!");
      return;
    }
    setResume(selectedFile);
  };

  useEffect(() => {
    trimSocials();
  }, [props.user]);   

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

  const handleReport = async () => {
    try {
      if (reportReason != "") {
        const res = await fetch(
          `${SERVER_URL}/report/add-report/${props.user._id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ reason: reportReason }),
          }
        );
        const parsedRes = await res.json();
        if (!parsedRes) props.setToast(parsedRes.error, false);
        else {
          if (!parsedRes.success) {
            props.setToast(parsedRes.error, false);
            handleOpenReport();
          } else {
            props.setToast(parsedRes.message, true);
            handleOpenReport();
          }
        }
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      <Card className="w-full lg:min-w-80 bg-white p-4 h-min mx-auto">
        {props.isExisting ? (
          <div
            className="flex justify-end pt-2 px-2 -mt-4 -mr-4  cursor-pointer"
            onClick={handleOpenEdit}
          >
            <FaRegEdit />
          </div>
        ) : (
          <div className="flex justify-end pt-2 px-2 -mt-4 -mr-4  cursor-pointer">
            <Typography className="text-sm md:text-base text-gray-900 md:text-gray-700">
              <Menu placement="bottom-start">
                <MenuHandler>
                  <button>
                    <FaEllipsisVertical className="cursor-pointer w-4 h-4 md:w-5 md:h-5" />
                  </button>
                </MenuHandler>
                <MenuList>
                  <MenuItem onClick={() => handleOpenReport()}>Report</MenuItem>
                </MenuList>
              </Menu>
            </Typography>
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
            <img
              src={props.user.profileURL ? props.user.profileURL : altprofile}
              className="mb-3 cursor-pointer w-24 h-24 aspect-square rounded-full profile-pic"
              alt="profile"
              onClick={handleOpenProfile}
            />
            <div className="flex flex-col items-center">
              {props.user.name && (
                <Typography className="text-lg font-semibold cursor-pointer" onClick={()=> navigate(`/user/${props.profileURL}`)}>
                  {props.user.name}
                </Typography>
              )}
              {props.user.bio && (
                <Typography className="text-md">{props.user.bio}</Typography>
              )}
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
            <div
              className="flex flex-row gap-1 items-center mb-1 cursor-pointer"
              onClick={() => window.open(`mailto:${props.user.email}`)}
            >
              <MdEmail className="text-gray-700" />
              {props.user.email && (
                <Typography className="ml-2">{props.user.email}</Typography>
              )}
            </div>
            {props.user.contact && (
              <div
                className="flex flex-row gap-1 items-center mb-1 cursor-pointer"
                onClick={() => window.open(`tel:${props.user.contact}`)}
              >
                <FaPhoneAlt className="text-gray-700" />
                <Typography className="ml-2">{props.user.contact}</Typography>
              </div>
            )}
            {props.user.linkedin && (
              <div
                className="flex flex-row gap-1 items-center mb-1 cursor-pointer"
                onClick={() =>
                  window.open(`https://www.linkedin.com/in/${linkedin}`)
                }
              >
                <FaLinkedinIn className="text-gray-700" />
                <Typography className="ml-2">{linkedin}</Typography>
              </div>
            )}
            {props.user.twitter && (
              <div
                className="flex flex-row gap-1 items-center mb-1 cursor-pointer"
                onClick={() => window.open(`https://twitter.com/${twitter}`)}
              >
                <FaXTwitter className="text-gray-700" />
                <Typography className="ml-2">{twitter}</Typography>
              </div>
            )}
          </CardBody>
          {props.route === "single-post" ? (
            ""
          ) : props.user._id === user._id ? (
            <CardBody className="flex flex-col px-4 py-2 border-b-2">
              <div
                className="flex flex-row gap-1 items-center mb-1 text-blue-800 justify-between cursor-pointer underline decoration-1 underline-offset-2"
                onClick={() => navigate("/job-actions")}
              >
                <Typography className="">Job Actions</Typography>
              </div>
              {/* <div
                className="flex flex-row gap-1 items-center mb-1 justify-between cursor-pointer"
                onClick={() => navigate("/user-saves")}
              >
                <Typography className="text-base">Posted Jobs</Typography>
              </div>
              <div
                className={`flex flex-row gap-1 items-center mb-1 justify-between cursor-pointer`}
                onClick={() => navigate("/user-saves")}
              >
                <Typography className="text-base">Applied Jobs</Typography>
              </div> */}
            </CardBody>
          ) : (
            ""
          )}
          <CardFooter
            className={`flex px-4 py-2 mt-2 justify-center`}
          >
            {props.route === "single-post" ? (
              ""
            ) : (
              <></>
            )}
            {props.user._id === user._id ? (
              <Button
                variant="outlined"
                size="sm"
                color="blue"
                onClick={handleResumeDialog}
              >
                My Resume
              </Button>
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
        className="flex flex-col sm:flex-row justify-between p-4 gap-4 items-center border-8 border-blue-400"
        
      >
        <img
          src={props.user.profileURL ? props.user.profileURL : altprofile}
          className="w-2/5 aspect-square profile-pic rounded-sm"
          alt="profile"
        />
        <div className="w-full flex flex-col justify-center items-center">
        {props?.user?.name &&
        <Typography className="text-3xl font-bold">
            {props?.user?.name}
          </Typography>
        }
        {props?.user?.bio &&
          <Typography className="text-2xl text-left">
            {props?.user?.bio}
          </Typography>
          }
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

      {/* OPEN REPORT DIALOG */}
      <Dialog
        open={openReport}
        handler={handleOpenReport}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader className="font-thin">
          Report an issue with "{props.user.name}"
        </DialogHeader>
        <DialogBody>
          <div className="grid grid-cols-1 ">
            <Radio
              name="description"
              value="Abbusive"
              label={
                <div>
                  <Typography color="blue-gray" className="font-medium">
                    Abbusive
                  </Typography>
                </div>
              }
              onClick={(e) => {
                console.log(e.target.value);
                setReportReason(e.target.value);
              }}
            />

            <Radio
              name="description"
              value="Fake Profile"
              label={
                <div>
                  <Typography color="blue-gray" className="font-medium">
                    Fake Profile
                  </Typography>
                </div>
              }
              onClick={(e) => {
                console.log(e.target.value);
                setReportReason(e.target.value);
              }}
            />
            <Radio
              name="description"
              value="Sexual Content"
              label={
                <div>
                  <Typography color="blue-gray" className="font-medium">
                    Sexual Content
                  </Typography>
                </div>
              }
              onClick={(e) => {
                console.log(e.target.value);
                setReportReason(e.target.value);
              }}
            />
            <Radio
              name="description"
              value="Spamming"
              label={
                <div>
                  <Typography color="blue-gray" className="font-medium">
                    Spamming
                  </Typography>
                </div>
              }
              onClick={(e) => {
                console.log(e.target.value);
                setReportReason(e.target.value);
              }}
            />
            <Radio
              name="description"
              value="User is not authorized"
              label={
                <div>
                  <Typography color="blue-gray" className="font-medium">
                    User is not authorized
                  </Typography>
                </div>
              }
              onClick={(e) => {
                console.log(e.target.value);
                setReportReason(e.target.value);
              }}
            />
          </div>
        </DialogBody>
        <DialogFooter className="gap-2">
          <Button
            variant="outlined"
            color="red"
            onClick={handleOpenReport}
            className=""
            size="sm"
          >
            <span>Cancel</span>
          </Button>
          <Button onClick={() => handleReport()} variant="gradient" color="red" size="sm">
            <span>Report</span>
          </Button>
        </DialogFooter>
      </Dialog>

      {/* OPEN RESUME DIALOG */}
      <ResumeDialog open={openResumeDialog} handler={handleResumeDialog} user={user} route="profile" title="My Resume" />
    </>
  );
};

export default ProfileCard;
