import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import React from "react";
import { useState } from "react";
import { SERVER_URL } from "../ServerURL";
import toast, { Toaster } from "react-hot-toast";
import { RiGalleryFill } from "react-icons/ri";
import Cookies from "js-cookie";
function CreatePostPopUp(props) {
  const [audience, setAudience] = useState("Everyone");
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserID] = useState("");

  const handleOpen = () => {
    props.setOpen(!props.open);
  }
  const handleSubmit = async () => {
    const formData = new FormData();
    const data = {
      audience: audience,
      description: post,
    };
    formData.append("data", JSON.stringify(data));

    // FOR POSTING WITH A FILE
    if (file) {
      formData.append("filepath", file);
      try {
        console.log("Form Data: ", formData.getAll);
        const response = await fetch(`${SERVER_URL}/post/create-post`, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        });

        const result = await response.json();
        console.log(response);
        if (response.ok) {
          toast.success("Post created successfully:");
          setPost("");
          setFile(null);
          setTimeout(() => {
            props.getAllPosts();
            handleOpen();
          }, 2000);
        } else {
          console.error("Failed to create post:", result.error);
          toast.error("Failed to create post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        toast.error("Failed to create post");
      }
    }
    // FOR POSTING WITHOUT A FILE
    else {
      try {
        console.log("Form Data: ", formData.getAll);
        const response = await fetch(`${SERVER_URL}/post/create-post-no-file`, {
          method: "POST",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          body: formData,
        });

        const result = await response.json();
        console.log(response);
        if (response.ok) {
          toast.success("Post created successfully:");
          setPost("");
          setFile(null);
          setTimeout(() => {
            props.getAllPosts();
            handleOpen();
          }, 2000);
        } else {
          console.error("Failed to create post:", result.error);
          toast.error("Failed to create post");
        }
      } catch (error) {
        console.error("Error creating post:", error);
        toast.error("Failed to create post");
      }
    }
  };

  const handleAudienceChange = (event) => {
    setAudience(event.target.value);
  };
  return (
    <Dialog open={props.open} size="lg" handler={handleOpen}>
      <div className="flex items-center justify-between">
        <DialogHeader className="flex flex-col items-start">
          {" "}
          <Typography className="mb-1 text-xl font-bold">
            Create a post{" "}
          </Typography>
        </DialogHeader>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="mr-3 h-5 w-5 cursor-pointer"
          onClick={() => {
            setPost("");
            setFile(null);
            handleOpen();
          }}
        >
          <path
            fillRule="evenodd"
            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            clipRule="evenodd"
          />
        </svg>
      </div>
      <hr />
      <br />
      <DialogBody>
        <Typography className="mb-2 -mt-7 text-lg">Select audience</Typography>
        <div className="grid mb-5">
          <div className="flex items-center mb-1">
            <input
              id="default-radio-1"
              type="radio"
              value="Friends Only"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={audience === "Friends Only"}
              onChange={handleAudienceChange}
            />
            <label
              htmlFor="default-radio-1"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Friends Only
            </label>
          </div>
          <div className="flex items-center">
            <input
              id="default-radio-2"
              type="radio"
              value="Everyone"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              checked={audience === "Everyone"}
              onChange={handleAudienceChange}
            />
            <label
              for="default-radio-2"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Everyone
            </label>
          </div>
        </div>
        <div className="grid gap-6">
          <Textarea
            label="Share Your experience"
            value={post}
            onChange={(e) => setPost(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col my-1">
          <label className="text-gray-700 text-sm">Upload File</label>
          <div className="relative">
            <input
              id="file-upload"
              className="hidden"
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label
              htmlFor="file-upload"
              className="border-2 profilepic border-gray-400 rounded-md px-3 py-0.5 w-full h-full text-sm text-gray-700 flex items-center cursor-pointer"
            >
              <RiGalleryFill className="w-5 h-5" />{" "}
              <span className="ml-2">{file ? file.name : "Upload File"}</span>
            </label>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button
          variant="text"
          color="gray"
          onClick={() => {
            handleOpen();
            setPost("");
            setFile(null);
          }}
        >
          cancel
        </Button>
        <Button
          onClick={() => handleSubmit()}
          className=" bg-primary text-white  rounded-full "
        >
          Post
        </Button>
        <Toaster position="top-right" />
      </DialogFooter>
    </Dialog>
  );
}

export default CreatePostPopUp;
