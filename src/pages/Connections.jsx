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
import { BsBuildingsFill } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import { ImProfile } from "react-icons/im";
import { IoPersonAddOutline } from "react-icons/io5";
import YouMayKnow from "../components/YouMayKnow";

const Connections = () => {
  return (
    <div className="relative w-screen h-screen overflow-hidden flex bg-background z-0">
      <SideBar route="feed" />
      <div className=" flex xl:w-[75%] w-[90%] m-auto justify-center">
        <div className="min-[1050px]:w-4/6 lg:w-5/6 w-full m-auto mt-20 mx-2">
          <div className="search">
            <Navbar className="flex flex-row" fullWidth shadow>
              <div className="flex md:flex-row flex-col md:w-full w-11/12 mr-2">
                <div className="relative flex md:w-3/5 w-full mr-2">
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
                <div className="relative flex md:w-2/5 w-full mr-2 max-[768px]:mt-2">
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
              </div>
              <Button
                size="sm"
                variant="outline"
                className="md:px-4 p-2 md:rounded-lg rounded-full  max-[768px]:w-8 max-[768px]:h-8 max-[768px]:mx-auto max-[768px]:ml-2"
              >
                <span className="md:hidden">
                  <IoMdSearch className="w-4 h-4" />
                </span>
                <span className="hidden md:block">Search</span>
              </Button>
            </Navbar>
          </div>
          <div className="flex flex-col max-h-[80vh] overflow-y-scroll scrollbar-thin w-full mt-1">
            <Card className="Connections my-2 flex flex-row p-4">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-r-none flex flex-col w-3/5"
              >
                <div className="flex flex-row gap-3 items-center">
                  <Avatar
                    src={altprofile}
                    alt="profile"
                    size="lg"
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <div className="">
                    <Typography className="font-bold">John Doe</Typography>
                    <Typography>Developer</Typography>
                  </div>
                </div>

                <div className="flex flex-row mt-2">
                  <ul className="flex sm:flex-row flex-col text-lg">
                    <li className="flex items-center my-1">
                      <IoLocationSharp />
                      <Typography className="ml-2">
                        Bhilai, Chattissgarh
                      </Typography>
                    </li>
                    <li className="flex items-center my-1 sm:ml-4">
                      <BsBuildingsFill />
                      <Typography className="ml-2">ABC Hospital</Typography>
                    </li>
                  </ul>
                </div>
              </CardHeader>

              <CardBody className="p-0 ml-auto">
                <Button
                  size="sm"
                  color="light-blue"
                  className="mr-2 md:px-4 p-2 md:rounded-lg rounded-full"
                  shadow
                  hover
                >
                  <span className="md:hidden">
                    <IoPersonAddOutline className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">Connect</span>
                </Button>
                <Button
                  size="sm"
                  color="light-blue"
                  variant="outlined"
                  className="md:px-4 p-2 md:rounded-lg rounded-full"
                >
                  <span className="md:hidden">
                    <ImProfile className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">View Profile</span>
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2 flex flex-row p-4">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-r-none flex flex-col w-3/5"
              >
                <div className="flex flex-row gap-3 items-center">
                  <Avatar
                    src={altprofile}
                    alt="profile"
                    size="lg"
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <div className="">
                    <Typography className="font-bold">John Doe</Typography>
                    <Typography>Developer</Typography>
                  </div>
                </div>

                <div className="flex flex-row mt-2">
                  <ul className="flex sm:flex-row flex-col text-lg">
                    <li className="flex items-center my-1">
                      <IoLocationSharp />
                      <Typography className="ml-2">
                        Bhilai, Chattissgarh
                      </Typography>
                    </li>
                    <li className="flex items-center my-1 sm:ml-4">
                      <BsBuildingsFill />
                      <Typography className="ml-2">ABC Hospital</Typography>
                    </li>
                  </ul>
                </div>
              </CardHeader>

              <CardBody className="p-0 ml-auto">
                <Button
                  size="sm"
                  color="light-blue"
                  className="mr-2 md:px-4 p-2 md:rounded-lg rounded-full"
                  shadow
                  hover
                >
                  <span className="md:hidden">
                    <IoPersonAddOutline className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">Connect</span>
                </Button>
                <Button
                  size="sm"
                  color="light-blue"
                  variant="outlined"
                  className="md:px-4 p-2 md:rounded-lg rounded-full"
                >
                  <span className="md:hidden">
                    <ImProfile className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">View Profile</span>
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2 flex flex-row p-4">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-r-none flex flex-col w-3/5"
              >
                <div className="flex flex-row gap-3 items-center">
                  <Avatar
                    src={altprofile}
                    alt="profile"
                    size="lg"
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <div className="">
                    <Typography className="font-bold">John Doe</Typography>
                    <Typography>Developer</Typography>
                  </div>
                </div>

                <div className="flex flex-row mt-2">
                  <ul className="flex sm:flex-row flex-col text-lg">
                    <li className="flex items-center my-1">
                      <IoLocationSharp />
                      <Typography className="ml-2">
                        Bhilai, Chattissgarh
                      </Typography>
                    </li>
                    <li className="flex items-center my-1 sm:ml-4">
                      <BsBuildingsFill />
                      <Typography className="ml-2">ABC Hospital</Typography>
                    </li>
                  </ul>
                </div>
              </CardHeader>

              <CardBody className="p-0 ml-auto">
                <Button
                  size="sm"
                  color="light-blue"
                  className="mr-2 md:px-4 p-2 md:rounded-lg rounded-full"
                  shadow
                  hover
                >
                  <span className="md:hidden">
                    <IoPersonAddOutline className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">Connect</span>
                </Button>
                <Button
                  size="sm"
                  color="light-blue"
                  variant="outlined"
                  className="md:px-4 p-2 md:rounded-lg rounded-full"
                >
                  <span className="md:hidden">
                    <ImProfile className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">View Profile</span>
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2 flex flex-row p-4">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-r-none flex flex-col w-3/5"
              >
                <div className="flex flex-row gap-3 items-center">
                  <Avatar
                    src={altprofile}
                    alt="profile"
                    size="lg"
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <div className="">
                    <Typography className="font-bold">John Doe</Typography>
                    <Typography>Developer</Typography>
                  </div>
                </div>

                <div className="flex flex-row mt-2">
                  <ul className="flex sm:flex-row flex-col text-lg">
                    <li className="flex items-center my-1">
                      <IoLocationSharp />
                      <Typography className="ml-2">
                        Bhilai, Chattissgarh
                      </Typography>
                    </li>
                    <li className="flex items-center my-1 sm:ml-4">
                      <BsBuildingsFill />
                      <Typography className="ml-2">ABC Hospital</Typography>
                    </li>
                  </ul>
                </div>
              </CardHeader>

              <CardBody className="p-0 ml-auto">
                <Button
                  size="sm"
                  color="light-blue"
                  className="mr-2 md:px-4 p-2 md:rounded-lg rounded-full"
                  shadow
                  hover
                >
                  <span className="md:hidden">
                    <IoPersonAddOutline className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">Connect</span>
                </Button>
                <Button
                  size="sm"
                  color="light-blue"
                  variant="outlined"
                  className="md:px-4 p-2 md:rounded-lg rounded-full"
                >
                  <span className="md:hidden">
                    <ImProfile className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">View Profile</span>
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2 flex flex-row p-4">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-r-none flex flex-col w-3/5"
              >
                <div className="flex flex-row gap-3 items-center">
                  <Avatar
                    src={altprofile}
                    alt="profile"
                    size="lg"
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <div className="">
                    <Typography className="font-bold">John Doe</Typography>
                    <Typography>Developer</Typography>
                  </div>
                </div>

                <div className="flex flex-row mt-2">
                  <ul className="flex sm:flex-row flex-col text-lg">
                    <li className="flex items-center my-1">
                      <IoLocationSharp />
                      <Typography className="ml-2">
                        Bhilai, Chattissgarh
                      </Typography>
                    </li>
                    <li className="flex items-center my-1 sm:ml-4">
                      <BsBuildingsFill />
                      <Typography className="ml-2">ABC Hospital</Typography>
                    </li>
                  </ul>
                </div>
              </CardHeader>

              <CardBody className="p-0 ml-auto">
                <Button
                  size="sm"
                  color="light-blue"
                  className="mr-2 md:px-4 p-2 md:rounded-lg rounded-full"
                  shadow
                  hover
                >
                  <span className="md:hidden">
                    <IoPersonAddOutline className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">Connect</span>
                </Button>
                <Button
                  size="sm"
                  color="light-blue"
                  variant="outlined"
                  className="md:px-4 p-2 md:rounded-lg rounded-full"
                >
                  <span className="md:hidden">
                    <ImProfile className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">View Profile</span>
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2 flex flex-row p-4">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-r-none flex flex-col w-3/5"
              >
                <div className="flex flex-row gap-3 items-center">
                  <Avatar
                    src={altprofile}
                    alt="profile"
                    size="lg"
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <div className="">
                    <Typography className="font-bold">John Doe</Typography>
                    <Typography>Developer</Typography>
                  </div>
                </div>

                <div className="flex flex-row mt-2">
                  <ul className="flex sm:flex-row flex-col text-lg">
                    <li className="flex items-center my-1">
                      <IoLocationSharp />
                      <Typography className="ml-2">
                        Bhilai, Chattissgarh
                      </Typography>
                    </li>
                    <li className="flex items-center my-1 sm:ml-4">
                      <BsBuildingsFill />
                      <Typography className="ml-2">ABC Hospital</Typography>
                    </li>
                  </ul>
                </div>
              </CardHeader>

              <CardBody className="p-0 ml-auto">
                <Button
                  size="sm"
                  color="light-blue"
                  className="mr-2 md:px-4 p-2 md:rounded-lg rounded-full"
                  shadow
                  hover
                >
                  <span className="md:hidden">
                    <IoPersonAddOutline className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">Connect</span>
                </Button>
                <Button
                  size="sm"
                  color="light-blue"
                  variant="outlined"
                  className="md:px-4 p-2 md:rounded-lg rounded-full"
                >
                  <span className="md:hidden">
                    <ImProfile className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">View Profile</span>
                </Button>
              </CardBody>
            </Card>
            <Card className="Connections my-2 flex flex-row p-4">
              <CardHeader
                shadow={false}
                floated={false}
                className="m-0 shrink-0 rounded-r-none flex flex-col w-3/5"
              >
                <div className="flex flex-row gap-3 items-center">
                  <Avatar
                    src={altprofile}
                    alt="profile"
                    size="lg"
                    className="w-12 h-12 md:w-16 md:h-16"
                  />
                  <div className="">
                    <Typography className="font-bold">John Doe</Typography>
                    <Typography>Developer</Typography>
                  </div>
                </div>

                <div className="flex flex-row mt-2">
                  <ul className="flex sm:flex-row flex-col text-lg">
                    <li className="flex items-center my-1">
                      <IoLocationSharp />
                      <Typography className="ml-2">
                        Bhilai, Chattissgarh
                      </Typography>
                    </li>
                    <li className="flex items-center my-1 sm:ml-4">
                      <BsBuildingsFill />
                      <Typography className="ml-2">ABC Hospital</Typography>
                    </li>
                  </ul>
                </div>
              </CardHeader>

              <CardBody className="p-0 ml-auto">
                <Button
                  size="sm"
                  color="light-blue"
                  className="mr-2 md:px-4 p-2 md:rounded-lg rounded-full"
                  shadow
                  hover
                >
                  <span className="md:hidden">
                    <IoPersonAddOutline className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">Connect</span>
                </Button>
                <Button
                  size="sm"
                  color="light-blue"
                  variant="outlined"
                  className="md:px-4 p-2 md:rounded-lg rounded-full"
                >
                  <span className="md:hidden">
                    <ImProfile className="w-4 h-4" />
                  </span>
                  <span className="hidden md:block">View Profile</span>
                </Button>
              </CardBody>
            </Card>
          </div>
        </div>
        <div className="w-2/6 mt-20 mx-2 lg:block hidden">
          <YouMayKnow />
        </div>
      </div>
    </div>
  );
};

export default Connections;

{
  /* <Card className="Connections my-2">
<CardBody
  shadow={false}
  floated={false}
  className="m-0 shrink-0 rounded-r-none flex p-4"
>
  <div className="flex flex-row gap-3 items-center w-1/2 border-r-2">
    <Avatar src={altprofile} alt="profile" size="xl" />
    <div className="">
      <Typography className="font-bold">John Doe</Typography>
      <Typography>Developer</Typography>
    </div>
  </div>

  <div className="flex flex-col w-1/2">
    <ul className="pl-4">
      <li className="flex items-center my-1">
        <IoLocationSharp />
        <Typography className="ml-2">
          Bhilai, Chattissgarh
        </Typography>
      </li>
      <li className="flex items-center my-1">
        <BsBuildingsFill />
        <Typography className="ml-2">ABC Hospital</Typography>
      </li>
    </ul>
  </div>
</CardBody>
<CardFooter className="flex -mt-3">
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
</CardFooter>
</Card> */
}
