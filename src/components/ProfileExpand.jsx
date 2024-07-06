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

const ProfileExpand = () => {
  return (
    <div>
      <Card className="p-4">
        <CardHeader
          className="m-0 p-1 flex flex-col justify-center items-center border-b-2 rounded-none"
          shadow={false}
          floated={false}
        >
          <Avatar
            src={altprofile}
            alt="profile"
            className="w-36 h-36 rounded-full"
          />
          <Typography className="text-xl font-semibold mt-2">
            John Doe
          </Typography>
          <Typography className="text-lg">
            Lorem ipsum dolor sit amet.
          </Typography>
          <Chip value="Open to Work" size="sm" color="green" className="mt-2" />
        </CardHeader>
        <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
          <div className="">
            <Typography className="flex items-center">
              <IoLocationSharp />
              <span className="ml-1">Jaipur</span>
            </Typography>
            <Typography className="flex items-center">
              <BsBuildingsFill />
              <span className="ml-1">ABC Hospital</span>
            </Typography>
            <Typography className="flex items-center">
              <MdEmail />
              <span className="ml-1">JohnDoe@example.com</span>
            </Typography>
          </div>

          <div className="mt-3 text-sm text-gray-600">
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, ab
              dolorum aliquid in nemo reprehenderit molestias hic voluptate
              ducimus vero.
            </Typography>
          </div>
        </CardBody>
        <CardFooter className="m-0 p-0 mt-3 mx-auto">
          <Button
            size="sm"
            className="px-2 py-1 font-light rounded-md mx-1"
            color="light-blue"
          >
            Visit Profile
          </Button>
          <Button
            size="sm"
            className="px-2 py-1 font-light rounded-md mx-1"
            color="light-blue"
            variant="outlined"
          >
            Hire Candidate
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileExpand;
