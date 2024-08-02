import React, { useState } from "react";
import SideBar from "../components/SideBar";
import { Button, Card } from "@material-tailwind/react";
import PostCardAdmin from "../components/PostCardAdmin";
import UserCardAdmin from "../components/UserCardAdmin";

const Admin = () => {
  const [active, setActive] = useState("Posts");
  return (
    <div className="w-full h-[90vh] flex bg-background">
      <SideBar />
      <div className="flex flex-col w-full">
        <div className="flex gap-4 h-min mx-4 mt-4 absolute">
          <Button
            variant={`${active === "Posts" ? "filled" : "outlined"}`}
            color="blue"
            onClick={() => setActive("Posts")}
          >
            Posts
          </Button>
          <Button
            variant={`${active === "Users" ? "filled" : "outlined"}`}
            color="blue"
            onClick={() => setActive("Users")}
          >
            Users
          </Button>
        </div>
        <div className="flex justify-center h-[90vh] w-full">
          {active === "Posts" && 
            <Card className="p-0 m-0 w-1/2 bg-inherit pt-3 flex flex-col gap-1 rounded-lg h-full overflow-y-scroll scrollbar-thin"
            shadow={false}>
                <PostCardAdmin/>
                <PostCardAdmin/>
                <PostCardAdmin/>
                <PostCardAdmin/>
                <PostCardAdmin/>
                <PostCardAdmin/>
            </Card>
          }
        </div>
        <div className="flex h-[90vh] justify-center w-full ">
        {active === "Users" && 
          <Card className="p-0 m-0 bg-inherit pt-3 justify-center grid grid-cols-3 gap-2 h-full overflow-y-scroll scrollbar-thin"
          shadow={false}>
                <UserCardAdmin/>
                <UserCardAdmin/>
                <UserCardAdmin/>
                <UserCardAdmin/>
                <UserCardAdmin/>
                <UserCardAdmin/>
                <UserCardAdmin/>
          </Card>
          }
        </div>
      </div>
    </div>
  );
};

export default Admin;
