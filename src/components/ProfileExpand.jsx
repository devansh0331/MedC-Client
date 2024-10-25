import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Button,
  Badge,
  Chip,
} from "@material-tailwind/react";
import { IoLocationSharp } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import altprofile from "../assets/altprofile.png";
import { useNavigate } from "react-router-dom";

const ProfileExpand = (props) => {
  const navigate = useNavigate();
  return (
    <div>
      <Card className="p-4 min-w-72">
        <CardHeader
          className="m-0 p-1 flex flex-col justify-center items-center border-b-2 rounded-none"
          shadow={false}
          floated={false}
        >
          <Avatar
            src={props.user?.profileURL ? props.user.profileURL : altprofile}
            alt="profile"
            className="w-36 h-36 rounded-full"
          />
          <Typography className="text-xl font-semibold mt-2">
            {props.user?.name ? props.user.name : "Unknown User"}
          </Typography>
        </CardHeader>
        <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
          <div className="">
            {props.user?.location && (
              <Typography className="flex items-center">
                <IoLocationSharp />
                <span className="ml-1">{props.user?.location}</span>
              </Typography>
            )}
            {props.user?.bio && (
              <Typography className="flex items-center">
                <BsBuildingsFill />
                <span className="ml-1">{props.user?.bio}</span>
              </Typography>
            )}
            {props.user?.email && (
              <Typography className="flex items-center">
                <MdEmail />
                <span className="ml-1">{props.user?.email}</span>
              </Typography>
            )}
          </div>
          {props.user?.about && (
            <div className="mt-3 text-sm text-gray-600">
              <Typography>{props.user?.about.slice(0, 145) + "..."}</Typography>
            </div>
          )}
        </CardBody>
        <CardFooter className="m-0 p-0 mt-3 mx-auto">
          <Button
            size="sm"
            className="px-2 py-1 font-light rounded-md mx-1"
            color="light-blue"
            onClick={() => navigate(`/user/${props.user._id}`)}
          >
            Visit Profile
          </Button>
          {props.isShortListing ? (
            <Button
              size="sm"
              className="px-2 py-1 font-light rounded-md mx-1"
              color="light-blue"
              variant="outlined"
              onClick={async () => {
                console.log(props.user.email);
                await props.setCandidateId(props.user?._id);
                await props.setCandidateEmail(props.user?.email);
                await props.shortListCandidate();
              }}
            >
              ShortList Candidate
            </Button>
          ) : (
            <Button
              size="sm"
              className="px-2 py-1 font-light rounded-md mx-1"
              color="light-blue"
              variant="outlined"
            >
              Hire Candidate
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileExpand;
