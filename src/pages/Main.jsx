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
import ProfilePage from "./ProfilePage";
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
        path="/profile"
        element={
          <>
            <NavMain route="profile" />
            <ProfilePage />
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
      {/* <Route
        path="/jobs"
        element={
          <>
            <NavMain route="profile" />
            <JobPage />
          </>
        }
      /> */}
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
        path="/job"
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
    </Routes>
  );
}

export default Main;
