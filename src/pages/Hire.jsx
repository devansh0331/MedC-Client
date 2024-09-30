import React, { useContext, useEffect, useState } from "react";
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
  Dialog,
} from "@material-tailwind/react";
import altprofile from "../assets/altprofile.png";
import { IoLocationSharp } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import YouMayKnow from "../components/YouMayKnow";
import ProfileExpand from "../components/ProfileExpand";
import SideBar from "../components/SideBar";
import { UserContext } from "../UserContext";

const Hire = () => {

  const {allUsers, getAllUsers, userInfo} = useContext(UserContext);
  const [userExpand, setUserExpand] = useState({});
  const [profileExpand, setProfileExpand] = useState(false);

  const handleProfileExpand = () => {
    setProfileExpand(!profileExpand);
  };
  
  useEffect(() => {
    getAllUsers(); 
  }, [userInfo]);
  
  useEffect(() => {
    setUserExpand(allUsers[0]);
  }, [allUsers]);

  return (
    <div className="flex overflow-y-hidden z-0 bg-background overflow-x-hidden h-[90vh]">
      <SideBar route="feed" />
      <div className="flex 2xl:w-[75%] xl:w-[85%] w-[90%] mx-auto">
        <div className="w-full lg:w-4/6 m-auto mt-4 mx-2 overflow-y-scroll max-h-[85vh] scrollbar-thin">
          <div className="search">
            <Navbar
              className="flex flex-col md:flex-row rounded-md items-center"
              fullWidth
              shadow
            >
              <div className="relative flex w-full md:w-3/5 mr-2  my-1 md:my-0">
                <Input
                  type="search"
                  placeholder=""
                  className=" placeholder:text-blue-gray-100"
                  label="Search Name"
                  icon={<IoMdSearch/>}
                />
              </div>
              <div className="relative flex w-full md:w-3/5 mr-2  my-1 md:my-0">
                <Input
                  type="search"
                  placeholder="Search Location"
                  className="  placeholder:text-blue-gray-100 "
                  label="Search Location"
                  icon={<IoLocationSharp />}
                />
              </div>
              <button type="button" className="select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none  my-1 md:my-0">
                Search
              </button>
            </Navbar>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 w-full mt-1">
            {allUsers.map((user, index) => ( 
             <>
             {user.name != "" ? (    
            <Card className="p-3 m-3 flex flex-col gap-3 justify-between" key={index}>
              <CardHeader
                floated={false}
                shadow={false}
                color="transparent"
                className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2 "
              >
                <Badge color="green" overlap="circular" invisible>
                  <Avatar
                    src={user.profileURL ? user.profileURL : altprofile}
                    alt="altprofile"
                    size="xl"
                    className="w-24 h-24 mx-auto"
                  />
                </Badge>
                <Typography className="text-lg mt-2">{user.name}</Typography>
              </CardHeader>
              {user.location || user.bio ? (  
              <CardBody className="m-0 p-0 border-b-2 rounded-none pb-2">
                {user.bio && (

                  <Typography className="flex items-center">
                  <BsBuildingsFill />
                  <span className="ml-1">{user.bio}</span>
                </Typography>
                )}
                {user.location && (
                  <Typography className="flex items-center">
                  <IoLocationSharp />
                  <span className="ml-1">{user.location}</span>
                </Typography>
                )}          
              </CardBody>
              ): null}
              <CardFooter className="m-0 p-0 mx-auto">
                <Button
                  size="sm"
                  className="px-2 py-1 font-light rounded-md hidden lg:block"
                  color="light-blue"
                  onClick={() => setUserExpand(user)}
                >
                  Show Details 
                </Button>
                <Button
                  size="sm"
                  className="px-2 py-1 font-light rounded-md lg:hidden block"
                  color="light-blue"
                  onClick={() => {setUserExpand(user); handleProfileExpand();}}
                >
                  Show Details
                </Button>
              </CardFooter>
            </Card>
              ) : null}
             </>
            ))}
          </div>
        </div>
        <div className="hidden lg:block w-2/6 mt-4 mx-2">
          <ProfileExpand user={userExpand} />
        </div>
      </div>
      <Dialog open={profileExpand} handler={handleProfileExpand} className="bg-transparent shadow-none" size="xs">
        <ProfileExpand user={userExpand} />
      </Dialog>
    </div>
  );
};

export default Hire;
