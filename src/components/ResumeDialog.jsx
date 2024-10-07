import React, { useEffect } from 'react'
import { Dialog, DialogHeader, DialogBody, DialogFooter, Button } from '@material-tailwind/react'
import { FaFileDownload } from 'react-icons/fa'
import { IoDocumentTextSharp } from 'react-icons/io5'
import { useState } from 'react'
import { useContext } from 'react'
import { IoClose } from "react-icons/io5";
import { UserContext } from '../UserContext'
import { SERVER_URL } from '../ServerURL'
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast'
import { login } from '../../../MedC-Server/controllers/auth'

const ResumeDialog = (props) => {
    const {user} = useContext(UserContext);
    const [file, setFile] = useState(null);
    const [allfiles, setAllFiles] = useState([]);

    const handlefileDownload = () => {
        const pdfUrl = file;
        const link = document.createElement("a");
        link.href = pdfUrl;
        link.download = `${props.user.name} file.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      };

      const handleFileChange = (event) => {
        const selectedFile = event.target.files[0];
        if (!selectedFile || selectedFile.type !== "application/pdf") {
          setFile(null);
          alert("Please select a PDF file!");
          return;
        }
        setFile(selectedFile);
      };

      const getAllFiles = async () => {
        try {
            const response = await fetch(`${SERVER_URL}/userfile/get-file`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${Cookies.get("token")}`,
                }                
            });
            const res = await response.json();
            console.log(res);
            if(res.success){
                setAllFiles(res.data);
            }else{
                console.log(res.error);
            }
        } catch (error) {
            console.log(error);
        }   
      }

      const handleUploadfile = async () => {
        if(!file){
            toast.error("Please select a file");
            return;
        }
        const formData = new FormData();
        if(file){
            formData.append("filepath", file);
            // console.log(formData);
            
            try {
                const response = await fetch(`${SERVER_URL}/userfile/add-file`,{
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${Cookies.get("token")}`,
                    },
                    body: formData
                });
    
                const res = await response.json();
                console.log(res);
                if(res.success){
                    toast.success(res.message);
                    getAllFiles();
                }else{
                    toast.error(res.error);
                }
            } catch (error) {
                toast.error(error);
            }
        }
      }

      useEffect(() => {
        getAllFiles();
      }, [user]);

  return (
       <Dialog open={props.open} handler={props.handler} size="sm">
        <DialogHeader>My file</DialogHeader>
        <DialogBody className="flex flex-col">
            {/* {allfiles?.length > 0 && (      
                <div className="my-1 border-[1px] border-gray-400 w-full sm:w-2/3 p-2 rounded-md flex items-center justify-between"> 
             
                <FaFileDownload className="w-5 h-5 cursor-pointer" onClick={() => handlefileDownload()} />
                </div>
            )} */}
          <p className="mt-5">Upload New file</p>
          <div className="mt-1 relative border-[1px] border-gray-400 w-full h-10 p-2 rounded-md flex items-center">
              <input
                id="file-upload"
                className="hidden"
                type="file"
                accept=".pdf"
                onChange={handleFileChange}
              />
              <label htmlFor="file-upload" className="">
                <IoDocumentTextSharp className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2" />{" "}
                <span className="ml-8 absolute top-1/2 -translate-y-1/2">
                  {file  ? file.name : "Upload file"}
                </span>
              </label>
              <IoClose
                className="w-5 h-5 absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer"
                onClick={() => setFile(null)}
              />
            </div>
        </DialogBody>
        <DialogFooter className="flex gap-2">
          <Button size="sm" variant="outlined" color="blue" onClick={props.handler}>Cancel</Button>
          <Button size="sm" color="blue" onClick={handleUploadfile}>Upload</Button>
        </DialogFooter>
      </Dialog>
  )
}

export default ResumeDialog