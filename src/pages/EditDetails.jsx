import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import EditExperience from "../components/EditExperience";
import EditEdu from "../components/EditEdu";
import EditCert from "../components/EditCert";
import EditAchi from "../components/EditAchi";
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { UserContext } from "../UserContext";
import About from "../assets/About.png";
import Experience from "../assets/Experience.png";
import Education from "../assets/Education.png";
import Certificates from "../assets/Certificates.png";
import Achievements from "../assets/Achievements.png";
import Posts from "../assets/Posts.png";
import { FaRegEdit } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import SinglePostCard from "../components/SinglePostCard";
import { BsInfoCircle } from "react-icons/bs";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaGraduationCap } from "react-icons/fa6";
import { GrCertificate } from "react-icons/gr";
import { FaAward } from "react-icons/fa6";
import { RiGalleryFill } from "react-icons/ri";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Avatar,
  Button,
  Dialog,
  Input,
  Textarea,
  DialogBody,
} from "@material-tailwind/react";
import SideBar from "../components/SideBar";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import ReactTimeAgo from "react-time-ago";
const EditDetails = () => {
  const {
    getUserExperience,
    userExperience,
    getUserEducation,
    userEducation,
    getUserCertificate,
    userCertificate,
    getUserAchievement,
    userAchievement,
    getUser,
    user,
  } = useContext(UserContext);

  const [section, setSection] = useState("About");
  const [openAboutEdit, setOpenAboutEdit] = useState(false);
  const [openExpEdit, setOpenExpEdit] = useState(false);
  const [openEduEdit, setOpenEduEdit] = useState(false);
  const [openCertEdit, setOpenCertEdit] = useState(false);
  const [openAchiEdit, setOpenAchiEdit] = useState(false);
  const [singleExperienceData, setSingleExperienceData] = useState({});
  const [singleEducationData, setSingleEducationData] = useState({});
  const [singleCertificateData, setSingleCertificateData] = useState({});
  const [singleAchievementData, setSingleAchievementData] = useState({});
  const [file, setFile] = useState(null);
  const [posts, setPosts] = useState([]);
  const userId = user._id;
  const [certExpand, setCertExpand] = useState(false);
  const [certURL, setCertURL] = useState("");

  const handleCertExpand = () => {
    setCertExpand(!certExpand);
  };

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
        console.log(res.error);
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
  }, [userId]);

  const handleAboutEdit = () => {
    setOpenAboutEdit(!openAboutEdit);
  };

  const handleExpEdit = () => {
    setOpenExpEdit(!openExpEdit);
  };

  const handleEduEdit = () => {
    setOpenEduEdit(!openEduEdit);
  };

  const handleCertEdit = () => {
    setOpenCertEdit(!openCertEdit);
  };

  const handleAchiEdit = () => {
    setOpenAchiEdit(!openAchiEdit);
  };

  const [about, setAbout] = useState(user.about);

  const navigate = useNavigate();

  useEffect(() => {
    getUserExperience();
  }, []);

  const setToast = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else toast.error(msg);
  };

  const handleSaveAbout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/update-profile/about`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          "Content-Type": "application/json",
        },

        body: JSON.stringify({ about }),
      });
      const res = await response.json();
      if (res.success) {
        getUser();
        handleAboutEdit();
        setToast("About updated successfully", true);
      }
    } catch (error) {
      setToast("Failed to update", false);
    }
  };

  return (
    <div className="flex overflow-hidden bg-background lg:h-[90vh] lg:pb-0 pb-5">
      <SideBar />
      <Card className="w-[95%] lg:w-[80%] h-full scrollbar-thin bg-white relative mx-auto mt-5">
        <div
          className="absolute top-1 right-4 z-10 bg-white cursor-pointer text-blue-400 underline"
          onClick={() => navigate(-1)}
        >
          Back to Profile
        </div>

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
              <Typography className={`text-md mx-auto py-1 hidden md:block`}>
                About
              </Typography>
              <Typography className="flex h-full justify-center items-center md:hidden">
                <BsInfoCircle className="w-5 h-5 my-1" />
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Experience" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                getUserExperience();
                setSection("Experience");
              }}
            >
              <Typography className={`text-md mx-auto py-1 hidden md:block `}>
                Experience
              </Typography>
              <Typography className="flex h-full justify-center items-center md:hidden">
                <BsBriefcaseFill className="w-5 h-5 my-1" />
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Education" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                getUserEducation();
                setSection("Education");
              }}
            >
              <Typography className={`text-md mx-auto py-1 hidden md:block `}>
                Education
              </Typography>
              <Typography className="flex h-full justify-center items-center md:hidden">
                <FaGraduationCap className="w-5 h-5 my-1" />
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Certificates" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                getUserCertificate();
                setSection("Certificates");
              }}
            >
              <Typography className={`text-md mx-auto py-1 hidden md:block `}>
                Certificates
              </Typography>
              <Typography className="flex h-full justify-center items-center md:hidden">
                <GrCertificate className="w-5 h-5 my-1" />
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Achievements" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                getUserAchievement();
                setSection("Achievements");
              }}
            >
              <Typography className={`text-md mx-auto py-1 hidden md:block `}>
                Achievements
              </Typography>
              <Typography className="flex h-full justify-center items-center md:hidden">
                <FaAward className="w-5 h-5 my-1" />
              </Typography>
            </div>
          </div>
        </CardHeader>

        <CardBody className="w-full max-h-[80vh] overflow-y-scroll scrollbar-thin ">
          {section === "About" && (
            <div className="relative">
              <div
                className="absolute top-0 right-0 z-10 bg-white cursor-pointer"
                onClick={handleAboutEdit}
              >
                <FaRegEdit />
              </div>
              {user && user.about ? (
                <div className="pt-6">
                  <Typography className="text-gray-800 text-md">
                    {user.about}
                  </Typography>
                  <img
                    src={About}
                    className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                  />
                </div>
              ) : (
                <img
                  src={About}
                  className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                />
              )}
            </div>
          )}
          {section === "Experience" && (
            <div className="">
              <div className="w-full flex justify-end">
                <Button
                  className="my-2 z-10 cursor-pointer"
                  onClick={handleExpEdit}
                  color="blue"
                  size="sm"
                >
                  Add Experience
                </Button>
              </div>
              <div className="pt-2">
                {userExperience ? (
                  <>
                    {userExperience.map((experience, key) => (
                      <Card
                        key={key}
                        shadow={false}
                        className="pb-2 mb-2 border-b-2 rounded-none relative"
                      >
                        <div
                          className="absolute top-0 right-0 z-10 bg-white cursor-pointer"
                          onClick={() => {
                            setSingleExperienceData(experience);
                            handleExpEdit();
                          }}
                        >
                          <FaRegEdit />
                        </div>
                        {experience.post && (
                          <Typography className="text-gray-800 text-md">
                            {experience.post}
                          </Typography>
                        )}
                        {experience.organization && (
                          <Typography className="text-gray-600 text-base">
                            {experience.organization}
                          </Typography>
                        )}
                        {experience.description && (
                          <Typography className="text-gray-800 text-base my-2">
                            {experience.description}
                          </Typography>
                        )}
                        <Typography className="text-gray-500 text-base italic">
                          {experience.startingMonth} - {experience.endingMonth}
                        </Typography>
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
              </div>
            </div>
          )}
          {section === "Education" && (
            <div className="">
              <div className="w-full flex justify-end">
                <Button
                  className="my-2 z-10 cursor-pointer"
                  onClick={handleEduEdit}
                  color="blue"
                  size="sm"
                >
                  Add Education
                </Button>
              </div>
              <div className="pt-2">
                {userEducation ? (
                  <>
                    {userEducation.map((education, key) => (
                      <Card
                        shadow={false}
                        key={key}
                        className="pb-2 mb-2 border-b-2 rounded-none relative"
                      >
                        <div
                          className="absolute top-0 right-0 z-10 bg-white cursor-pointer"
                          onClick={() => {
                            setSingleEducationData(education);
                            handleEduEdit();
                          }}
                        >
                          <FaRegEdit />
                        </div>
                        {education.course && (
                          <Typography className="text-gray-800 text-md">
                            {education.course}
                          </Typography>
                        )}
                        {education.organization && (
                          <Typography className="text-gray-600 text-base">
                            {education.organization}
                          </Typography>
                        )}
                        {education.description && (
                          <Typography className="text-gray-800 text-base my-2">
                            {education.description}
                          </Typography>
                        )}
                        <Typography className="text-gray-500 text-base italic">
                          {education.startingMonth} - {education.endingMonth}
                        </Typography>
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
              </div>
            </div>
          )}
          {section === "Certificates" && (
            <div className="">
              <div className="w-full flex justify-end">
                <Button
                  className="my-2 z-10 cursor-pointer"
                  onClick={handleCertEdit}
                  color="blue"
                  size="sm"
                >
                  Add Certificates
                </Button>
              </div>
              <div className="pt-2">
                {userCertificate.length != 0 ? (
                  <>
                    {userCertificate.map((certificate, key) => (
                      <Card
                        shadow={false}
                        key={key}
                        className="pb-2 mb-2 border-b-2 rounded-none"
                      >
                        <div
                          className="absolute top-0 right-0 z-10 bg-white cursor-pointer"
                          onClick={() => {
                            setSingleCertificateData(certificate);
                            handleCertEdit();
                          }}
                        >
                          <FaRegEdit />
                        </div>
                        {certificate?.certificate && (
                          <Typography className="text-gray-800 text-md">
                            {certificate?.certificate}
                          </Typography>
                        )}
                        {certificate?.issuer && (
                          <Typography className="text-gray-600 text-base">
                            {certificate?.issuer}
                          </Typography>
                        )}
                        {certificate?.certificateURL && (
                          <>
                            <object
                              data={`${certificate?.certificateURL}`}
                              className="h-28 w-40 object-contain cursor-pointer"
                              onClick={() => {
                                setCertURL(`${certificate?.certificateURL}`);  
                                handleCertExpand();
                              }}
                            />
                          </>
                        )}
                        {certificate?.description && (
                          <Typography className="text-gray-800 text-base my-2">
                            {certificate?.description}
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
              </div>
            </div>
          )}
          {section === "Achievements" && (
            <div>
              <div className="">
                <div className="w-full flex justify-end">
                  <Button
                    className="my-2 z-10 cursor-pointer"
                    onClick={handleAchiEdit}
                    color="blue"
                    size="sm"
                  >
                    Add Achievements
                  </Button>
                </div>
                <div className="pt-2">
                  {userAchievement.length != 0 ? (
                    <>
                      {userAchievement.map((achievement, key) => (
                        <Card
                          key={key}
                          shadow={false}
                          className="pb-2 mb-2 border-b-2 rounded-none"
                        >
                          <div
                            className="absolute top-0 right-0 z-10 bg-white cursor-pointer"
                            onClick={() => {
                              setSingleAchievementData(achievement);
                              handleAchiEdit();
                            }}
                          >
                            <FaRegEdit />
                          </div>
                          {achievement.achievement && (
                            <Typography className="text-gray-800 text-md">
                              {achievement.achievement}
                            </Typography>
                          )}
                          {achievement.description && (
                            <Typography className="text-gray-800 text-base my-2">
                              {achievement.description}
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
                </div>
              </div>
            </div>
          )}
          {section === "Posts" && (
            <div className="md:w-2/3 mx-auto">
              {posts.length > 0 ? (
                <>
                  {posts.map((post, key) => (
                    <SinglePostCard
                      post={post}
                      profileURL={user.profileURL}
                      profileId={userId}
                      userId={user._id}
                      postId={post._id}
                      name={user.name}
                      bio={user.bio}
                      postedAt={
                        <ReactTimeAgo date={post.updatedAt} locale="en-US" />
                      }
                      description={post.description}
                      img={post.fileURL}
                      getUserPosts={getUserPosts}
                      key={key}
                    />
                  ))}
                  <img
                    src={Posts}
                    className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                  />
                </>
              ) : (
                <>
                  <Typography className="text-gray-800 text-md">
                    Haven't posted anything yet
                  </Typography>
                  <img
                    src={Posts}
                    className="w-4/5 md:w-1/2 mx-auto mt-10 opacity-30"
                  />
                </>
              )}
            </div>
          )}
        </CardBody>
      </Card>

      {/* ABOUT EDIT */}
      <Dialog open={openAboutEdit} handler={handleAboutEdit} className="p-4">
        <div className="flex w-full justify-between items-start">
          <Typography className="text-2xl font-bold">Edit About</Typography>
          <IoClose
            className="cursor-pointer w-6 h-6"
            onClick={() => {
              setAbout(user.about);
              handleAboutEdit();
            }}
          />
        </div>
        <textarea
          value={about}
          onChange={(e) => setAbout(e.target.value)}
          className="border-[1px] border-gray-400 w-full rounded-md min-h-32 max-h-80 mt-4"
        ></textarea>
        <Button
          onClick={handleSaveAbout}
          size="sm"
          color="blue"
          className="mt-4"
        >
          Save
        </Button>
      </Dialog>

      {/* EXPERIENCE EDIT */}
      {openExpEdit && (
        <EditExperience
          setOpenExpEdit={setOpenExpEdit}
          openExpEdit={openExpEdit}
          singleExperienceData={singleExperienceData}
          getUserExperience={getUserExperience}
          setSingleExperienceData={setSingleExperienceData}
          setToast={setToast}
          handleExpEdit={handleExpEdit}
        />
      )}
      {/* EDUCATION EDIT */}
      <EditEdu
        setOpenEduEdit={setOpenEduEdit}
        openEduEdit={openEduEdit}
        singleEducationData={singleEducationData}
        getUserEducation={getUserEducation}
        setSingleEducationData={setSingleEducationData}
        setToast={setToast}
        handleEduEdit={handleEduEdit}
      />
      {/* EDIT CERTIFICATES */}
      <EditCert
        setOpenCertEdit={setOpenCertEdit}
        openCertEdit={openCertEdit}
        singleCertificateData={singleCertificateData}
        getUserCertificate={getUserCertificate}
        setSingleCertificateData={setSingleCertificateData}
        setToast={setToast}
        handleCertEdit={handleCertEdit}
      />
      {/* EDIT ACHIEVEMENTS */}
      <EditAchi
        setOpenAchiEdit={setOpenAchiEdit}
        openAchiEdit={openAchiEdit}
        singleAchievementData={singleAchievementData}
        getUserAchievement={getUserAchievement}
        setSingleAchievementData={setSingleAchievementData}
        setToast={setToast}
        handleAchiEdit={handleAchiEdit}
      />

      <Dialog open={certExpand} handler={handleCertExpand} className="bg-transparent shadow-none" shadow={false} >
        <DialogBody className="bg-transparent">
          <object data={certURL} className="w-full h-full object-cover" />
        </DialogBody>
      </Dialog>
      <Toaster position="top-right" />
    </div>
  );
};

export default EditDetails;
