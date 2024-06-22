import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../UserContext";
const ProfileDetails = () => {
  const [section, setSection] = useState("Experience");
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
  console.log("User Education : ", userEducation);

  return (
    <div className="w-full h-full md:h-4/5 flex flex-col bg-white mt-4 mb-4 px-2 rounded-xl shadow-md">
      <div className="w-full flex justify-between border-b-2 py-2 text-md items-center">
        <div className="flex text-gray-800 font-medium2 ">
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
            onClick={() => setSection("Education")}
          >
            Education
          </button>
          <button
            className={`border-r-2 mx-1 px-2 border-gray-300 ${
              section === "Certificates" ? "text-blue-600" : ""
            }`}
            onClick={() => setSection("Certificates")}
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
        <button className="" onClick={() => navigate("/editdetails")}>
          <FiEdit className="w-5 h-5" />
        </button>
      </div>
      <div className="overflow-y-scroll scrollbar-thin mx-2 h-96">
        {section === "Experience" && (
          <div className=" px-3">
            {userExperience.length == 0 ? (
              <p className="w-full my-1 px-3 py-2  text-base font-medium">
                You don't have any experience
              </p>
            ) : (
              userExperience.map((experience) => (
                <div className="w-full grid grid-cols-1 my-1 px-3 py-2 border-b-2">
                  <div className="flex justify-between">
                    <p className="text-base font-medium">{experience.post}</p>
                  </div>
                  <p className="text-sm text-gray-800">
                    {experience.organization}
                  </p>
                  <p className="text-sm text-gray-600 italic">
                    {experience.startingMonth
                      ? experience.startingMonth.split("-")[1]
                      : ""}
                    ,
                    {experience.startingMonth
                      ? experience.startingMonth.split("-")[0]
                      : ""}{" "}
                    -{" "}
                    {experience.endingMonth
                      ? experience.endingMonth.split("-")[1]
                      : ""}
                    ,
                    {experience.endingMonth
                      ? experience.endingMonth.split("-")[0]
                      : ""}
                  </p>
                  <p className="text-sm text-gray-700">
                    {experience.description}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
        {section === "Education" && (
          <div className=" px-3">
            {userEducation.length == 0 ? (
              <p className="w-full my-1 px-3 py-2  text-base font-medium">
                You are illitrate
              </p>
            ) : (
              userEducation.map((education, key) => (
                <div className="w-full my-1 px-3 py-2 border-b-2">
                  <div className="flex justify-between">
                    <p className="text-base font-medium">
                      {education.organization}
                    </p>
                  </div>
                  <p className="text-sm text-gray-800">{education.course}</p>
                  <p className="text-sm text-gray-600 italic">
                    ({education.startingMonth.split("-")[1]},
                    {education.startingMonth.split("-")[0]} -{" "}
                    {education.endingMonth.split("-")[1]},
                    {education.endingMonth.split("-")[0]})
                  </p>
                </div>
              ))
            )}
          </div>
        )}
        {section === "Certificates" && (
          <div className=" px-3">
            {" "}
            {userCertificate.length == 0 ? (
              <p className="w-full my-1 px-3 py-2  text-base font-medium">
                No Certificates Issued
              </p>
            ) : (
              userCertificate.map((certificate, key) => (
                <div key={key} className="w-full my-1 px-3 py-2 border-b-2">
                  <div className="flex justify-between">
                    <p className="text-base font-medium">
                      {certificate.certificate}
                    </p>
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
            {userAchievement.length == 0 ? (
              <p className="w-full my-1 px-3 py-2  text-base font-medium">
                No Achievements Mentioned
              </p>
            ) : (
              userAchievement.map((achievement, key) => (
                <div key={key} className="w-full my-1 px-3 py-2 border-b-2">
                  <div className="flex justify-between">
                    <p className="text-base font-medium">
                      {achievement.achievement}
                    </p>
                    <button
                      className=""
                      onClick={() => {
                        setSingleAchievementData(achievement);
                        setEditAchi(true);
                      }}
                    >
                      <FiEdit className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-gray-700">
                    {achievement.description}
                  </p>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileDetails;
