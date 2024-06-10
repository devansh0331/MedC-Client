import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";
const EditAbout = (props) => {
  const [about, setAbout] = useState(props.about);

  const handleSaveAbout = async () => {
    try {
      const response = await fetch(`${SERVER_URL}/auth/update-profile/about`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ about }),
      });
      const res = await response.json();
      if (res.success) {
        props.getUser();
        props.setToast("About updated successfully", true);
      }
    } catch (error) {
      props.setToast("Failed to update", false);
    }
  };

  return (
    <div className="w-full h-full z-100 bg-dialogueBg flex items-center justify-center">
      <div className="w-11/12 md:w-2/5 h-3/5 md:m-auto bg-white rounded-2xl flex flex-col p-3">
        <div className="flex justify-between md:mx-4 mt-1">
          <p className="text-lg text-gray-700 font-medium">Edit Profile</p>
          <button onClick={() => props.setCloseAbout(false)}>
            <MdClose className="w-6 h-6 text-gray-700 font-medium" />
          </button>
        </div>
        <div className="flex flex-col md:mx-4 my-1 h-full">
          <div className="flex flex-col my-1 h-full">
            <label className="text-gray-700 text-base">About</label>
            <textarea
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-5/6"
              id="about"
              value={about}
              onChange={() => setAbout(document.getElementById("about").innerHTML)}
            />
          </div>
        </div>
        <div className="flex justify-end md:mx-4 mt-2">
          <button
            className="text-primary border-2 border-primary px-3 py-1 rounded-md"
            onClick={() => props.setCloseAbout(false)}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSaveAbout();
              props.setCloseAbout(false);
            }}
            className="text-white bg-primary px-3 py-1 rounded-md ml-3"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditAbout;
