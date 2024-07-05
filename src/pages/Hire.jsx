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

const Hire = () => {
    return (
        <div className="flex bg-background">
          <div className="flex xl:w-[75%] w-[90%] m-auto">
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
              <div className="grid grid-cols-3 max-h-[80vh] overflow-y-scroll scrollbar-thin w-full mt-1">
                <Card className="p-3 m-3">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2">
                        <Badge color="green" overlap="circular">
                    <Avatar src={altprofile} alt="altprofile" size="xl" className="w-24 h-24 mx-auto"/>
                        </Badge>
                    <Typography className="text-lg mt-2">John Doe</Typography>
                    <Typography className="text-sm">Lorem ipsum dolor sit amet.</Typography>
                  </CardHeader>
                  <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                    <Typography className="flex items-center">
                        <IoLocationSharp/>
                        <span className="ml-1">Jaipur</span>
                    </Typography>
                    <Typography className="flex items-center">
                        <BsBuildingsFill/>
                        <span className="ml-1">ABC Hospital</span>
                    </Typography>
                  </CardBody>
                  <CardFooter className="m-0 p-0 mt-3 mx-auto">
                    <Button size="sm" className="px-2 py-1 font-light rounded-md" color="light-blue">Show Details</Button>
                  </CardFooter>
                </Card>    
                <Card className="p-3 m-3">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2">
                        <Badge color="red" overlap="circular">
                    <Avatar src={altprofile} alt="altprofile" size="xl" className="w-24 h-24 mx-auto"/>
                        </Badge>
                    <Typography className="text-lg mt-2">John Doe</Typography>
                    <Typography className="text-sm">Lorem ipsum dolor sit amet.</Typography>
                  </CardHeader>
                  <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                    <Typography className="flex items-center">
                        <IoLocationSharp/>
                        <span className="ml-1">Jaipur</span>
                    </Typography>
                    <Typography className="flex items-center">
                        <BsBuildingsFill/>
                        <span className="ml-1">ABC Hospital</span>
                    </Typography>
                  </CardBody>
                  <CardFooter className="m-0 p-0 mt-3 mx-auto">
                    <Button size="sm" className="px-2 py-1 font-light rounded-md" color="light-blue">Show Details</Button>
                  </CardFooter>
                </Card>    
                <Card className="p-3 m-3">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2">
                        <Badge color="green" overlap="circular">
                    <Avatar src={altprofile} alt="altprofile" size="xl" className="w-24 h-24 mx-auto"/>
                        </Badge>
                    <Typography className="text-lg mt-2">John Doe</Typography>
                    <Typography className="text-sm">Lorem ipsum dolor sit amet.</Typography>
                  </CardHeader>
                  <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                    <Typography className="flex items-center">
                        <IoLocationSharp/>
                        <span className="ml-1">Jaipur</span>
                    </Typography>
                    <Typography className="flex items-center">
                        <BsBuildingsFill/>
                        <span className="ml-1">ABC Hospital</span>
                    </Typography>
                  </CardBody>
                  <CardFooter className="m-0 p-0 mt-3 mx-auto">
                    <Button size="sm" className="px-2 py-1 font-light rounded-md" color="light-blue">Show Details</Button>
                  </CardFooter>
                </Card>    
                <Card className="p-3 m-3">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2">
                        <Badge color="red" overlap="circular">
                    <Avatar src={altprofile} alt="altprofile" size="xl" className="w-24 h-24 mx-auto"/>
                        </Badge>
                    <Typography className="text-lg mt-2">John Doe</Typography>
                    <Typography className="text-sm">Lorem ipsum dolor sit amet.</Typography>
                  </CardHeader>
                  <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                    <Typography className="flex items-center">
                        <IoLocationSharp/>
                        <span className="ml-1">Jaipur</span>
                    </Typography>
                    <Typography className="flex items-center">
                        <BsBuildingsFill/>
                        <span className="ml-1">ABC Hospital</span>
                    </Typography>
                  </CardBody>
                  <CardFooter className="m-0 p-0 mt-3 mx-auto">
                    <Button size="sm" className="px-2 py-1 font-light rounded-md" color="light-blue">Show Details</Button>
                  </CardFooter>
                </Card>    
                <Card className="p-3 m-3">
                  <CardHeader
                    floated={false}
                    shadow={false}
                    color="transparent"
                    className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2">
                        <Badge color="green" overlap="circular">
                    <Avatar src={altprofile} alt="altprofile" size="xl" className="w-24 h-24 mx-auto"/>
                        </Badge>
                    <Typography className="text-lg mt-2">John Doe</Typography>
                    <Typography className="text-sm">Lorem ipsum dolor sit amet.</Typography>
                  </CardHeader>
                  <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
                    <Typography className="flex items-center">
                        <IoLocationSharp/>
                        <span className="ml-1">Jaipur</span>
                    </Typography>
                    <Typography className="flex items-center">
                        <BsBuildingsFill/>
                        <span className="ml-1">ABC Hospital</span>
                    </Typography>
                  </CardBody>
                  <CardFooter className="m-0 p-0 mt-3 mx-auto">
                    <Button size="sm" className="px-2 py-1 font-light rounded-md" color="light-blue">Show Details</Button>
                  </CardFooter>
                </Card>    
                
              </div>
            </div>
            <div className="w-2/6 mt-20 mx-2">
              <ProfileExpand/>
            </div>
          </div>
        </div>
      );
};

export default Hire;
