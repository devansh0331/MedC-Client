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
function CreatePostPopUp(props) {
  const [audience, setAudience] = useState("Everyone"); 
  const [post, setPost] = useState("");
  const [file, setFile] = useState(null);
  const [userId, setUserID] = useState('')

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user", userId);
    formData.append("audience", audience);
    formData.append("description", post);
    if (file) {
      formData.append("filepath", file);
    }

    try {
      const response = await fetch(`${SERVER_URL}/create-post`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        console.log("Post created successfully:", result.data);
        props.handleOpen(); 
      } else {
        console.error("Failed to create post:", result.error);
      }
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  const handleAudienceChange = (event) => {
    setAudience(event.target.value);
  };
  return (
    <Dialog open={props.open} size="lg">
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
          className="mr-3 h-5 w-5"
          onClick={() => props.handleOpen()}
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
        <Typography className="mb-2 -mt-7 text-lg" >
          Select audience
        </Typography>
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
              for="default-radio-1"
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
          {/* <Typography className="-mb-1" color="blue-gray" variant="h6">
            Username
          </Typography> */}
          {/* <Input label="Username" /> */}
          <Textarea label="Share Your experience"  value={post} onChange={(e) => setPost(e.target.value)}/>
        </div>

        <div className="grid gap-0 mt-5">
          <label
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            for="file_input"
          >
            <Typography className=" text-lg">
              Upload file
            </Typography>
          </label>
          <input
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 p-1"
            aria-describedby="file_input_help"
            id="file_input"
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          />
          <p
            className="mt-1 text-sm text-gray-500 dark:text-gray-300"
            id="file_input_help"
          >
            SVG, PNG, JPG or GIF (MAX. 800x400px).
          </p>
        </div>
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="text" color="gray" onClick={props.handleOpen}>
          cancel
        </Button>
        <Button
          onClick={()=>handleSubmit()}
          className=" bg-primary text-white  rounded-full "
        >
          Post
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

export default CreatePostPopUp;
