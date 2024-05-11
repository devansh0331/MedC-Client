import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";
import SignInPage from "./SignInPage";
import ResetPassword from "./ResetPassword";
import HomePage from "./HomePage";
import OTPVerification from "./OTPVerification";
import NewPassword from "./NewPassword";

function Main() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Navbar />
            <HomePage />
          </>
        }
      />
      <Route
        path="/signin"
        element={
          <>
            <Navbar />
            <SignInPage />
          </>
        }
      />
      <Route
        path="/reset-password"
        element={
          <>
            <Navbar />
            <ResetPassword />
          </>
        }
      />
      <Route
        path="/otp-verification"
        element={
          <>
            <Navbar />
            <OTPVerification />
          </>
        }
      />
      <Route
        path="/new-password"
        element={
          <>
            <Navbar />
            <NewPassword />
          </>
        }
      />
    </Routes>
  );
}

export default Main;
