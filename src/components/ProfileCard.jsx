import React, { useEffect } from "react";
import profile2 from "../assets/profile2.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { useState } from "react";
import EditProfile from "./EditProfile";
import altprofile from "../assets/altprofile.png";
import { FaRegEdit } from "react-icons/fa";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Button,
  IconButton,
} from "@material-tailwind/react";

const ProfileCard = (props) => {
  const [check, setCheck] = useState(false);

  return (
    <>
      <Card className="w-full">
        <div className="flex justify-end pt-2 px-2 m-0 cursor-pointer">
          <FaRegEdit onClick={() => props.setClose(!props.close)} />
        </div>
        {/* <Card className="flex min-w-1/2 bg-white p-4 flex-row"> */}
        <Card className="flex w-full bg-white p-4 flex-row">
          <CardHeader
            className="flex flex-col items-center m-0 w-2/5 rounded-none border-r-2"
            floated={false}
            shadow={false}
            color="transparent"
            animate={{
              mount: { scale: 1, y: 0 },
              unmount: { scale: 0.9, y: -100 },
            }}
          >
            <Avatar
              src={props.profileURL ? props.profileURL : altprofile}
              size="xl"
              className="mx-auto mb-3"
            />
            <Typography className="text-center text-lg font-semibold">
              {props.name}
            </Typography>
            <Typography className="text-md">{props.bio}</Typography>
          </CardHeader>
          <CardBody className="flex flex-col w-3/5 pl-4 py-1">
            <div className="flex flex-row gap-1 items-center mb-1">
              <IoLocationSharp />
              <Typography className="ml-2">{props.location}</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1">
              <MdEmail />
              <Typography className="ml-2">
                /{props.email.split("@")[0]}
              </Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1">
              <FaPhoneAlt />
              <Typography className="ml-2">{props.contact}</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1">
              <FaLinkedinIn />
              <Typography className="ml-2">{props.linkedin}</Typography>
            </div>
            <div className="flex flex-row gap-1 items-center mb-1">
              <FaXTwitter />
              <Typography className="ml-2">{props.twitter}</Typography>
            </div>
          </CardBody>
        </Card>
      </Card>
    </>
  );
};

export default ProfileCard;
