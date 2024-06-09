import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";

const EditExperience = (props) => {
  const [post, setPost] = useState(
    props.singleExperienceData.post ? props.singleExperienceData.post : ""
  );
  const [organization, setOrganization] = useState(
    props.singleExperienceData.organization
      ? props.singleExperienceData.organization
      : ""
  );
  const [startingMonth, setStartingMonth] = useState(
    props.singleExperienceData.startingMonth
      ? props.singleExperienceData.startingMonth
      : ""
  );
  const [endingMonth, setEndingMonth] = useState(
    props.singleExperienceData.endingMonth
      ? props.singleExperienceData.endingMonth
      : ""
  );
  const [description, setDescription] = useState(
    props.singleExperienceData.description
      ? props.singleExperienceData.description
      : ""
  );

  const handleExperience = async () => {
    if (props.singleExperienceData._id == undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/add/experience`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              post,
              organization,
              startingMonth,
              endingMonth,
              description,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserExperience();
          props.setSingleExperienceData({});
          props.setToast("Experience added successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to add", false);
      }
    } else {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/edit/experience/${props.singleExperienceData._id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              post,
              organization,
              startingMonth,
              endingMonth,
              description,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserExperience();
          props.setSingleExperienceData({});
          props.setToast("Experience updated successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    }
  };
  const handleDeleteExperience = async () => {
    if (props.singleExperienceData._id != undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/delete/experience/${props.singleExperienceData._id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserExperience();
          props.setSingleExperienceData({});
          props.setToast("Experience deleted successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    }
  };

  return (
    <div className="w-screen h-screen z-100 bg-dialogueBg flex">
      <div className="w-2/5 h-3/5 mx-auto mt-24 bg-white rounded-2xl flex flex-col p-3 justify-between">
        <div className="flex justify-between mx-4 mt-2">
          <p className="text-lg text-gray-700 font-medium">Edit Experience</p>
          <button onClick={() => props.setEditexp(false)}>
            <MdClose className="w-6 h-6 text-gray-700 font-medium" />
          </button>
        </div>
        <div className="flex flex-col mx-4 my-1">
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-md">Post</label>
            <input
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-2/3"
              value={post}
              onChange={(e) => setPost(e.target.value)}
            />
          </div>
          <div className="flex flex-col h-1/2 my-1">
            <label className="text-gray-700 text-md">Organization</label>
            <input
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>
          <div className="flex w-full">
            <div className="flex flex-col h-1/2 my-1 mr-2 w-1/2">
              <label className="text-gray-700 text-md">Starting Month</label>
              <div className="relative">
                <input
                  className="border-2 border-gray-400 rounded-md px-3 py-1 w-full"
                  type="month"
                  value={startingMonth}
                  onChange={(e) => setStartingMonth(e.target.value)}
                />
              </div>
            </div>
            <div className="flex flex-col h-1/2 my-1 w-1/2">
              <label className="text-gray-700 text-md">Ending Month</label>
              <div className="relative">
                <input
                  className="border-2 border-gray-400 rounded-md px-3 py-1 w-full"
                  type="month"
                  value={endingMonth}
                  onChange={(e) => setEndingMonth(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-md">Description</label>
            <textarea
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-16"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="mx-4 mt-2">
            <button
              className="text-red-400 border-2 border-red-400 px-3 py-1 rounded-md"
              onClick={() => {
                handleDeleteExperience();
                props.setEditexp(false);
              }}
            >
              Delete
            </button>
          </div>
          <div className="flex justify-end mx-4 mt-2">
            <button
              className="text-primary border-2 border-primary px-3 py-1 rounded-md"
              onClick={() => props.setEditexp(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleExperience();
                props.setEditexp(false);
              }}
              className="text-white bg-primary px-3 py-1 rounded-md ml-3"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditExperience;
