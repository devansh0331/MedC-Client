import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";

const EditAchi = (props) => {
  const [achievement, setAchievement] = useState(
    props.singleAchievementData && props.singleAchievementData.achievement
      ? props.singleAchievementData.achievement
      : ""
  );
  const [description, setDescription] = useState(
    props.singleAchievementData && props.singleAchievementData.description
      ? props.singleAchievementData.description
      : ""
  );
  const handleAchievement = async () => {
    if (props.singleAchievementData._id == undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/add/achievement`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              achievement,
              description,
            }),
          }
        );
        const res = await response.json();

        if (res.success) {
          props.getUserAchievement();
          props.setToast("Achievement added successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to add", false);
      }
    } else {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/edit/achievement/${props.singleAchievementData._id}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              achievement,
              description,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          props.getUserAchievement();
          props.setToast("Achievement updated successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    }
  };

  const handleDeleteAchievement = async () => {
    if (props.singleAchievementData._id != undefined) {
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/delete/achievement/${props.singleAchievementData._id}`,
          {
            method: "POST",
            credentials: "include",
          }
        );
        const res = await response.json();

        console.log(res.success);
        if (res.success) {
          console.log(res.success);
          props.getUserAchievement();
          props.setToast("Achievement deleted successfully", true);
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
      <div className="w-2/5 h-2/5 mx-auto mt-24 bg-white rounded-2xl flex flex-col p-3 justify-between">
        <div className="flex justify-between mx-4 mt-2">
          <p className="text-lg text-gray-700 font-medium">Edit Achivements</p>
          <button onClick={() => props.setEditAchi(false)}>
            <MdClose className="w-6 h-6 text-gray-700 font-medium" />
          </button>
        </div>
        <div className="flex flex-col mx-4 my-1">
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-md">Achivement</label>
            <input
              value={achievement}
              onChange={(e) => setAchievement(e.target.value)}
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-2/3"
            />
          </div>
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-md">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-16"
            />
          </div>
        </div>
        <div className="flex items-center justify-between ">
          <div className="mx-4 mt-2">
            <button
              className="text-red-400 border-2 border-red-400 px-3 py-1 rounded-md"
              onClick={() => {
                handleDeleteAchievement();
                props.setEditAchi(false);
              }}
            >
              Delete
            </button>
          </div>
          <div className="flex justify-end mx-4 mt-2">
            <button
              className="text-primary border-2 border-primary px-3 py-1 rounded-md"
              onClick={() => {
                props.setEditAchi(false);
              }}
            >
              Cancel
            </button>
            <button
              onClick={() => {
                handleAchievement();
                props.setEditAchi(false);
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

export default EditAchi;
