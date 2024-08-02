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
} from "@material-tailwind/react";
import SideBar from "../components/SideBar";
const EditDetails = () => {
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

  const navigate = useNavigate();

  useEffect(() => {
    getUserExperience();
    console.log(userAchievement);
  }, []);

  // const setToast = (msg, success) => {
  //   if (success) {
  //     toast.success(msg);
  //   } else toast.error(msg);
  // };

  // const handleAdd = () => {
  //   if (section === "Experience") {
  //     setSingleExperienceData({});
  //     setEditexp(true);
  //   } else if (section === "Education") {
  //     setSingleEducationData({});
  //     setEditEdu(true);
  //   } else if (section === "Certificates") {
  //     setSingleCertificateData({});
  //     setEditCert(true);
  //   } else if (section === "Achivements") {
  //     setSingleAchievementData({});
  //     setEditAchi(true);
  //   }
  // };

  return (
    <div className=" flex overflow-hidden bg-background h-screen">
      <SideBar />
      <Card className="w-[80%] h-full scrollbar-thin bg-white relative mx-auto mt-5">
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
          <div className="flex w-full justify-between bg-gray-50 p-1 rounded-md mt-4">
            <div
              className={`w-full text-center rounded-md cursor-pointer  ${
                section === "About" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setSection("About")}
            >
              <Typography className={`text-md mx-auto py-1 `}>About</Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Experience" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                getUserExperience();
                console.log(userExperience);
                setSection("Experience");
              }}
            >
              <Typography className={`text-md mx-auto py-1 `}>
                Experience
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Education" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                getUserEducation();
                console.log(userEducation);
                setSection("Education");
              }}
            >
              <Typography className={`text-md mx-auto py-1 `}>
                Education
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Certificates" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => {
                getUserCertificate();
                console.log(userCertificate);
                setSection("Certificates");
              }}
            >
              <Typography className={`text-md mx-auto py-1 `}>
                Certificates
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
              <Typography className={`text-md mx-auto py-1 `}>
                Achievements
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Posts" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setSection("Posts")}
            >
              <Typography className={`text-md mx-auto py-1 `}>Posts</Typography>
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
              <div className="pt-6">
                <Typography className="text-gray-800 text-md">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Beatae assumenda consequuntur, explicabo reprehenderit
                  voluptates a, veritatis nostrum velit excepturi dolore illo,
                  quos atque? Accusamus repudiandae error iure suscipit,
                  sapiente magni voluptatum sequi reiciendis odio sed, nemo quia
                  amet et. Veniam.
                </Typography>
              </div>
              <img src={About} className="w-1/2 mx-auto mt-10 opacity-30" />
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
                          onClick={handleExpEdit}
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
                  </>
                ) : (
                  <img
                    src={Experience}
                    className="w-1/2 mx-auto mt-10 opacity-30"
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
                          onClick={handleEduEdit}
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
                  </>
                ) : (
                  <img
                    src={Experience}
                    className="w-1/2 mx-auto mt-10 opacity-30"
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
                        className="pb-2 mb-2 border-b-2 rounded-none"
                      >
                        <div
                          className="absolute top-0 right-0 z-10 bg-white cursor-pointer"
                          onClick={handleCertEdit}
                        >
                          <FaRegEdit />
                        </div>
                        {certificate.certificate && (
                          <Typography className="text-gray-800 text-md">
                            {certificate.certificate}
                          </Typography>
                        )}
                        {certificate.issuer && (
                          <Typography className="text-gray-600 text-base">
                            {certificate.issuer}
                          </Typography>
                        )}
                        {certificate.description && (
                          <Typography className="text-gray-800 text-base my-2">
                            {certificate.description}
                          </Typography>
                        )}
                      </Card>
                    ))}
                  </>
                ) : (
                  <img
                    src={Certificates}
                    className="w-1/2 mx-auto mt-10 opacity-30"
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
                            onClick={handleAchiEdit}
                          >
                            <FaRegEdit />
                          </div>
                          {achievement.title && (
                            <Typography className="text-gray-800 text-md">
                              {achievement.title}
                            </Typography>
                          )}
                          {achievement.description && (
                            <Typography className="text-gray-800 text-base my-2">
                              {achievement.description}
                            </Typography>
                          )}
                        </Card>
                      ))}
                    </>
                  ) : (
                    <img
                      src={Achievements}
                      className="w-1/2 mx-auto mt-10 opacity-30"
                    />
                  )}
                </div>
              </div>
            </div>
          )}
          {section === "Posts" && (
            <>
              <img src={Posts} className="w-1/2 mx-auto mt-10 opacity-30" />
            </>
          )}
        </CardBody>
      </Card>

      {/* ABOUT EDIT */}
      <Dialog open={openAboutEdit} handler={handleAboutEdit} className="p-4">
        <div className="flex w-full justify-between items-start">
          <Typography className="text-2xl font-bold">Edit About</Typography>
          <IoClose
            className="cursor-pointer w-6 h-6"
            onClick={handleAboutEdit}
          />
        </div>
        <textarea className="border-[1px] border-gray-400 w-full rounded-md min-h-32 max-h-80 mt-4"></textarea>
        <Button size="sm" color="blue" className="mt-4">
          Save
        </Button>
      </Dialog>

      {/* EXPERIENCE EDIT */}
      {openExpEdit && (
        <EditExperience
          setOpenExpEdit={setOpenExpEdit}
          openExpEdit={openExpEdit}
        />
      )}
      {/* EDUCATION EDIT */}
      <Dialog open={openEduEdit} handler={handleEduEdit} className="p-4">
        <div className="flex w-full justify-between items-start">
          <Typography className="text-2xl font-bold">Edit Education</Typography>
          <IoClose className="cursor-pointer w-6 h-6" onClick={handleEduEdit} />
        </div>
        <div className="mt-2 grid grid-cols-2 gap-4">
          <div className="col-span-2">
            <Input label="Job Title" size="" />
          </div>
          <div className="col-span-2">
            <Input label="Company Name" size="" />
          </div>
          <div className="col-span-2">
            <Textarea label="Description" size="" />
          </div>
          <Input label="Start Date" size="" type="month" />
          <Input label="End Date" size="" type="month" />
        </div>
        <Button size="sm" color="blue" className="mt-4">
          Save
        </Button>
      </Dialog>

      {/* EDIT CERTIFICATES */}
      <Dialog open={openCertEdit} handler={handleCertEdit} className="p-4">
        <div className="flex w-full justify-between items-start">
          <Typography className="text-2xl font-bold">
            Edit Certificates
          </Typography>
          <IoClose
            className="cursor-pointer w-6 h-6"
            onClick={handleCertEdit}
          />
        </div>
        <div className="mt-2 grid grid-cols-1 gap-4">
          <Input label="Job Title" size="" />
          <Input label="Company Name" size="" />
          <Textarea label="Description" size="" />
        </div>
        <Button size="sm" color="blue" className="mt-4">
          Save
        </Button>
      </Dialog>

      {/* EDIT ACHIEVEMENTS */}
      <Dialog open={openAchiEdit} handler={handleAchiEdit} className="p-4">
        <div className="flex w-full justify-between items-start">
          <Typography className="text-2xl font-bold">
            Edit Achievements
          </Typography>
          <IoClose
            className="cursor-pointer w-6 h-6"
            onClick={handleAchiEdit}
          />
        </div>
        <div className="mt-2 grid grid-cols-1 gap-4">
          <Input label="Job Title" size="" />
          <Textarea label="Description" size="" />
        </div>
        <Button size="sm" color="blue" className="mt-4">
          Save
        </Button>
      </Dialog>
    </div>
  );
};

export default EditDetails;
