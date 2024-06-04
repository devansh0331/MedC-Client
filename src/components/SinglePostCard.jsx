import React, { useEffect } from "react";
import { useState } from "react";
import profile from "../assets/profile3.png";
import jobBuilding from "../assets/jobBuilding.png";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { AiOutlineLike } from "react-icons/ai";
import { SERVER_URL } from "../ServerURL";
import altprofile from "../assets/altprofile.png";
import { RiDeleteBin6Line } from "react-icons/ri";
const SinglePostCard = (props) => {
  const [comm, setComm] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [commentsCount, setCommentsCount] = useState(0);
  const postId = props.postId;
  const user = props.userId;

  useEffect(() => {   
  })
  const getComments = async (comm) => {
    if (comm == true) {
      try {
        const response = await fetch(
          `${SERVER_URL}/post/single-post/comment/all/${postId}`,
          { method: "GET" }
        );

        const res = await response.json();

        if (!res.success) {
          console.log(res.error);
        } else {
          setComments(res.data);
          setCommentsCount(res.data.length);
        }
      } catch (error) {
        console.error("Failed to fetch comments");
      }
    }
  };

  const addComment = async () => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/single-post/comment/post/${postId}`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ comment }),
        }
      );

      const res = await response.json();
      if (!res.success) {
        console.log("Failed to comment due to: ", res.error);
      } else {
        setComment("");
        getComments(true);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const deleteComment = async (commentId) => {
    try {
      const response = await fetch(
        `${SERVER_URL}/post/single-post/comment/delete/${commentId}`,
        {
          method: "POST",
          credentials: "include",
        }
      );
      const res = await response.json();
      if (!res.success) {
        console.log("Failed to delete comment due to: ", res.error);
      } else {
        getComments(true);
      }
    }catch (error) {
        console.error(error.message);
      }
    }
    

  return (
    <div>
      <div className="w-3/4 m-auto border-b-2 pb-4 py-2 mt-4">
        {/* NAME AND DETAILS */}
        <div className="flex justify-between">
          <div className="flex">
            <img
              src={props.profileURL != "" ? props.profileURL : altprofile}
              alt="profile"
              className="rounded-full h-10 md:h-12 w-10 md:w-12"
            />
            <div className="flex flex-col ml-4">
              <p className="text-black font-semibold text-md">{props.name}</p>
              <p className="text-gray-600 font-normal text-md">Technology</p>
            </div>
          </div>
          {/* TIME INFO */}
          <div className="flex items-center">
            <p className="text-gray-600 font-normal text-md">
              {props.postedAt}
            </p>
            <HiOutlineDotsHorizontal className="text-gray-600 ml-4 w-6 h-6" />
          </div>
        </div>

        {/* POST */}
        <div className="flex flex-col w-full py-4">
          <p className="text-md  text-gray-900">
            {props.description}
            <br />
            {props.readMore && (
              <button className="text-blue-500">Read More</button>
            )}
          </p>
          {props.img && (
            <img
              src={props.img}
              className="my-4 w-full h-auto mx-auto bg-gray-100  rounded-md"
            ></img>
          )}

          {/* LIKE AND COMMENT INFO */}
          <div className="flex justify-evenly pt-4">
            <div
              onClick={props.handleLike}
              className="flex items-center cursor-pointer"
            >
              {props.isLiked ? (
                <AiFillLike className="w-5 h-5 mr-4" />
              ) : (
                <AiOutlineLike className="w-5 h-5 mr-4" />
              )}{" "}
              {props.likes} {props.likes == 0 || props.likes == 1 ? "Like" : "Likes"}
            </div>
            <button
              className="flex items-center cursor-pointer"
              onClick={() => {
                setComm(!comm);
                getComments(!comm);
              }}
            >
              <FaRegCommentAlt className="w-4 h-4 mr-4" /> {commentsCount ? commentsCount : ""}{" "}
              {commentsCount === 1 ? "Comment" : "Comments"}
            </button>
            <div className="flex items-center cursor-pointer">
              <IoPaperPlaneOutline className="w-4 h-4 mr-4" /> Share
            </div>
          </div>

          {/* COMMENTS */}
          {comm && (
            <div>
              <div className="flex w-full items-center mt-2 p-2 ">
                <input
                  className="text-sm w-full border-2 border-gray-400 px-2 py-1 rounded-md text-gray-700 ml-8"
                  placeholder="Write a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button
                  onClick={addComment}
                  className="ml-2 text-sm bg-primary rounded-full px-4 py-1 text-white"
                >
                  Post
                </button>
              </div>
              {comments &&
                comments.map((comment, key) => (
                  <div key={key} className="w-full flex flex-col my-1">
                    <div className="w-full border-t-2 mx-auto p-2">
                      <div className="flex items-center">
                        <img src={profile} className="rounded-full h-6 w-6" />
                        <div className="flex w-full justify-between">
                        <p className="ml-2 text-sm font-semibold text-gray-700">
                          {comment.userId == null
                            ? "Unknown User"
                            : comment.userId.name}
                        </p>
                        {comment.userId._id === user && <button onClick={() => deleteComment(comment._id)}>
                          <RiDeleteBin6Line className="w-4 h-4 mr-2" />
                        </button>}
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 ml-8">
                        {comment.comment}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SinglePostCard;
