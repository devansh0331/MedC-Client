import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    e.preventDefault();
    navigate("/signin");
  };
  return (
    <nav className="fixed py-5 top-0 flex justify-center w-screen overflow-hidden">
      <div className="w-11/12 flex items-center justify-between">
        <div>Logo</div>
        <div className="flex items-center justify-end">
          <Button
            onClick={handleNavigate}
            variant="outlined"
            className="rounded-full"
          >
            Sign In
          </Button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
