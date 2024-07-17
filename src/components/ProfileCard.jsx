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
    <Card className="">
      <div className="flex justify-end pt-2 px-2 m-0 cursor-pointer"><FaRegEdit /></div>
   <Card className="flex min-w-96 bg-white p-4 flex-row">
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
      <Avatar src={altprofile} size="xl" className="mx-auto mb-3"/>
      <Typography className="text-lg font-semibold">John Doe</Typography>
      <Typography className="text-md">Developer</Typography>
     </CardHeader>
     <CardBody className="flex flex-col w-3/5 px-4 py-1">
      <div className="flex flex-row gap-1 items-center mb-1">
          <IoLocationSharp/>
          <Typography className="ml-2">Bhilai, Chattissgarh</Typography>
      </div>
      <div className="flex flex-row gap-1 items-center mb-1">
          <MdEmail/>
          <Typography className="ml-2">johndoe@gmail.com</Typography>
      </div>
      <div className="flex flex-row gap-1 items-center mb-1">
          <FaPhoneAlt/>
          <Typography className="ml-2">+91 123456789</Typography>
      </div>
      <div className="flex flex-row gap-1 items-center mb-1">
          <FaLinkedinIn/>
          <Typography className="ml-2">linkedin</Typography>
      </div>
      <div className="flex flex-row gap-1 items-center mb-1">
          <FaXTwitter/>
          <Typography className="ml-2">twitter</Typography>
      </div>
     </CardBody>
   </Card>
    </Card>
    </>

  );
};

export default ProfileCard;
