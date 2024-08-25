import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Typography,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { SERVER_URL } from "../ServerURL";
import Cookies from "js-cookie";

export function SingleReportBox(props) {
  const [open, setOpen] = React.useState(true);
  const [singleReport, setSingleReport] = useState([]);

  const [reports, setReports] = useState([]);
  console.log("Single Report Box : " + props.id);
  const getSingleReportedProfile = async (id) => {
    try {
      console.log(id);
      const res = await fetch(`${SERVER_URL}/report/single-report/${id}`, {
        credentials: "include",
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });
      const parsedRes = await res.json();
      if (!parsedRes.success) {
        console.error(parsedRes.error);
      } else {
        console.log(parsedRes);
        setSingleReport(await parsedRes.data);
      }
    } catch (error) {
      console.error("Failed to get profiles");
    }
  };

  useEffect(() => {
    getSingleReportedProfile(props.id ? props.id : null);
  }, []);
  const handleOpen = () => {
    props.setOpen(!props.open);
  };

  return (
    <Dialog open={props.open} handler={handleOpen}>
      <DialogHeader>Reports on "{props.name}"</DialogHeader>
      <DialogBody className="h-[42rem] overflow-y-scroll">
        {singleReport.length > 0 && (
          <div className="grid grid-cols-1 gap-3 ">
            {singleReport.map((report, key) => (
              <Typography
                key={key}
                className="font-normal bg-background text-black p-3 rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <p>- {report.reason}</p>
                  <p className="text-red-500 font-semibold">{report.count}</p>
                </div>
              </Typography>
            ))}
          </div>
        )}
      </DialogBody>
      <DialogFooter className="space-x-2">
        <Button variant="gradiant" color="red" onClick={() => handleOpen()}>
          Close
        </Button>
        <Button variant="outlined" color="red" onClick={() => handleOpen()}>
          Archive Account
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
