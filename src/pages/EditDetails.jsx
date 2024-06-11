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
const EditDetails = () => {
  const [section, setSection] = useState("Experience");
  const [editexp, setEditexp] = useState(false);
  const [editEdu, setEditEdu] = useState(false);
  const [editCert, setEditCert] = useState(false);
  const [editAchi, setEditAchi] = useState(false);

  const [singleExperienceData, setSingleExperienceData] = useState({});
  const [singleEducationData, setSingleEducationData] = useState({});
  const [singleCertificateData, setSingleCertificateData] = useState({});
  const [singleAcgievementData, setSingleAchievementData] = useState({});

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
  }, []);

  const setToast = (msg, success) => {
    if (success) {
      toast.success(msg);
    } else toast.error(msg);
  };

  const handleAdd = () => {
    if (section === "Experience") {
      setSingleExperienceData({});
      setEditexp(true);
    } else if (section === "Education") {
      setSingleEducationData({});
      setEditEdu(true);
    } else if (section === "Certificates") {
      setEditCert(true);
    } else if (section === "Achivements") {
      setEditAchi(true);
    }
  };
  return (
    <div className="w-full h-screen mx-auto bg-background pt-20 overflow-hidden relative">
      {editexp && singleExperienceData != {} && (
        <EditExperience
          className="absolute"
          setToast={setToast}
          setSingleExperienceData={setSingleExperienceData}
          singleExperienceData={singleExperienceData}
          setEditexp={setEditexp}
          getUserExperience={getUserExperience}
        />
      )}

      {editEdu && singleEducationData != {} && (
        <EditEdu
          className="absolute"
          setToast={setToast}
          setSingleEducationData={setSingleEducationData}
          singleEducationData={singleEducationData}
          getUserEducation={getUserEducation}
          setEditEdu={setEditEdu}
        />
      )}
      {editCert && (
        <EditCert
          className="absolute"
          setEditCert={setEditCert}
          setToast={setToast}
          setSingleCertificateData={setSingleCertificateData}
          singleCertiicateData={singleCertificateData}
          getUserCertificate={getUserCertificate}
        />
      )}
      {editAchi && <EditAchi className="absolute" setEditAchi={setEditAchi} />}
      <div className="w-3/4 bg-white flex justify-between border-b-2 py-2 text-lg mx-auto items-center">
        <div className="w-full flex justify-between items-center">
          <div className="flex  text-gray-800 ">
            <button
              className={`border-r-2 mx-1 px-2 border-gray-300 ${
                section === "Experience" ? "text-blue-600" : ""
              }`}
              onClick={() => setSection("Experience")}
            >
              Experience
            </button>
            <button
              className={`border-r-2 mx-1 px-2 border-gray-300 ${
                section === "Education" ? "text-blue-600" : ""
              }`}
              onClick={() => {
                getUserEducation();
                setSection("Education");
              }}
            >
              Education
            </button>
            <button
              className={`border-r-2 mx-1 px-2 border-gray-300 ${
                section === "Certificates" ? "text-blue-600" : ""
              }`}
              onClick={() => {
                getUserCertificate();
                console.log("Certificate: ", userCertificate);
                setSection("Certificates");
              }}
            >
              Certificates
            </button>
            <button
              className={`mx-1 px-2 ${
                section === "Achivements" ? "text-blue-600" : ""
              }`}
              onClick={() => setSection("Achivements")}
            >
              Achivements
            </button>
          </div>
          <button
            className="mr-3 text-gray-700"
            onClick={() => navigate("/profile")}
          >
            <BsPersonCircle className=" w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="w-3/4 overflow-y-scroll scrollbar-thin bg-white h-ful mx-auto">
        {section === "Experience" && (
          <div className=" px-3">
            {userExperience.map((experience) => (
              <div className="w-full grid grid-cols-1 my-1 px-3 py-2 border-b-2">
                <div className="flex justify-between">
                  <p className="text-base font-medium">{experience.post}</p>
                  <button
                    className=""
                    onClick={() => {
                      setSingleExperienceData(experience);
                      setEditexp(true);
                    }}
                  >
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-800">
                  {experience.organization}
                </p>
                <p className="text-sm text-gray-600 italic">
                  {experience.startingMonth.split("-")[1]},
                  {experience.startingMonth.split("-")[0]} -{" "}
                  {experience.endingMonth.split("-")[1]},
                  {experience.endingMonth.split("-")[0]}
                </p>
                <p className="text-sm text-gray-700">
                  {experience.description}
                </p>
              </div>
            ))}
          </div>
        )}
        {section === "Education" && (
          <div className=" px-3">
            {userEducation.map((education, key) => (
              <div className="w-full my-1 px-3 py-2 border-b-2">
                <div className="flex justify-between">
                  <p className="text-base font-medium">
                    {education.organization}
                  </p>
                  <button
                    className=""
                    onClick={() => {
                      setSingleEducationData(education);
                      setEditEdu(true);
                    }}
                  >
                    <FiEdit className="w-5 h-5" />
                  </button>
                </div>
                <p className="text-sm text-gray-800">{education.course}</p>
                <p className="text-sm text-gray-600 italic">
                  ({education.startingMonth.split("-")[1]},
                  {education.startingMonth.split("-")[0]} -{" "}
                  {education.endingMonth.split("-")[1]},
                  {education.endingMonth.split("-")[0]})
                </p>
              </div>
            ))}
          </div>
        )}
        {section === "Certificates" && (
          <div className=" px-3">
            {userCertificate.length != 0 ? (
              <p className="w-full my-1 px-3 py-2  text-base font-medium">
                No Certificates Issued
              </p>
            ) : (
              userCertificate.map((certificate) => (
                <div className="w-full my-1 px-3 py-2 border-b-2">
                  <div className="flex justify-between">
                    <p className="text-base font-medium">
                      {certificate.certificate}
                    </p>
                    <button className="" onClick={() => setEditCert(true)}>
                      <FiEdit className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-800">{certificate.issuer}</p>
                  <p className="text-sm text-gray-700">
                    {certificate.description}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
        {section === "Achivements" && (
          <div className=" px-3">
            <div className="w-full my-1 px-3 py-2 border-b-2">
              <div className="flex justify-between">
                <p className="text-base font-medium">Certificate Title</p>
                <button className="" onClick={() => setEditAchi(true)}>
                  <FiEdit className="w-5 h-5" />
                </button>
              </div>
              <p className="text-sm text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.{" "}
              </p>
            </div>
          </div>
        )}
        <div className="w-full flex justify-end py-2 px-5">
          <button
            className="bg-primary text-white px-3 py-1 rounded-full"
            onClick={() => handleAdd()}
          >
            Add
          </button>
        </div>
        <Toaster position="top-right" />
      </div>
    </div>
  );
};

export default EditDetails;
