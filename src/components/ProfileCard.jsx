import React, { useEffect } from 'react'
import profile2 from "../assets/profile2.png";
import { IoLocationSharp } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
import { useState } from 'react';
import EditProfile from './EditProfile';

const ProfileCard = (props) => {
    const [linkedin,setLinkedin] = useState('/devansh-shrivastava');
    const [check,setCheck] = useState(false);

    useEffect(() => {   
      if(props.route === "profile"){
          setCheck(true);
      }
      if(props.route === "feed"){
          setCheck(false);
      }
      if(linkedin.length > 15){
          const text = linkedin.slice(0,15);
        setLinkedin(text);
      }
    })
  return (
    <div className={`bg-white pt-6 pb-2 rounded-xl flex flex-col items-center ${check ? `px-8`: `px-4`}`}>
      <img src={profile2} className='rounded-full h-20 w-20' />
      <div className="flex flex-col mx-auto my-2 h-auto pb-2 border-b-2">
      <div className='text-md font-semibold mx-auto mb-1'>Devansh Shrivastav</div>
      <div className='text-sm mx-auto text-gray-700'>ENT Specialist</div>
      </div>
      <div className="flex flex-col mx-auto my-2 h-auto">
      <div className='text-sm flex items-center text-gray-700 my-1'><IoLocationSharp className='w-4 h-4 mr-3' />Bhilai, Chhattisgarh</div>
      <div className='text-sm flex items-center text-gray-700 my-1'><FaPhoneAlt className='w-4 h-4 mr-3'/>+91 1234567890</div>
      <div className='text-sm flex items-center text-gray-700 my-1'><MdEmail className='w-4 h-4 mr-3'/>devansh@gmail.com</div>
      <div className='text-sm flex items-center text-gray-700 my-1'><FaLinkedinIn className='w-4 h-4 mr-3'/>{linkedin}</div>
      {check &&
      <button className='mx-auto text-blue-600 underline my-2' onClick={() => props.setClose(true)}>Edit Profile</button>
      }
      </div>
      
    </div>
  ) 
}

export default ProfileCard
