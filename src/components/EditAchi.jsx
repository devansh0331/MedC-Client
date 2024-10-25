import React, { useEffect, useState } from "react";
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

const EditAchi = (props) => {
  const [achievement, setAchievement] = useState("");
  const [description, setDescription] = useState("");
  const [check, setCheck] = useState(false);

  useEffect(() => {
    if (props.setSingleAchievementData) {
      setAchievement(
        props.singleAchievementData && props.singleAchievementData.achievement
          ? props.singleAchievementData.achievement
          : ""
      );
      setDescription(
        props.singleAchievementData && props.singleAchievementData.description
          ? props.singleAchievementData.description
          : ""
      );
    }
  }, [props.singleAchievementData]);

  const handleAchievement = async () => {
    if (achievement != "" && description != "") {
      setCheck(false);
      if (props.singleAchievementData._id == undefined) {
        try {
          const response = await fetch(
            `${SERVER_URL}/auth/update-profile/add/achievement`,
            {
              method: "POST",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("token")}`,
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
            props.setSingleAchievementData({});
            handleAchiEdit();
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
            props.setSingleAchievementData({});
            handleAchiEdit();
            props.setToast("Achievement added successfully", true);
          }
        } catch (error) {
          props.setToast("Failed to update", false);
        }
      }
    } else {
      setCheck(true);
    }
  };

  const handleDeleteAchievement = async () => {
    console.log("delete" + props.singleAchievementData._id);
    if (props.singleAchievementData._id != undefined) {
      setCheck(false);
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
          props.getUserAchievement();
          props.setSingleAchievementData({});
          handleAchiEdit();
          props.setToast("Achievement deleted successfully", true);
        }
      } catch (error) {
        props.setToast("Failed to update", false);
      }
    } else {
      props.setToast("Failed to delete", false);
    }
  };

  const handleAchiEdit = () => {
    setAchievement("");
    setDescription("");
    props.setOpenAchiEdit(!props.openAchiEdit);
  };

  return (
    <Dialog open={props.openAchiEdit} handler={handleAchiEdit} className="p-4">
      <div className="flex w-full justify-between items-start">
        <Typography className="text-2xl font-bold">
          Edit Achievements
        </Typography>
        <div className="flex">
          {check && (
            <Typography className="text-red-500">
              All fields are mandetory
            </Typography>
          )}
          <IoClose
            className="cursor-pointer w-6 h-6"
            onClick={handleAchiEdit}
          />
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-4">
        <input
          value={achievement}
          onChange={(e) => setAchievement(e.target.value)}
          placeholder="Achievement"
          size=""
          className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          size=""
          className="w-full flex gap-2 justify-between border-[1px] border-gray-400 h-10 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        />
      </div>
      <div className="flex justify-start items-center">
        <Button
          onClick={handleAchievement}
          size="sm"
          color="blue"
          className="mt-4"
        >
          Save
        </Button>
        <Button
          onClick={handleDeleteAchievement}
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

export default EditAchi;
