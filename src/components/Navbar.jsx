import { Button } from "@material-tailwind/react";
import React from "react";

function Navbar() {
  return (
    <nav className="fixed py-5 top-0 flex justify-center w-screen overflow-hidden">
      <div className="w-11/12 flex items-center justify-between">
        <div>Logo</div>
        <div className="flex items-center justify-end">
          <Button variant="outlined" className="rounded-full">
            Sign Up
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
