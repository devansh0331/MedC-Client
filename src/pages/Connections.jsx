import React from "react";
import SideBar from "../components/SideBar";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Navbar,
  Button,
  Input,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLink } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import YouMayKnow from "../components/YouMayKnow";

const Connections = () => {
  return (
    <div className="relative max-w-screen h-screen  flex bg-background">
      <SideBar
        className="z-20 absolute h-full left-0 sm:block hidden"
        route="feed"
      />
      <div className=" flex w-[75%] m-auto">
        <div className="w-4/6 m-auto mt-20 mx-2">
          <div className="search">
            <Navbar className="flex flex-row" fullWidth shadow>
              <div className="relative flex w-3/5 mr-2">
                <Input
                  type="search"
                  placeholder=""
                  className="pl-9 placeholder:text-blue-gray-100"
                  label="Search"
                />
                <div className="!absolute right-3 top-[10px]">
                  <IoMdSearch className="w-5 h-5 text-gray-600" />
                </div>
              </div>
              <div className="relative flex w-2/5 mr-2">
                <Input
                  type="search"
                  placeholder="Search Location"
                  className="  pl-9 placeholder:text-blue-gray-100 "
                  label="Search Location"
                />
                <div className="!absolute right-3 top-[11px]">
                  <IoLocationSharp className="w-5 h-4 text-gray-600" />
                </div>
              </div>
              <Button size="sm" variant="outline">
                Search
              </Button>
            </Navbar>
          </div>
          <div className="flex flex-col max-h-[80vh] overflow-y-scroll scrollbar-thin w-full">
            <Card className="Connections my-2">
              <Card className="flex-row p-3" shadow={false}>
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-3/5 shrink-0 rounded-r-none border-r-2"
                >
                  <div className="flex flex-row gap-3 items-center    ">
                    <Avatar src={altprofile} alt="profile" />
                    <div className="">
                      <Typography className="font-bold">John Doe</Typography>
                      <Typography>Developer</Typography>
                    </div>
                  </div>
                  <Typography className="gap-2 mt-2 mx-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse beatae voluptas aperiam cupiditate iure velit incidunt
                    ratione non.
                  </Typography>
                </CardHeader>
                <CardBody className="w-2/5">
                  <div>
                    <ul>
                      <li className="flex items-center my-1">
                        <IoLocationSharp />
                        <Typography className="ml-2">
                          Bhilai, Chattissgarh
                        </Typography>
                      </li>
                      <li className="flex items-center my-1">
                        <MdEmail />
                        <Typography className="ml-2">John@gmail.com</Typography>
                      </li>
                      <li className="flex items-center my-1">
                        <FaPhoneAlt />
                        <Typography className="ml-2">
                          +91 00000 00000
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
              <CardBody>
                <Button
                  size="sm"
                  color="light-blue"
                  className="mr-2"
                  shadow
                  hover
                >
                  Connect
                </Button>
                <Button size="sm" color="light-blue" variant="outlined">
                  View Profile
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2">
              <Card className="flex-row p-3" shadow={false}>
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-3/5 shrink-0 rounded-r-none border-r-2"
                >
                  <div className="flex flex-row gap-3 items-center    ">
                    <Avatar src={altprofile} alt="profile" />
                    <div className="">
                      <Typography className="font-bold">John Doe</Typography>
                      <Typography>Developer</Typography>
                    </div>
                  </div>
                  <Typography className="gap-2 mt-2 mx-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse beatae voluptas aperiam cupiditate iure velit incidunt
                    ratione non.
                  </Typography>
                </CardHeader>
                <CardBody className="w-2/5">
                  <div>
                    <ul>
                      <li className="flex items-center my-1">
                        <IoLocationSharp />
                        <Typography className="ml-2">
                          Bhilai, Chattissgarh
                        </Typography>
                      </li>
                      <li className="flex items-center my-1">
                        <MdEmail />
                        <Typography className="ml-2">John@gmail.com</Typography>
                      </li>
                      <li className="flex items-center my-1">
                        <FaPhoneAlt />
                        <Typography className="ml-2">
                          +91 00000 00000
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
              <CardBody>
                <Button size="sm" color="light-blue" className="mr-2">
                  Connect
                </Button>
                <Button size="sm" color="light-blue" variant="outlined">
                  View Profile
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2">
              <Card className="flex-row p-3" shadow={false}>
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-3/5 shrink-0 rounded-r-none border-r-2"
                >
                  <div className="flex flex-row gap-3 items-center    ">
                    <Avatar src={altprofile} alt="profile" />
                    <div className="">
                      <Typography className="font-bold">John Doe</Typography>
                      <Typography>Developer</Typography>
                    </div>
                  </div>
                  <Typography className="gap-2 mt-2 mx-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse beatae voluptas aperiam cupiditate iure velit incidunt
                    ratione non.
                  </Typography>
                </CardHeader>
                <CardBody className="w-2/5">
                  <div>
                    <ul>
                      <li className="flex items-center my-1">
                        <IoLocationSharp />
                        <Typography className="ml-2">
                          Bhilai, Chattissgarh
                        </Typography>
                      </li>
                      <li className="flex items-center my-1">
                        <MdEmail />
                        <Typography className="ml-2">John@gmail.com</Typography>
                      </li>
                      <li className="flex items-center my-1">
                        <FaPhoneAlt />
                        <Typography className="ml-2">
                          +91 00000 00000
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
              <CardBody>
                <Button size="sm" color="light-blue" className="mr-2">
                  Connect
                </Button>
                <Button size="sm" color="light-blue" variant="outlined">
                  View Profile
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2">
              <Card className="flex-row p-3" shadow={false}>
                <CardHeader
                  shadow={false}
                  floated={false}
                  className="m-0 w-3/5 shrink-0 rounded-r-none border-r-2"
                >
                  <div className="flex flex-row gap-3 items-center    ">
                    <Avatar src={altprofile} alt="profile" />
                    <div className="">
                      <Typography className="font-bold">John Doe</Typography>
                      <Typography>Developer</Typography>
                    </div>
                  </div>
                  <Typography className="gap-2 mt-2 mx-2">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Esse beatae voluptas aperiam cupiditate iure velit incidunt
                    ratione non.
                  </Typography>
                </CardHeader>
                <CardBody className="w-2/5">
                  <div>
                    <ul>
                      <li className="flex items-center my-1">
                        <IoLocationSharp />
                        <Typography className="ml-2">
                          Bhilai, Chattissgarh
                        </Typography>
                      </li>
                      <li className="flex items-center my-1">
                        <MdEmail />
                        <Typography className="ml-2">John@gmail.com</Typography>
                      </li>
                      <li className="flex items-center my-1">
                        <FaPhoneAlt />
                        <Typography className="ml-2">
                          +91 00000 00000
                        </Typography>
                      </li>
                    </ul>
                  </div>
                </CardBody>
              </Card>
              <CardBody>
                <Button size="sm" color="light-blue" className="mr-2">
                  Connect
                </Button>
                <Button size="sm" color="light-blue" variant="outlined">
                  View Profile
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="w-2/6 mt-20 mx-2">
          <YouMayKnow />
        </div>
      </div>
    </div>
  );
};

export default Connections;
