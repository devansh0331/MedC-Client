import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import SignInPage from "./SignInPage";
import ResetPassword from "./ResetPassword";
import HomePage from "./HomePage";
import OTPVerification from "./OTPVerification";
import NewPassword from "./NewPassword";
import SignUpPage from "./SignUpPage";
import FeedPage from "./FeedPage";
import "../index.css";
import ProfilePage from "./ProfilePage";
import JobPage from "./JobPage";
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
// import { NavbarWithSearch } from "./Nav";

function Main() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar route="signup" />
            <HomePage />
          </>
        }
      />
      <Route
        path="/signup"
        element={
          <>
            <Navbar route="signin" />
            <SignUpPage />
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <Navbar route="signup" />
            <SignInPage />
          </>
        }
      />
      <Route
        path="/reset-password"
        element={
          <>
            <Navbar route="signup" />
            <ResetPassword />
          </>
        }
      />
      <Route
        path="/otp-verification"
        element={
          <>
            <Navbar route="signup" />
            <OTPVerification />
          </>
        }
      />
      <Route
        path="/new-password"
        element={
          <>
            <Navbar route="signup" />
            <NewPassword />
          </>
        }
      />
      <Route
        path="/feed"
        element={
          <>
            <Navbar route="signup" />
            <FeedPage />
          </>
        }
      />
      <Route
        path="/profile"
        element={
          <>
            <Navbar route="profile" />
            <ProfilePage />
          </>
        }
      />
      <Route
        path="/user/:id"
        element={
          <>
            <Navbar route="profile" />
            <SingleUserProfilePage />
          </>
        }
      />
      <Route
        path="/jobs"
        element={
          <>
            <Navbar route="profile" />
            <JobPage />
          </>
        }
      />
      <Route
        path="/postjob"
        element={
          <>
            <Navbar route="profile" />
            <PostJobPage />
          </>
        }
      />
      <Route
        path="/about"
        element={
          <>
            <Navbar route="profile" />
            <AboutPage />
          </>
        }
      />
      <Route
        path="/faq"
        element={
          <>
            <Navbar route="profile" />
            <Faq />
          </>
        }
      />
      <Route
        path="/privacypolicy"
        element={
          <>
            <Navbar route="profile" />
            <Privacypolicy />
          </>
        }
      />
      <Route
        path="/editdetails"
        element={
          <>
            <Navbar route="profile" />
            <EditDetails />
          </>
        }
      />
      <Route
        path="/post/:id"
        element={
          <>
            <Navbar route="profile" />
            <SinglePost />
          </>
        }
      />
      <Route
        path="/connections"
        element={
          <>
            <Navbar />
            <Connections />
          </>
        }
      />
      <Route
        path="/hire"
        element={
          <>
            <Navbar />
            <Hire />
          </>
        }
      />
    </Routes>
  );
}

export default Main;
