import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import SignInPage from "./SignInPage";
import ResetPassword from "./ResetPassword";
import HomePage from "./HomePage";
import OTPVerification from "./OTPVerification";
import NewPassword from "./NewPassword";
import SignUpPage from "./SignUpPage";

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
    </Routes>
  );
}

export default Main;
