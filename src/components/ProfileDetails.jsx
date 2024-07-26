import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import { Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
 } from "@material-tailwind/react";
 import About from "../assets/About.png"
 import Experience from "../assets/Experience.png"
 import Education from "../assets/Education.png"
 import Certificates from "../assets/Certificates.png"
 import Achievements from "../assets/Achievements.png"
 import Posts from "../assets/Posts.png"
 import { FaRegEdit } from "react-icons/fa";

const ProfileDetails = (props) => {
  const [section, setSection] = useState("About");
  const navigate = useNavigate();
  const {
    getUserExperience,
    userExperience,
    getUserEducation,
    userEducation,
    getUserCertificate,
    userCertificate,
    getUserAchievement,
    userAchievement,
  } = useContext(UserContext);
  useEffect(() => {
    getUserExperience();
    getUserEducation();
    getUserAchievement();
    getUserCertificate();
  }, []);

  return (
    <Card className="w-full h-full scrollbar-thin bg-white relative"> 
     <div className="absolute top-2 right-2 z-10 bg-white cursor-pointer"><FaRegEdit /></div>
     
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="rounded-none">
          <div className="flex w-full justify-between bg-gray-50 p-1 rounded-md mt-2">
            <div className={`w-full text-center rounded-md cursor-pointer  ${section === "About" ? "bg-blue-400 text-white" : ""}`}
            onClick={() => setSection("About")}>
            <Typography className={`text-md mx-auto py-1 `}>About</Typography>
            </div>
            <div className={`w-full text-center rounded-md cursor-pointer ${section === "Experience" ? "bg-blue-400 text-white" : ""}`}
            onClick={() => setSection("Experience")}>
            <Typography className={`text-md mx-auto py-1 `}>Experience</Typography>
            </div>
            <div className={`w-full text-center rounded-md cursor-pointer ${section === "Education" ? "bg-blue-400 text-white" : ""}`}
            onClick={() => setSection("Education")}>
            <Typography className={`text-md mx-auto py-1 `}>Education</Typography>
            </div>
            <div className={`w-full text-center rounded-md cursor-pointer ${section === "Certificates" ? "bg-blue-400 text-white" : ""}`}
            onClick={() => setSection("Certificates")}>
            <Typography className={`text-md mx-auto py-1 `}>Certificates</Typography>
            </div>
            <div className={`w-full text-center rounded-md cursor-pointer ${section === "Achievements" ? "bg-blue-400 text-white" : ""}`}
            onClick={() => setSection("Achievements")}>
            <Typography className={`text-md mx-auto py-1 `}>Achievements</Typography>
            </div>
            <div className={`w-full text-center rounded-md cursor-pointer ${section === "Posts" ? "bg-blue-400 text-white" : ""}`}
            onClick={() => setSection("Posts")}>
            <Typography className={`text-md mx-auto py-1 `}>Posts</Typography>
            </div>
          </div>
      </CardHeader>

      <CardBody className="w-full max-h-[70vh] overflow-y-scroll scrollbar-thin pt-4">
        {section === "About" &&
          <>
          <Typography
          className="text-gray-800 text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae assumenda consequuntur, explicabo reprehenderit voluptates a, veritatis nostrum velit excepturi dolore illo, quos atque? Accusamus repudiandae error iure suscipit, sapiente magni voluptatum sequi reiciendis odio sed, nemo quia amet et. Veniam.
            </Typography>
          <Typography
          className="text-gray-800 text-md">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae assumenda consequuntur, explicabo reprehenderit voluptates a, veritatis nostrum velit excepturi dolore illo, quos atque? Accusamus repudiandae error iure suscipit, sapiente magni voluptatum sequi reiciendis odio sed, nemo quia amet et. Veniam.
            </Typography>
          <img src={About} className="w-1/2 mx-auto mt-10 opacity-30"/>
          </>
        }
        {section === "Experience" &&
        <>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
          <Typography className="text-gray-500 text-base italic">MM/YYYY - MM/YYYY</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
          <Typography className="text-gray-500 text-base italic">MM/YYYY - MM/YYYY</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
          <Typography className="text-gray-500 text-base italic">MM/YYYY - MM/YYYY</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
          <Typography className="text-gray-500 text-base italic">MM/YYYY - MM/YYYY</Typography>
        </Card>
        <img src={Experience} className="w-1/2 mx-auto mt-10 opacity-30"/>
        </>
        }
        {section === "Education" &&
        <>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
          <Typography className="text-gray-500 text-base italic">MM/YYYY - MM/YYYY</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
          <Typography className="text-gray-500 text-base italic">MM/YYYY - MM/YYYY</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
          <Typography className="text-gray-500 text-base italic">MM/YYYY - MM/YYYY</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
          <Typography className="text-gray-500 text-base italic">MM/YYYY - MM/YYYY</Typography>
        </Card>
        <img src={Education} className="w-1/2 mx-auto mt-10 opacity-30"/>
        </>
        }
        {section === "Certificates" &&
        <>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-600 text-base">Organisation</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <img src={Certificates} className="w-1/2 mx-auto mt-10 opacity-30"/>
        </>
        }
        {section === "Achievements" &&
        <>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <Card shadow={false} className="pb-2 mb-2 border-b-2 rounded-none">
          <Typography className="text-gray-800 text-md">Title</Typography>
          <Typography className="text-gray-800 text-base my-2">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id, error! Rem ullam accusamus voluptatum recusandae dolores reprehenderit quos facere mollitia.</Typography>
        </Card>
        <img src={Achievements} className="w-1/2 mx-auto mt-10 opacity-30"/>
        </>
        }
        {section === "Posts" &&
        <>
        <img src={Posts} className="w-1/2 mx-auto mt-10 opacity-30"/>
        </>
        }
      </CardBody>     
    </Card>
  );
};

export default ProfileDetails;
