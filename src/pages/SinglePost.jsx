import React, { useEffect, useState } from "react";
import SinglePostCard from "../components/SinglePostCard";
import { SERVER_URL } from "../ServerURL";
import { useParams } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { useContext } from "react";
import { UserContext } from "../UserContext";
import SideBar from "../components/SideBar";
import Cookies from "js-cookie";
import ProfileCard from "../components/ProfileCard";
import MorefromThem from "../components/MorefromThem";
import SinglePostSkeleton from "../components/SinglePostSkeleton";

const SinglePost = () => {
  const [post, setPost] = useState({});
  const [postUser, setPostUser] = useState({});
  const postId = useParams();
  const [currentUserId, setCurrentuserId] = useState(null);
  const { getPosts, userId, posts, getUser, user } = useContext(UserContext);
  const [userPost, setUserPost] = useState([]);
  const [postLoading, setPostLoading] = useState(true);

  useEffect(() => {
    getSinglePost();
  }, [postId]);

  const getSinglePost = async () => {
    const response = await fetch(
      `${SERVER_URL}/post/single-post/${postId.id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      }
    );

    const res = await response.json();
    if (!res.success) {
      console.log(res.error);
    } else {
      setPostLoading(false);
      setPost(res.data);
      setCurrentuserId(user._id);
      setPostUser(res.data.user);
      getUserPosts(res.data.user._id);
    }
  };

  const handleLike = async (postId) => {
    try {
      const res = await fetch(`${SERVER_URL}/post/single-post/like/${postId}`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        toast.error(parsedRes.error);
      } else {
        getSinglePost();
      }
    } catch (error) {
      toast.error("Failed to like post");
    }
  };

  const getUserPosts = async (postUserId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/get-user-posts/${postUserId}`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );
      const res = await response.json();
      if (!res.success) {
        console.log(res?.error);
      } else {
        setUserPost(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-[90vh] flex overflow-y-scroll scrollbar-thin bg-background">
      <SideBar className="h-screen" route={"profile"} />

      <div className="flex h-full gap-6 justify-center mx-auto w-[95%] sm:w-[80%] md:w-[60%] lg:w-[75%] 2xl:w-[85%]">
        <div className="w-80 mt-5 lg:block hidden">
        <ProfileCard 
        route="single-post" 
        user={postUser}
        profileURL={
          postUser._id
        }
        />
        </div>
        <div className="lg:w-3/5 2xl:w-2/5 mt-3">  
        {postLoading ? (
          <SinglePostSkeleton />
        ) : (
        <SinglePostCard
          post={post}
          isLiked={post.likes && post.likes[currentUserId]}
          handleLike={() => handleLike(post._id)}
          postId={postId.id}
          userId={currentUserId}
        />
        )
        }
        </div>
        <div className="w-96 2xl:block hidden">
         <MorefromThem
          posts={userPost}
          userName={postUser.name}
         />
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
