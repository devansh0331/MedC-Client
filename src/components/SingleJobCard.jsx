import React from 'react'
import { CiStar } from "react-icons/ci";
import profile from '../assets/profile.png';
const SingleJobCard = () => {
  return (
    <div className='w-full mt-3 border-b-2 pb-2'>
      <div className="w-full flex items-center justify-between ">
        <div className="flex items-center justify-center">
          <img
            src={profile}
            alt=""
            className="rounded-full h-6 md:h-6 w-6 md:w-6 object-cover object-center cursor-pointer"
          />
          <h3 className="text-base pl-2">Senior Dentist : Job Profile</h3>
        </div>

        {/* SAVE JOB */}
        <div className="flex items-center justify-center">
          <CiStar className="text-2xl" />
        </div>
      </div>

      {/* LOCATION */}
      <div className="w-full flex items-center justify-start pt-1">
        <p className="text-gray-600 text-md">Deloitte Hospital, Hyderabad</p>
      </div>

      {/* SALARY AND DURATION OF JOB POSTING */}
      <div className="w-full flex items-center justify-between text-gray-600 text-md">
        {/* SALARY */}
        <div>
          <p>Rs. 2,000 - 5,000 / Hourly</p>
        </div>

        {/* DURATION OF JOB POSTING */}
        <div>27d</div>
      </div>
    </div>
  )
}

export default SingleJobCard
