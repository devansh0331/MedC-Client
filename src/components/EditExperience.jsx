import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";
import {
  Button,
  Dialog,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { IoClose } from "react-icons/io5";

const EditExperience = (props) => {
  const [post, setPost] = useState(
    props.singleExperienceData && props.singleExperienceData.post
      ? props.singleExperienceData.post
      : ""
  );
  const [organization, setOrganization] = useState(
    props.singleExperienceData && props.singleExperienceData.organization
      ? props.singleExperienceData.organization
      : ""
  );
  const [startingMonth, setStartingMonth] = useState(
    props.singleExperienceData && props.singleExperienceData.startingMonth
      ? props.singleExperienceData.startingMonth
      : ""
  );
  const [endingMonth, setEndingMonth] = useState(
    props.singleExperienceData && props.singleExperienceData.endingMonth
      ? props.singleExperienceData.endingMonth
      : ""
  );
  const [description, setDescription] = useState(
    props.singleExperienceData && props.singleExperienceData.description
      ? props.singleExperienceData.description
      : ""
  );
  const handleExpEdit = () => {
    props.setOpenExpEdit(!props.openExpEdit);
  };
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
              Authorization: `Bearer ${Cookies.get("token")}`,
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
          props.handleExpEdit();
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
          props.handleExpEdit();
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
          props.handleExpEdit();
          props.setToast("Experience deleted successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    }
  };

  return (
    <Dialog open={props.openExpEdit} handler={handleExpEdit} className="p-4">
      <div className="flex w-full justify-between items-start">
        <Typography className="text-2xl font-bold">Edit Experience</Typography>
        <IoClose className="cursor-pointer w-6 h-6" onClick={handleExpEdit} />
      </div>
      <div className="mt-2 flex flex-col sm:grid grid-cols-2 gap-4">
        <div className="col-span-2">
          <input
            value={post}
            onChange={(e) => setPost(e.target.value)}
            placeholder="Job Title"
            size=""
            className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
          />
        </div>
        <div className="col-span-2">
          <input
            value={organization}
            onChange={(e) => setOrganization(e.target.value)}
            placeholder="Company Name"
            size=""
            className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
          />
        </div>
        <div className="col-span-2">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            size=""
            className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
          />
        </div>
        <input
          value={startingMonth}
          onChange={(e) => setStartingMonth(e.target.value)}
          placeholder="Start Date"
          size=""
          type="month"
          className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        />
        <input
          value={endingMonth}
          onChange={(e) => setEndingMonth(e.target.value)}
          placeholder="End Date"
          size=""
          type="month"
          className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        />
      </div>
      <div className="flex justify-start items-center">
        <Button
          onClick={handleExperience}
          size="sm"
          color="blue"
          className="mt-4"
        >
          Save
        </Button>
        <Button
          onClick={handleDeleteExperience}
          size="sm"
          variant="outlined"
          color="red"
          className="mt-4 ml-4"
        >
          Delete
        </Button>
      </div>
    </Dialog>
  );
};

export default EditExperience;
