import React from "react";
import { Route, Routes } from "react-router-dom";
import SignInPage from "./SignInPage";
import ResetPassword from "./ResetPassword";
import HomePage from "./HomePage";
import OTPVerification from "./OTPVerification";
import NewPassword from "./NewPassword";
import SignUpPage from "./SignUpPage";
import FeedPage from "./FeedPage";
import "../index.css";
import PostJobPage from "./PostJobPage";
import AboutPage from "./AboutPage";
import Faq from "./Faq";
import Privacypolicy from "./Privacypolicy";
import SideBar from "../components/SideBar";
import EditDetails from "./EditDetails";
import SinglePost from "./SinglePost";
import Connections from "./Connections";
import Hire from "./Hire";
import SingleUserProfilePage from "./SingleUserProfilePage";
import Jobs from "./Jobs";
import NavMain from "../components/NavMain";
import Settings from "./Settings";
import SingleJob from "./SingleJob";
import Admin from "./Admin";
import Saves from "./Saves";
import Blogs from "./Blogs";
import SingleBlog from "./SingleBlog";
import CreateBlog from "./CreateBlog";
import ArchivedPosts from "./ArchivedPosts";
import Contactus from "./Contactus";
import ViewApplications from "./ViewApplications";
import PostCardNew from "../components/PostCardNew";
// import { NavbarWithSearch } from "./Nav";

function Main() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavMain />
            <HomePage />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <NavMain route="signin" />
            <SignUpPage />
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <NavMain route="signup" />
            <SignInPage />
          </>
        }
      />
      <Route
        path="/reset-password"
        element={
          <>
            <NavMain route="signup" />
            <ResetPassword />
          </>
        }
      />
      <Route
        path="/otp-verification"
        element={
          <>
            <NavMain route="signup" />
            <OTPVerification />
          </>
        }
      />
      <Route
        path="/new-password"
        element={
          <>
            <NavMain route="signup" />
            <NewPassword />
          </>
        }
      />
      <Route
        path="/feed"
        element={
          <>
            <NavMain route="signup" />
            {/* <SideBar/> */}
            <FeedPage />
          </>
        }
      />
      <Route
        path="/jobs"
        element={
          <>
            <NavMain route="signup" />
            <Jobs />
          </>
        }
      />
      <Route
        path="/user/:id"
        element={
          <>
            <NavMain route="profile" />
            <SingleUserProfilePage />
          </>
        }
      />
      <Route
        path="/postjob"
        element={
          <>
            <NavMain route="profile" />
            <PostJobPage />
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            <NavMain route="profile" />
            <AboutPage />
          </>
        }
      />
      <Route
        path="/faq"
        element={
          <>
            <NavMain route="profile" />
            <Faq />
          </>
        }
      />
      <Route
        path="/privacypolicy"
        element={
          <>
            <NavMain route="profile" />
            <Privacypolicy />
          </>
        }
      />
      <Route
        path="/editdetails"
        element={
          <>
            <NavMain route="profile" />
            <EditDetails />
          </>
        }
      />
      <Route
        path="/post/:id"
        element={
          <>
            <NavMain route="profile" />
            <SinglePost />
          </>
        }
      />
      <Route
        path="/job/:id"
        element={
          <>
            <NavMain route="profile" />
            <SingleJob />
          </>
        }
      />
      <Route
        path="/connections"
        element={
          <>
            <NavMain />
            <Connections />
          </>
        }
      />
      <Route
        path="/hire"
        element={
          <>
            <NavMain />
            <Hire />
          </>
        }
      />
      <Route
        path="/settings"
        element={
          <>
            <NavMain />
            <Settings />
          </>
        }
      />
      <Route
        path="/admin"
        element={
          <>
            <NavMain />
            <Admin />
          </>
        }
      />
      <Route
        path="/user-saves/:id"
        element={
          <>
            <NavMain />
            <Saves />
          </>
        }
      />
      <Route
        path="/blogs"
        element={
          <>
            <NavMain />
            <Blogs />
          </>
        }
      />
      <Route
        path="/blog/:id"
        element={
          <>
            <NavMain />
            <SingleBlog />
          </>
        }
      />
      <Route
        path="/create-blog"
        element={
          <>
            <NavMain />
            <CreateBlog />
          </>
        }
      />
      <Route
        path="/archivedPosts"
        element={
          <>
            <NavMain />
            <ArchivedPosts />
          </>
        }
      />
      <Route
        path="/contactus"
        element={
          <>
            <NavMain />
            <Contactus />
          </>
        }
      />
      <Route
        path="/job/:id/applications"
        element={
          <>
            <NavMain />
            <ViewApplications />
          </>
        }
      />
      <Route
        path="/new-posts/posts"
        element={
          <>
            <NavMain />
            <PostCardNew />
          </>
        }
      />
    </Routes>
  );
}

export default Main;
