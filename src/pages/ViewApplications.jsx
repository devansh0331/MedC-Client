import React, { useContext, useEffect, useState } from 'react'
import SideBar from '../components/SideBar'
import JobCardSingle from '../components/JobCardSingle'
import { UserContext } from '../UserContext'
import { Avatar, Badge, Button, Card, CardBody, CardFooter, CardHeader, Typography } from '@material-tailwind/react'
import altprofile from "../assets/altprofile.png";
import { IoLocationSharp } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { IoMdSearch } from "react-icons/io";
import YouMayKnow from "../components/YouMayKnow";
import ProfileExpand from "../components/ProfileExpand";
import { SERVER_URL } from '../ServerURL'

const ViewApplications = () => {
  const [jobs,setJobs] = useState([])
  const [userExpand, setUserExpand] = useState({});
  const {allUsers, getAllUsers, userInfo} = useContext(UserContext);

  const getAllJobs = async() => {
    try {
      const response = await fetch(`${SERVER_URL}/job/all-jobs`,{
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      const res = await response.json();
      // console.log(res)
      if(res.success){
        setJobs(res.jobs);
      }
    }
     catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getAllJobs();
  }, [])

  useEffect(() => {
    getAllUsers(); 
  }, [userInfo]);

  return (
    <div className='flex overflow-y-hidden z-0 bg-background h-[90vh]'>
        <SideBar />
        <div className='flex w-[95%] 2xl:w-[90%] mx-auto h-full gap-6 justify-center mt-5'>
          <div className="w-1/3">
            <JobCardSingle job={jobs[0]} route={"ViewApplications"} />
          </div>
            <div className="grid md:grid-cols-2 overflow-y-scroll max-h-[80vh] scrollbar-thin w-1/2 gap-3">
            {allUsers.map((user, index) => ( 
             <>
             {user.name != "" ? (    
            <Card className="p-3 flex flex-col gap-3 justify-between" key={index}>
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
                  className="px-2 py-1 font-light rounded-md"
                  color="light-blue"
                  onClick={() => setUserExpand(user)}
                >
                  Show Details
                </Button>
              </CardFooter>
            </Card>
              ) : null}
             </>
            ))}
          </div>
          <div className="w-1/4">
          <ProfileExpand user={userExpand}/>
          </div>
        </div>
    </div>
  )
}

export default ViewApplications
