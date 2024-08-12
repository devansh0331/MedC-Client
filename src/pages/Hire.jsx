import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Navbar,
  Button,
  Input,
  CardFooter,
  Badge,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { IoLocationSharp } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import YouMayKnow from "../components/YouMayKnow";
import ProfileExpand from "../components/ProfileExpand";
import SideBar from "../components/SideBar";

const Hire = () => {
  return (
    <div className="flex overflow-y-hidden z-0 bg-background">
      <SideBar route="feed" />
      <div className="flex xl:w-[75%] w-[90%] mx-auto">
        <div className="w-full md:w-4/6 m-auto mt-4 mx-2">
          <div className="search">
            <Navbar
              className="flex flex-col md:flex-row rounded-md items-center"
              fullWidth
              shadow
            >
              <div className="relative flex w-full md:w-3/5 mr-2">
                <Input
                  type="search"
                  placeholder=""
                  className=" placeholder:text-blue-gray-100"
                  label="Search Name"
                  icon={<IoMdSearch/>}
                />
              </div>
              <div className="relative flex w-full md:w-3/5 mr-2">
                <Input
                  type="search"
                  placeholder="Search Location"
                  className="  placeholder:text-blue-gray-100 "
                  label="Search Location"
                  icon={<IoLocationSharp />}
                />
              </div>
              <button type="button" className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none">
                Search
              </button>
            </Navbar>
          </div>
          <div className="grid md:grid-cols-3 overflow-y-scroll max-h-[75vh] scrollbar-thin w-full mt-1">
            <Card className="p-3 m-3">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2"
              >
                <Badge color="green" overlap="circular">
                  <Avatar
                    src={altprofile}
                    alt="altprofile"
                    size="xl"
                    className="w-24 h-24 mx-auto"
                  />
                </Badge>
                <Typography className="text-lg mt-2">John Doe</Typography>
                <Typography className="text-sm">
                  Lorem ipsum dolor sit amet.
                </Typography>
              </CardHeader>
              <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                <Typography className="flex items-center">
                  <IoLocationSharp />
                  <span className="ml-1">Jaipur</span>
                </Typography>
                <Typography className="flex items-center">
                  <BsBuildingsFill />
                  <span className="ml-1">ABC Hospital</span>
                </Typography>
              </CardBody>
              <CardFooter className="m-0 p-0 mt-3 mx-auto">
                <Button
                  size="sm"
                  className="px-2 py-1 font-light rounded-md"
                  color="light-blue"
                >
                  Show Details
                </Button>
              </CardFooter>
            </Card>
            <Card className="p-3 m-3">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2"
              >
                <Badge color="red" overlap="circular">
                  <Avatar
                    src={altprofile}
                    alt="altprofile"
                    size="xl"
                    className="w-24 h-24 mx-auto"
                  />
                </Badge>
                <Typography className="text-lg mt-2">John Doe</Typography>
                <Typography className="text-sm">
                  Lorem ipsum dolor sit amet.
                </Typography>
              </CardHeader>
              <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                <Typography className="flex items-center">
                  <IoLocationSharp />
                  <span className="ml-1">Jaipur</span>
                </Typography>
                <Typography className="flex items-center">
                  <BsBuildingsFill />
                  <span className="ml-1">ABC Hospital</span>
                </Typography>
              </CardBody>
              <CardFooter className="m-0 p-0 mt-3 mx-auto">
                <Button
                  size="sm"
                  className="px-2 py-1 font-light rounded-md"
                  color="light-blue"
                >
                  Show Details
                </Button>
              </CardFooter>
            </Card>
            <Card className=" p-3 m-3">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2"
              >
                <Badge color="green" overlap="circular">
                  <Avatar
                    src={altprofile}
                    alt="altprofile"
                    size="xl"
                    className="w-24 h-24 mx-auto"
                  />
                </Badge>
                <Typography className="text-lg mt-2">John Doe</Typography>
                <Typography className="text-sm">
                  Lorem ipsum dolor sit amet.
                </Typography>
              </CardHeader>
              <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                <Typography className="flex items-center">
                  <IoLocationSharp />
                  <span className="ml-1">Jaipur</span>
                </Typography>
                <Typography className="flex items-center">
                  <BsBuildingsFill />
                  <span className="ml-1">ABC Hospital</span>
                </Typography>
              </CardBody>
              <CardFooter className="m-0 p-0 mt-3 mx-auto">
                <Button
                  size="sm"
                  className="px-2 py-1 font-light rounded-md"
                  color="light-blue"
                >
                  Show Details
                </Button>
              </CardFooter>
            </Card>
            <Card className="p-3 m-3">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2"
              >
                <Badge color="red" overlap="circular">
                  <Avatar
                    src={altprofile}
                    alt="altprofile"
                    size="xl"
                    className="w-24 h-24 mx-auto"
                  />
                </Badge>
                <Typography className="text-lg mt-2">John Doe</Typography>
                <Typography className="text-sm">
                  Lorem ipsum dolor sit amet.
                </Typography>
              </CardHeader>
              <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                <Typography className="flex items-center">
                  <IoLocationSharp />
                  <span className="ml-1">Jaipur</span>
                </Typography>
                <Typography className="flex items-center">
                  <BsBuildingsFill />
                  <span className="ml-1">ABC Hospital</span>
                </Typography>
              </CardBody>
              <CardFooter className="m-0 p-0 mt-3 mx-auto">
                <Button
                  size="sm"
                  className="px-2 py-1 font-light rounded-md"
                  color="light-blue"
                >
                  Show Details
                </Button>
              </CardFooter>
            </Card>
            <Card className="p-3 m-3">
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2"
              >
                <Badge color="green" overlap="circular">
                  <Avatar
                    src={altprofile}
                    alt="altprofile"
                    size="xl"
                    className="w-24 h-24 mx-auto"
                  />
                </Badge>
                <Typography className="text-lg mt-2">John Doe</Typography>
                <Typography className="text-sm">
                  Lorem ipsum dolor sit amet.
                </Typography>
              </CardHeader>
              <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                <Typography className="flex items-center">
                  <IoLocationSharp />
                  <span className="ml-1">Jaipur</span>
                </Typography>
                <Typography className="flex items-center">
                  <BsBuildingsFill />
                  <span className="ml-1">ABC Hospital</span>
                </Typography>
              </CardBody>
              <CardFooter className="m-0 p-0 mt-3 mx-auto">
                <Button
                  size="sm"
                  className="px-2 py-1 font-light rounded-md"
                  color="light-blue"
                >
                  Show Details
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <div className="hidden md:block w-2/6 mt-4 mx-2">
          <ProfileExpand />
        </div>
      </div>
    </div>
  );
};

export default Hire;
