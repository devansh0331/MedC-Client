import React from 'react'
import { useState } from 'react';
import { FiEdit } from "react-icons/fi";
const ProfileDetails = () => {
    const [section, setSection] = useState("Achivements");
  return (
    <div className='w-full h-4/5 flex flex-col bg-white mt-4 mb-4 px-2 rounded-xl'>
      <div className="w-full flex justify-between border-b-2 py-2 text-md items-center">
        <div className="flex  text-gray-800 ">
            <button className={`border-r-2 mx-1 px-2 border-gray-300 ${(section === "Experience") ? "text-blue-600" : ""}`} onClick={() => setSection("Experience")}>Experience</button>
            <button className={`border-r-2 mx-1 px-2 border-gray-300 ${(section === "Education") ? "text-blue-600" : ""}`} onClick={() => setSection("Education")}>Education</button>
            <button className={`border-r-2 mx-1 px-2 border-gray-300 ${(section === "Certificates") ? "text-blue-600" : ""}`} onClick={() => setSection("Certificates")}>Certificates</button>
            <button className={`mx-1 px-2 ${(section === "Achivements") ? "text-blue-600" : ""}`} onClick={() => setSection("Achivements")}>Achivements</button>
        </div>
        <button className=""><FiEdit className='w-5 h-5'/></button>
      </div>
      <div className="overflow-y-scroll scrollbar-thin mx-2 h-96">
        {(section === "Experience") &&
        <div className=" px-3">
            <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Heart Surgeon</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Heart Surgeon</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Heart Surgeon</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Heart Surgeon</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
            <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Heart Surgeon</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            </div>
        </div>
        }
        {(section === "Education") &&
            <div className=" px-3">
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Bhilai Institute of Technology, Durg</p>
                <p className='text-sm text-gray-800'>Bachelor's Degree</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Bhilai Institute of Technology, Durg</p>
                <p className='text-sm text-gray-800'>Bachelor's Degree</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Bhilai Institute of Technology, Durg</p>
                <p className='text-sm text-gray-800'>Bachelor's Degree</p>
                <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                </div>
                    <div className="w-full my-1 px-3 py-2 border-b-2">
                    <p className='text-base font-medium'>Bhilai Institute of Technology, Durg</p>
                    <p className='text-sm text-gray-800'>Bachelor's Degree</p>
                    <p className='text-sm text-gray-600 italic'>(2020 - 2022)</p>
                    </div>
            </div>
        }
        {(section === "Certificates") &&
            <div className=" px-3">
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-800'>ABC Hospital</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
            </div>
        }
        {(section === "Achivements") &&
            <div className=" px-3">
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
                <div className="w-full my-1 px-3 py-2 border-b-2">
                <p className='text-base font-medium'>Certificate Title</p>
                <p className='text-sm text-gray-700'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
                </div>
            </div>
        }
      </div>
    </div>
  )
}

export default ProfileDetails
