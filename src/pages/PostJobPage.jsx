import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import PostJobCard from "../components/PostJobCard";
import { UserContext } from "../UserContext";
import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const PostJobPage = () => {
  const { userInfo } = useContext(UserContext);
  const navigate = useNavigate();
  return (
    <div className="w-full flex bg-background md:h-[90vh]">
      <SideBar />
      {userInfo.state ? (
        <div className="flex w-full gap-4 justify-center mt-5">
          <div className="w-[98%] lg:w-[85%]">
            <PostJobCard />
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center w-full h-[80vh]">
          <Typography className="my-4 text-3xl font-semibold">
            Please Sign In to see this page
          </Typography>
          <Button onClick={() => navigate("/signin")} color="blue">
            Sign In
          </Button>
        </div>
      )}
    </div>
  );
};

export default PostJobPage;
