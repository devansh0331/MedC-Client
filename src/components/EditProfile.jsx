import React, { useEffect, useState } from "react";
import { MdClose } from "react-icons/md";
import { SERVER_URL } from "../ServerURL";
import { RiGalleryFill } from "react-icons/ri";

const EditProfile = (props) => {
  const [name, setName] = useState(props.name ? props.name : "");
  const [email, setEmail] = useState(props.email ? props.email : "");
  const [bio, setBio] = useState(props.bio ? props.bio : "");
  const [location, setLocation] = useState(
    props.location ? props.location : ""
  );
  const [file, setFile] = useState(null);
  const [contact, setContact] = useState(props.contact ? props.contact : "");
  const [linkedin, setLinkedin] = useState(
    props.linkedin ? props.linkedin : ""
  );
  const [twitter, setTwitter] = useState(props.twitter ? props.twitter : "");
  const [website, setWebsite] = useState(props.website ? props.website : "");

  const handleSaveProfile = async () => {
    const formData = new FormData();
    const data = {
      name: name,
      email: email,
      bio: bio,
      location: location,
      contact: contact,
      linkedin: linkedin,
      twitter: twitter,
      website: website,
    };
    formData.append("data", JSON.stringify(data));

    if (file) {
      formData.append("filepath", file);
      try {
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/social-info`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
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
    }

    // NO FILE
    else {
      try {
        console.log(formData.getAll("data"));
        const response = await fetch(
          `${SERVER_URL}/auth/update-profile/social-info-no-profile`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
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
    }
  };

  return (
    <div className="w-full h-full z-100 bg-dialogueBg flex items-center justify-center">
      <div className="w-11/12 lg:w-4/5 xl:w-2/5 h-4/5 md:mt-20 md:m-auto bg-white rounded-2xl flex flex-col p-1 md:p-3">
        <div className="flex justify-between mx-4 mt-1">
          <p className="text-lg text-gray-700 font-medium">Edit Profile</p>
          <button onClick={() => props.setClose(false)}>
            <MdClose className="w-6 h-6 text-gray-700 font-medium" />
          </button>
        </div>
        <div className="flex flex-col mx-2 md:mx-4 my-1">
          <div className="flex flex-col md:flex-row w-full justify-between">
            <div className="flex flex-col my-1">
              <label className="text-gray-700 text-sm">Name</label>
              <input
                className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7 "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="flex flex-col my-1">
              <label className="text-gray-700 text-sm">Profile Picture</label>
              <div className="relative">
                <input
                  id="file-upload"
                  className="hidden"
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label
                  htmlFor="file-upload"
                  className="border-2 profilepic border-gray-400 rounded-md px-3 py-0.5 w-full h-full text-sm text-gray-700 flex items-center justify-center cursor-pointer"
                >
                  <RiGalleryFill className="w-5 h-5" /> {file ? file.name : "Upload"}
                </label>
              </div>
            </div>
          </div>
          <div className="flex flex-col my-1">
            <label className="text-gray-700 text-sm">Bio</label>
            <textarea
              className="border-2 border-gray-400 rounded-md px-3 py-1 w-full h-14"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="flex flex-col md:flex-row w-full justify-between ">
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
          <div className="flex flex-col md:flex-row w-full justify-between ">
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
          <div className="flex  flex-col md:flex-row w-full justify-between ">
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
