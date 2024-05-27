import React from 'react'
import { FaRegBookmark } from "react-icons/fa";
import { IoPaperPlaneOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { MdOutlineLocationCity } from "react-icons/md";
import { FaMoneyBill } from "react-icons/fa6";
import { IoMdTimer } from "react-icons/io";
import { FaRegCalendarAlt } from "react-icons/fa";
const MaxJobCard = () => {
  return (
    <div className='w-full flex flex-col bg-white p-4 border-b-2'>
        {/* POST AND ORGANIZATION */}
      <div className='flex w-full justify-between px-5 my-2'>
        <div className='flex flex-col'>
            <p className='text-xl font-medium'>Senior Dentist</p>
            <p className='text-gray-600'>Deloitte Hospital</p>
        </div>
        <div className='flex'>
            <FaRegBookmark className='w-5 h-5 mx-2' />
            <IoPaperPlaneOutline className='w-6 h-6 mx-2' />
        </div>
      </div>

      {/* SALARY AND OTHER DETAILS */}
      <div className="flex flex-col text-gray-700 w-full px-5 my-2">
        <div className='flex items-center'><TiDocumentText className='w-5 h-5' /><span className='ml-3'>1-5 Yrs Experience</span></div>
        <div className='flex items-center'><MdOutlineLocationCity className='w-5 h-5' /><span className='ml-3'>Jaipur</span></div>
        <div className='flex items-center'><FaMoneyBill className='w-5 h-5' /><span className='ml-3'>Rs. 30,000 - 45,000 /month</span></div>
        <div className='flex items-center'><IoMdTimer className='w-5 h-5' /><span className='ml-3'>Immediate Joining</span></div>
        <div className='flex items-center'><FaRegCalendarAlt className='w-5 h-5' /><span className='ml-3'>Last Date: 30 May</span></div>
      </div>

      {/* APPLY */}
      <div className="w-full flex justify-between px-5 my-2">
        <div className="flex flex-col">
            <p className='text-sm text-gray-500'>250 Applicants</p>
            <p className='text-sm text-gray-500'>Posted By: <span className='hover:text-gray-700 cursor-pointer'>Aman Mishra</span>  | 2 Days Ago</p>
        </div>
        <div className="flex justify-evenly">
            <button className="bg-primary text-white px-4 py-1 rounded-lg mx-2 shadow-md">Apply</button>
            <button className="bg-white border-2 border-primary text-primary px-4 mx-2 py-1 rounded-lg shadow-md">Save</button>
        </div>
      </div>
    </div>
  )
}

export default MaxJobCard
