import React, { useContext, useEffect, useId } from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
import Cookies from "js-cookie";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import About from "../assets/About.png";
import Experience from "../assets/Experience.png";
import Education from "../assets/Education.png";
import Certificates from "../assets/Certificates.png";
import Achievements from "../assets/Achievements.png";
import Posts from "../assets/Posts.png";
import { FaRegEdit } from "react-icons/fa";
import { SERVER_URL } from "../ServerURL";
import SinglePostCard from "./SinglePostCard";
import ReactTimeAgo from "react-time-ago";
import { BsInfoCircle } from "react-icons/bs";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { FaAward } from "react-icons/fa6";
import { RiGalleryFill } from "react-icons/ri";
const ProfileDetails = (props) => {
  const [section, setSection] = useState("About");
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const {
    getSingleUserExperience,
    singleUserExperience,
    getSingleUserEducation,
    singleUserEducation,
    getSingleUserCertificate,
    singleUserCertificate,
    getSingleUserAchievement,
    singleUserAchievement,
  } = useContext(UserContext);

  const userId = props.user._id;

  const getUserPosts = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/get-user-posts/${userId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();
      if (!res.success) {
        console.log(res?.error);
      } else {
        setPosts(res.data);
        // console.log(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserPosts();

    console.log(singleUserExperience);
    
  }, [userId]);

  return (
    <Card className="w-full h-full scrollbar-thin bg-white relative">
      {props?.isExisting && (
        <div
          className="absolute top-2 right-2 z-10 bg-white cursor-pointer"
          onClick={() => navigate("/editdetails")}
        >
          <FaRegEdit />
        </div>
      )}

      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="rounded-none"
      >
        <div className="flex w-full justify-between bg-gray-50 p-1 rounded-md mt-2">
          <div
            className={`w-full text-center rounded-md cursor-pointer  ${
              section === "About" ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => setSection("About")}
          >
            <Typography className={`text-md mx-auto py-1 hidden 2xl:block`}>
              About
            </Typography>
            <Typography className="flex h-full justify-center items-center 2xl:hidden">
              <BsInfoCircle className="w-5 h-5 my-1" />
            </Typography>
          </div>
          <div
            className={`w-full text-center rounded-md cursor-pointer ${
              section === "Experience" ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => {
              getSingleUserExperience(userId);
              setSection("Experience");
            }}
          >
            <Typography className={`text-md mx-auto py-1 hidden 2xl:block `}>
              Experience
            </Typography>
            <Typography className="flex h-full justify-center items-center 2xl:hidden">
              <BsBriefcaseFill className="w-5 h-5 my-1" />
            </Typography>
          </div>
          <div
            className={`w-full text-center rounded-md cursor-pointer ${
              section === "Education" ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => {
              getSingleUserEducation(userId);
              setSection("Education");
            }}
          >
            <Typography className={`text-md mx-auto py-1 hidden 2xl:block `}>
              Education
            </Typography>
            <Typography className="flex h-full justify-center items-center 2xl:hidden">
              <FaGraduationCap className="w-5 h-5 my-1" />
            </Typography>
          </div>
          <div
            className={`w-full text-center rounded-md cursor-pointer ${
              section === "Certificates" ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => {
              getSingleUserCertificate(userId);
              setSection("Certificates");
            }}
          >
            <Typography className={`text-md mx-auto py-1 hidden 2xl:block `}>
              Certificates
            </Typography>
            <Typography className="flex h-full justify-center items-center 2xl:hidden">
              <GrCertificate className="w-5 h-5 my-1" />
            </Typography>
          </div>
          <div
            className={`w-full text-center rounded-md cursor-pointer ${
              section === "Achievements" ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => {
              getSingleUserAchievement(userId);
              setSection("Achievements");
            }}
          >
            <Typography className={`text-md mx-auto py-1 hidden 2xl:block `}>
              Achievements
            </Typography>
            <Typography className="flex h-full justify-center items-center 2xl:hidden">
              <FaAward className="w-5 h-5 my-1" />
            </Typography>
          </div>
          <div
            className={`w-full text-center rounded-md cursor-pointer ${
              section === "Posts" ? "bg-blue-400 text-white" : ""
            }`}
            onClick={() => setSection("Posts")}
          >
            <Typography className={`text-md mx-auto py-1 hidden 2xl:block `}>
              Posts
            </Typography>
            <Typography className="flex h-full justify-center items-center 2xl:hidden">
              <RiGalleryFill className="w-5 h-5 my-1" />
            </Typography>
          </div>
        </div>
      </CardHeader>

      <CardBody className="w-full max-h-[70vh] overflow-y-scroll scrollbar-thin pt-4">
        {section === "About" && (
          <>
            {props.user.about ? (
              <Typography className="text-gray-800 text-md">
                {props.user.about}
                <img
                  src={About}
                  className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                />
              </Typography>
            ) : (
              <img
                src={About}
                className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
              />
            )}
          </>
        )}
        {section === "Experience" && (
          <>
            {singleUserExperience.length > 0 ? ( 
              <>
                {singleUserExperience.map((exp, key) => (
                  <Card
                    key={key}
                    shadow={false}
                    className="pb-2 mb-2 border-b-2 rounded-none"
                  >
                    {exp.post && (
                      <Typography className="text-gray-800 text-md">
                        {exp.post}
                      </Typography>
                    )}
                    {exp.organization && (
                      <Typography className="text-gray-600 text-base">
                        {exp.organization}
                      </Typography>
                    )}
                    {exp.description && (
                      <Typography className="text-gray-800 text-base my-2">
                        {exp.description}
                      </Typography>
                    )}
                    {exp.startingMonth && (
                      <Typography className="text-gray-500 text-base italic">
                        {exp.startingMonth} -{" "}
                        {exp.endingMonth ? exp.endingMonth : "present"}
                      </Typography>
                    )}
                  </Card>
                ))}
                <img
                  src={Experience}
                  className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                />
              </>
            ) : (
              <img
                src={Experience}
                className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
              />
            )}
          </>
        )}
        {section === "Education" && (
          <>
            {singleUserEducation.length > 0 ? (
              <>
                {singleUserEducation.map((edu, key) => (
                  <Card
                    shadow={false}
                    className="pb-2 mb-2 border-b-2 rounded-none"
                  >
                    {edu.course && (
                      <Typography className="text-gray-800 text-md">
                        {edu.course}
                      </Typography>
                    )}
                    {edu.organization && (
                      <Typography className="text-gray-600 text-base">
                        {edu.organization}
                      </Typography>
                    )}

                    {edu.startingMonth && (
                      <Typography className="text-gray-500 text-base italic">
                        {edu.startingMonth} -{" "}
                        {edu.endingMonth ? edu.endingMonth : "present"}
                      </Typography>
                    )}
                  </Card>
                ))}
                <img
                  src={Education}
                  className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                />
              </>
            ) : (
              <img
                src={Education}
                className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
              />
            )}
          </>
        )}
        {section === "Certificates" && (
          <>
            {singleUserCertificate.length > 0 ? (
              <>
                {singleUserCertificate.map((cert, key) => (
                  <Card
                    shadow={false}
                    className="pb-2 mb-2 border-b-2 rounded-none"
                  >
                    {cert.certificate && (
                      <Typography className="text-gray-800 text-md">
                        {cert.certificate}
                      </Typography>
                    )}
                    {cert.issuer && (
                      <Typography className="text-gray-600 text-base">
                        {cert.issuer}
                      </Typography>
                    )}
                    {cert.description && (
                      <Typography className="text-gray-800 text-base my-2">
                        {cert.description}
                      </Typography>
                    )}
                  </Card>
                ))}
                <img
                  src={Certificates}
                  className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                />
              </>
            ) : (
              <img
                src={Certificates}
                className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
              />
            )}
          </>
        )}
        {section === "Achievements" && (
          <>
            {singleUserAchievement.length > 0 ? (
              <>
                {singleUserAchievement.map((ach, key) => (
                  <Card
                    shadow={false}
                    className="pb-2 mb-2 border-b-2 rounded-none"
                  >
                    {ach.achievement && (
                      <Typography className="text-gray-800 text-md">
                        {ach.achievement}
                      </Typography>
                    )}
                    {ach.description && (
                      <Typography className="text-gray-800 text-base my-2">
                        {ach.description}
                      </Typography>
                    )}
                  </Card>
                ))}
                <img
                  src={Achievements}
                  className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                />
              </>
            ) : (
              <img
                src={Achievements}
                className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
              />
            )}
          </>
        )}
        {section === "Posts" && (
          <div className="w-2/3 mx-auto">
            {posts.length > 0 ? (
              <>
                {posts.map((post, key) => (
                  <SinglePostCard
                    key={key}
                    post={post}
                    profileURL={props.profileURL}
                    profileId={userId}
                    userId={user._id}
                    postId={post._id}
                    name={props.name}
                    bio={props.bio}
                    postedAt={
                      <ReactTimeAgo date={post.updatedAt} locale="en-US" />
                    }
                    description={post.description}
                    img={post.fileURL}
                    getUserPosts={getUserPosts}
                  />
                ))}
                <img src={Posts} className="w-1/2 mx-auto mt-10 opacity-30" />
              </>
            ) : (
              <>
                <Typography className="text-gray-800 text-md">
                  Haven't posted anything yet
                </Typography>
                <img src={Posts} className="w-1/2 mx-auto mt-10 opacity-30" />
              </>
            )}
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default ProfileDetails;
