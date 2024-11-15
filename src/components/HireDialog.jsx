import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { SERVER_URL } from "../ServerURL";
import toast, { Toaster } from "react-hot-toast";
import Cookies from "js-cookie";

const HireDialog = (props) => {
  const [senderEmail, setSenderEmail] = useState(props.senderEmail);
  
  // console.log(props.candidateId);
  
  const sendEmail = async () => {
    const mailContent =
      document.getElementsByClassName("dialogBody")[0]?.innerHTML;
    if (props.jobId) {
      try {
        const response = await fetch(
          `${SERVER_URL}/userjob/shortlist-candidate/${props.candidateId}`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({
              candidateId: props.candidateId,
              candidateEmail: props.candidateEmail,
              mailbody: mailContent,
            }),
          }
        );
        const res = await response.json();
        if (res.success) {
          toast.success(res.message);
          props.handler();
          setJobTitle("");
          setSenderEmail("");
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        toast.error("Failed to send email");
      }
    } else {
      try {
        const response = await fetch(
          `${SERVER_URL}/userjob/shortlist-candidate-directly`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "Content-type": "application/json",
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            body: JSON.stringify({
              candidateEmail: props.candidateEmail,
              mailbody: mailContent,
            }),
          }
        );
        const res = await response.json();
        console.log(res);

        if (res.success) {
          toast.success(res.message);
          props.handler();
          setJobTitle("");
          setSenderEmail("");
        } else {
          toast.error(res.error);
        }
      } catch (error) {
        toast.error("Failed to send email");
      }
    }
  };

  return (
    <>
      <Dialog open={props.open} handler={props.handler} className="overflow-y-scroll scrollbar-invisible h-[90vh]">
        <DialogHeader>Hire {props.name}</DialogHeader>
        <DialogBody className="">
          <div className="w-4/5 border-2 border-gray-500 rounded-lg p-4 bg-gray-50 mx-auto dialogBody">
            <p> Dear {props.name}, </p>
            <br />
            <p>
              <p>
                We are thrilled to inform you that your profile has been
                shortlisted by {props.senderName}. After a careful review of
                your qualifications and experience, they are eager to move
                forward with your application and explore the potential of
                welcoming you.
              </p>
              <br />
              <p>
                To take the next steps, please feel free to reach out directly
                to {props.senderName} at {senderEmail}.
                <br />
                We wish you the best of luck in your application journey.
              </p>
            </p>
            <br />
            <p>Best Regards</p>
            <p>
              <b>Team MedC</b>
            </p>
          </div>
          <div className="flex gap-2">
            <input
              className="w-1/2 mt-10 flex gap-2 justify-between border-[1px] border-gray-400 h-8 p-2 rounded-md items-center text-blue-gray-500 text-sm"
              onChange={(e) => setSenderEmail(e.target.value)}
              value={senderEmail}
              placeholder="Organization Email"
            />
          </div>
          <p className="text-blue-700 mt-2">
            *You can only edit the Organization Email.
          </p>
        </DialogBody>
        <DialogFooter className="gap-2 pt-0">
          <Button
            color="black"
            variant="outlined"
            size="sm"
            onClick={props.handler}
          >
            Cancel
          </Button>
          <Button color="blue" size="sm" onClick={sendEmail}>
            Send
          </Button>
        </DialogFooter>
      </Dialog>
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default HireDialog;
