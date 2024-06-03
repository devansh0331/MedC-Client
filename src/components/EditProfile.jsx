import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";
const EditProfile = (props) => {
  const [name, setName] = useState(props.name ? props.name : "");
  const [email, setEmail] = useState(props.email ? props.email : "");
  const [bio, setBio] = useState(props.bio ? props.bio : "");
  const [location, setLocation] = useState(
    props.location ? props.location : ""
  );
  const [contact, setContact] = useState(props.contact ? props.contact : "");
  const [linkedin, setLinkedin] = useState(
    props.linkedin ? props.linkedin : ""
  );
  const [twitter, setTwitter] = useState(props.twitter ? props.twitter : "");
  const [website, setWebsite] = useState(props.website ? props.website : "");

  const handleSaveProfile = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/auth/update-profile/social-info`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            bio,
            location,
            contact,
            linkedin,
            twitter,
            website,
          }),
        }
      );
      const res = await response.json();
      console.log(res);
      if (res.success) {
        props.setToast("Profile updated successfully", true);
        props.getUser();
      }
    } catch (error) {
      props.setToast("Failed to update", false);
    }
  };

  return (
    <div className="w-screen h-screen z-100 bg-dialogueBg flex items-center justify-center">
      <div className="w-2/5 h-3/5 m-auto bg-white rounded-2xl flex flex-col p-3">
        <div className="flex justify-between mx-4 mt-1">
          <p className="text-lg text-gray-700 font-medium">Edit Profile</p>
          <button onClick={() => props.setClose(false)}>
            <MdClose className="w-6 h-6 text-gray-700 font-medium" />
          </button>
        </div>
        <div className="flex flex-col mx-4 my-1">
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-sm">Name</label>
            <input
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-2/3 h-7"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-sm">Bio</label>
            <textarea
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-14"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex w-full justify-between ">
            <div className="flex flex-col h-1/2 my-1">
              <label className="text-gray-700 text-sm">Location</label>
              <input
                className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="flex flex-col h-1/2 my-1">
              <label className="text-gray-700 text-sm">Contact</label>
              <input
                className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div className="flex flex-col h-1/2 my-1">
              <label className="text-gray-700 text-sm">Email</label>
              <input
                className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col h-1/2 my-1">
              <label className="text-gray-700 text-sm">LinkedIn</label>
              <input
                className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
              />
            </div>
          </div>
          <div className="flex w-full justify-between ">
            <div className="flex flex-col h-1/2 my-1">
              <label className="text-gray-700 text-sm">Twitter</label>
              <input
                className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
              />
            </div>
            <div className="flex flex-col h-1/2 my-1">
              <label className="text-gray-700 text-sm">Website</label>
              <input
                className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mx-4 mt-2">
          <button
            className="text-primary border-2 border-primary px-3 py-1 rounded-md"
            onClick={() => props.setClose(false)}
          >
            Cancel
          </button>
          <button
            onClick={() => {
              handleSaveProfile();
              props.setClose(false);
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

export default EditProfile;
