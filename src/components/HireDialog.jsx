import {
    Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
} from "@material-tailwind/react";
import React, { useState } from "react";

const HireDialog = (props) => {
  const mailContent =
    document.getElementsByClassName("dialogBody")[0]?.innerHTML;
    const mailSubject = `Hire ${props.name}`;
    const [jobTitle, setJobTitle] = useState(props.jobTitle);
    const [senderEmail, setSenderEmail] = useState(props.senderEmail);
  return (
    <Dialog open={props.open} handler={props.handler}>
      <DialogHeader>Hire {props.name}</DialogHeader>
      <DialogBody className="dialogBody">
        <div className="w-4/5 border-2 border-gray-500 rounded-lg p-4 bg-gray-50 mx-auto">
          <p> Hi {props.name}, </p>
          <br/>
          <p>
            Great news! {props.senderName} want to hire you for the role of  
            {` ${jobTitle}`}. They are excited to move forward with your application. 
            You can contact them at {senderEmail}.
          </p>
          <br/>
          <p>Best Regards</p>
          <p>Team MedC</p>
        </div>
        <div className="flex gap-2">

        <input className="w-1/2 mt-10 flex gap-2 justify-between border-[1px] border-gray-400 h-8 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        onChange={(e) => setJobTitle(e.target.value)}
        value={jobTitle}
        placeholder="Job Title"/>
        <input className="w-1/2 mt-10 flex gap-2 justify-between border-[1px] border-gray-400 h-8 p-2 rounded-md items-center text-blue-gray-500 text-sm"
        onChange={(e) => setSenderEmail(e.target.value)}
        value={senderEmail}
        placeholder="Organization Email"/>
        </div>
        <p className="text-black mt-2">*You can only edit the Job Title and Organization Email.</p>
      </DialogBody>
      <DialogFooter className="gap-2 pt-0">
        <Button
        color="black"
        variant="outlined"
        size='sm'
        onClick={props.handler}
        >
            Cancel
        </Button>
        <Button
        color="blue"
        size='sm'>Send</Button>
      </DialogFooter>
    </Dialog>
  );
};

export default HireDialog;
