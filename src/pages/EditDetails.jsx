import React from 'react'
import { useState } from 'react';
import { FiEdit } from "react-icons/fi";
import EditExperience from '../components/EditExperience';
import EditEdu from '../components/EditEdu';
import EditCert from '../components/EditCert';
import EditAchi from '../components/EditAchi';
import { BsPersonCircle } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
const EditDetails = () => {
    const [section, setSection] = useState("Experience");
    const [editexp, setEditexp] = useState(false);
    const [editEdu, setEditEdu] = useState(false);
    const [editCert, setEditCert] = useState(false);
    const [editAchi, setEditAchi] = useState(false);
    const navigate = useNavigate();

    const handleAdd = () =>{
      if(section === "Experience"){
        setEditexp(true);
      }else if(section === "Education"){
        setEditEdu(true);
      }else if(section === "Certificates"){
        setEditCert(true);
      }else if(section === "Achivements"){
        setEditAchi(true);
      }
    }
  return (
    <div className='w-full h-screen mx-auto bg-background pt-20 overflow-hidden relative'>
        {editexp &&
        <EditExperience className="absolute" setEditexp={setEditexp} />
        }
        {editEdu &&
        <EditEdu className="absolute" setEditEdu={setEditEdu} />
        }
        {editCert &&
        <EditCert className="absolute" setEditCert={setEditCert} />
        }
        {editAchi &&
        <EditAchi className="absolute" setEditAchi={setEditAchi}/>
        }
      <div className="w-3/4 bg-white flex justify-between border-b-2 py-2 text-lg mx-auto items-center">
        <div className="w-full flex justify-between items-center">
        <div className="flex  text-gray-800 ">
            <button className={`border-r-2 mx-1 px-2 border-gray-300 ${(section === "Experience") ? "text-blue-600" : ""}`} onClick={() => setSection("Experience")}>Experience</button>
            <button className={`border-r-2 mx-1 px-2 border-gray-300 ${(section === "Education") ? "text-blue-600" : ""}`} onClick={() => setSection("Education")}>Education</button>
            <button className={`border-r-2 mx-1 px-2 border-gray-300 ${(section === "Certificates") ? "text-blue-600" : ""}`} onClick={() => setSection("Certificates")}>Certificates</button>
            <button className={`mx-1 px-2 ${(section === "Achivements") ? "text-blue-600" : ""}`} onClick={() => setSection("Achivements")}>Achivements</button>
        </div>
        <button className="mr-3 text-gray-700" onClick={()=> navigate("/profile")}><BsPersonCircle className=' w-6 h-6'/></button>
        </div>
        </div>
      <div className="w-3/4 overflow-y-scroll scrollbar-thin bg-white h-ful mx-auto">
        {(section === "Experience") &&
        <div className=" px-3">
            <div className="w-full my-1 px-3 py-2 border-b-2">
                <div className="flex justify-between">
                <p className='text-base font-medium'>Heart Surgeon</p>
                <button className="" onClick={()=> setEditexp(true)}><FiEdit className='w-5 h-5'/></button>
                </div>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
        </div>
        }
        {(section === "Education") &&
            <div className=" px-3">
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <div className="flex justify-between">
                <p className='text-base font-medium'>Bhilai Institute of Technology, Durg</p>
                <button className="" onClick={()=> setEditEdu(true)}><FiEdit className='w-5 h-5'/></button>
                </div>
                <p className='text-sm text-gray-800'>Bachelor's Degree</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                </div>
            </div>
        }
        {(section === "Certificates") &&
            <div className=" px-3">
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <div className="flex justify-between">
                <p className='text-base font-medium'>Certificate Title</p>
                <button className="" onClick={()=> setEditCert(true)}><FiEdit className='w-5 h-5'/></button>
                </div>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
            </div>
        }
        {(section === "Achivements") &&
            <div className=" px-3">
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <div className="flex justify-between">
                <p className='text-base font-medium'>Certificate Title</p>
                <button className="" onClick={()=> setEditAchi(true)}><FiEdit className='w-5 h-5'/></button>
                </div>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
            </div>
        }
      <div className='w-full flex justify-end py-2 px-5'>
        <button className="bg-primary text-white px-3 py-1 rounded-full" onClick={()=> handleAdd()}>Add</button>
      </div>
      </div>
    </div>
  )
}

export default EditDetails
