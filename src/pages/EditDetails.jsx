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
} from "@material-tailwind/react";
import SideBar from "../components/SideBar";
const EditDetails = () => {
  const [section, setSection] = useState("About");
  const [openAboutEdit, setOpenAboutEdit] = useState(false);
  const [openExpEdit, setOpenExpEdit] = useState(false);
  const [openEduEdit, setOpenEduEdit] = useState(false);
  const [editAchi, setEditAchi] = useState(false);
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
    <div className="flex overflow-hidden bg-background h-screen">
      <SideBar />
      <Card className="w-[80%] h-full scrollbar-thin bg-white relative mx-auto mt-5">
        <div
          className="absolute top-1 right-4 z-10 bg-white cursor-pointer text-blue-400 underline"
          onClick={() => navigate("/profile")}
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
              onClick={() => setSection("Experience")}
            >
              <Typography className={`text-md mx-auto py-1 `}>
                Experience
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Education" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setSection("Education")}
            >
              <Typography className={`text-md mx-auto py-1 `}>
                Education
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Certificates" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setSection("Certificates")}
            >
              <Typography className={`text-md mx-auto py-1 `}>
                Certificates
              </Typography>
            </div>
            <div
              className={`w-full text-center rounded-md cursor-pointer ${
                section === "Achievements" ? "bg-blue-400 text-white" : ""
              }`}
              onClick={() => setSection("Achievements")}
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
              <div className="pt-2">
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none relative"
              >
                <div
                className="absolute top-0 right-0 z-10 bg-white cursor-pointer"
                onClick={handleExpEdit}
              >
                <FaRegEdit />
              </div>
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-600 text-base">
                  Organisation
                </Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
                <Typography className="text-gray-500 text-base italic">
                  MM/YYYY - MM/YYYY
                </Typography>
              </Card>
              </div>
              <div className="w-full flex justify-end">
              <Button
                className="mt-2 z-10 cursor-pointer"
                onClick={handleExpEdit}
                color="blue"
                size="sm"
                >
                Add Experience
              </Button>
                </div>
              <img
                src={Experience}
                className="w-1/2 mx-auto mt-10 opacity-30"
              />
            </div>
          )}
          {section === "Education" && (
            <div className="">
            <div className="pt-2">
            <Card
              shadow={false}
              className="pb-2 mb-2 border-b-2 rounded-none relative"
            >
              <div
              className="absolute top-0 right-0 z-10 bg-white cursor-pointer"
              onClick={setOpenEduEdit}
            >
              <FaRegEdit />
            </div>
              <Typography className="text-gray-800 text-md">Title</Typography>
              <Typography className="text-gray-600 text-base">
                Organisation
              </Typography>
              <Typography className="text-gray-800 text-base my-2">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                error! Rem ullam accusamus voluptatum recusandae dolores
                reprehenderit quos facere mollitia.
              </Typography>
              <Typography className="text-gray-500 text-base italic">
                MM/YYYY - MM/YYYY
              </Typography>
            </Card>
            </div>
            <div className="w-full flex justify-end">
            <Button
              className="mt-2 z-10 cursor-pointer"
              onClick={setOpenEduEdit}
              color="blue"
              size="sm"
              >
              Add Education
            </Button>
              </div>
            <img
              src={Experience}
              className="w-1/2 mx-auto mt-10 opacity-30"
            />
          </div>
          )}
          {section === "Certificates" && (
            <div>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-600 text-base">
                  Organisation
                </Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-600 text-base">
                  Organisation
                </Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-600 text-base">
                  Organisation
                </Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-600 text-base">
                  Organisation
                </Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <img
                src={Certificates}
                className="w-1/2 mx-auto mt-10 opacity-30"
              />
            </div>
          )}
          {section === "Achievements" && (
            <>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <Card
                shadow={false}
                className="pb-2 mb-2 border-b-2 rounded-none"
              >
                <Typography className="text-gray-800 text-md">Title</Typography>
                <Typography className="text-gray-800 text-base my-2">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Id,
                  error! Rem ullam accusamus voluptatum recusandae dolores
                  reprehenderit quos facere mollitia.
                </Typography>
              </Card>
              <img
                src={Achievements}
                className="w-1/2 mx-auto mt-10 opacity-30"
              />
            </>
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
      <Dialog open={openExpEdit} handler={handleExpEdit}>
        fskjsjk
      </Dialog>
    </div>
  );
};

export default EditDetails;
