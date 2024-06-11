import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";
const EditEdu = (props) => {
  const [organization, setOrganization] = useState(
    props.singleEducationData && props.singleEducationData.organization
      ? props.singleEducationData.organization
      : ""
  );
  const [course, setCourse] = useState(
    props.singleEducationData && props.singleEducationData.course
      ? props.singleEducationData.course
      : ""
  );
  const [startingMonth, setStartingMonth] = useState(
    props.singleEducationData && props.singleEducationData.startingMonth
      ? props.singleEducationData.startingMonth
      : ""
  );
  const [endingMonth, setEndingMonth] = useState(
    props.singleEducationData && props.singleEducationData.endingMonth
      ? props.singleEducationData.endingMonth
      : ""
  );
  const handleEducation = async () => {
    if (props.singleEducationData._id == undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/add/education`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              organization,
              course,
              startingMonth,
              endingMonth,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserEducation();
          props.setSingleEducationData({});
          props.setToast("Education added successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to add", false);
      }
    } else {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/edit/education/${props.singleEducationData._id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              organization,
              course,
              startingMonth,
              endingMonth,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserEducation();
          props.setSingleEducationData({});
          props.setToast("Education updated successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    }
  };

  const handleDeleteEducation = async () => {
    if (props.singleEducationData._id != undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/delete/education/${props.singleEducationData._id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const res = await response.json();
        console.log(res);
        console.log(res.success);
        if (res.success) {
          console.log(res.success);
          props.getUserEducation();
          // props.setSingleEducation({});
          props.setToast("Education deleted successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    } else {
      props.setToast("Failed to delete", false);
    }
  };

  return (
    <div className="w-screen h-screen z-100 bg-dialogueBg flex">
      <div className="w-2/5 h-3/5 mx-auto mt-24 bg-white rounded-2xl flex flex-col p-3 justify-between">
        <div className="flex justify-between mx-4 mt-2">
          <p className="text-lg text-gray-700 font-medium">Edit Education</p>
          <button onClick={() => props.setEditEdu(false)}>
            <MdClose className="w-6 h-6 text-gray-700 font-medium" />
          </button>
        </div>
        <div className="flex flex-col mx-4 my-1">
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-md">Organization</label>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-2/3"
              value={organization}
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>
          <div className="flex flex-col h-1/2 my-1">
            <label className="text-gray-700 text-md">Course</label>
            <input
              type="text"
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
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
        </div>
        <div className="flex justify-between ">
          <div className="mx-4 mt-2">
            <button
              className="text-red-400 border-2 border-red-400 px-3 py-1 rounded-md"
              onClick={() => {
                handleDeleteEducation();
                props.setEditEdu(false);
              }}
            >
              Delete
            </button>
          </div>
          <div className="mx-4 mt-2">
            <button
              className="text-primary border-2 border-primary px-3 py-1 rounded-md"
              onClick={() => props.setEditEdu(false)}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleEducation();
                props.setEditEdu(false);
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

export default EditEdu;
