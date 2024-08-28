import React, { useContext, useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import { UserContext } from "../UserContext";
import { SERVER_URL } from "../ServerURL";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";
import SinglePostCard from "../components/SinglePostCard";
const ArchivedPosts = () => {
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);

  const getArchivedPosts = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/get-user-archived-posts/${user?._id}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();
      console.log(res);
      
      if (!res.success) {
        console.log(res.error);
      } else {
        setPosts(res.data);
      }
    } catch (error) {
        console.log(error);
        toast.error("Failed to fetch posts");
    }
  };
 
  useEffect(() => {
    getArchivedPosts();
  }, [user._id]);

  return (
    <div className="w-full h-[90vh] flex flex-col bg-background overflow-y-scroll scrollbar-thin">
      <SideBar />
      <div className="flex w-[40%] mx-auto flex-col h-full gap-6 justify-start mt-5 items-start">
        {posts.map((post) => (
          <SinglePostCard 
          post={post} 
          key={post._id} 
          postId={post._id}
          userId={user._id}
          parentFunction={getArchivedPosts}
          />
        ))}
      </div>
      <Toaster position="top-right" />
    </div>
  );
};

export default ArchivedPosts;
