import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react'
import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../UserContext'
import Cookies from "js-cookie";
import { SERVER_URL } from "../ServerURL";

const ResumeApplyDialog = (props) => {
    const {user} = useContext(UserContext);
    const [selectedResume, setSelectedResume] = useState(null);
    const [allResume, setAllResume] = useState([]);

    const getUserResume = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/userResume/get-resume`, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${Cookies.get("token")}`,
              },
            });
            const res = await response.json();
            if (res.success) {
                setAllResume(res.data);
            } else {
              console.log(res.error);
            }
          } catch (error) {
            console.log(error);
          }
    }

    useEffect(() => {
        getUserResume();
    })
  return (
    <Dialog open={props.open} handler={props.handler}>
      <DialogHeader>Select a Resume</DialogHeader>
      <DialogBody>
        <div>
          {allResume.map((resume) => (
            <div
              key={resume._id}
              className="flex items-center justify-between p-2 cursor-pointer hover:bg-gray-100"    
              onClick={() => {
                setSelectedResume(resume);
              }}
            >
              <div className="flex items-center">
                <p className={`ml-2 ${selectedResume?._id === resume._id ? 'text-blue-500' : 'text-gray-500' }`}>{resume?.resumeName}</p>
              </div>
             </div>
          ))}
        </div>
      </DialogBody>
    </Dialog>
  )
}

export default ResumeApplyDialog
