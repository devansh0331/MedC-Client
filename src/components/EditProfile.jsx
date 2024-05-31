import { Dialog } from '@material-tailwind/react';
import React from 'react'
import { MdClose } from "react-icons/md";
const EditProfile = (props) => {
  return (
    <div className='w-screen h-screen z-100 bg-dialogueBg flex items-center justify-center'>
      <div className='w-2/5 h-3/5 m-auto bg-white rounded-2xl flex flex-col p-3'>
        <div className='flex justify-between mx-4 mt-1'>
            <p className='text-lg text-gray-700 font-medium'>Edit Profile</p>
            <button onClick={() => props.setClose(false)}><MdClose className='w-6 h-6 text-gray-700 font-medium'/></button>
        </div>
        <div className="flex flex-col mx-4 my-1">
            <div className="flex flex-col my-1">
            <label className='text-gray-700 text-sm'>Name</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-2/3 h-7'/>
            </div>
            <div className="flex flex-col my-1">
            <label className='text-gray-700 text-sm'>Bio</label>
            <textarea className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-14'/>
            </div>
            <div className="flex w-full justify-between ">
            <div className="flex flex-col h-1/2 my-1">
            <label className='text-gray-700 text-sm'>Location</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7'/>
            </div>
            <div className="flex flex-col h-1/2 my-1">
            <label className='text-gray-700 text-sm'>Contact</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7'/>
            </div>
            </div>
            <div className="flex w-full justify-between ">
            <div className="flex flex-col h-1/2 my-1">
            <label className='text-gray-700 text-sm'>Email</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7'/>
            </div>
            <div className="flex flex-col h-1/2 my-1">
            <label className='text-gray-700 text-sm'>LinkedIn</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7'/>
            </div>
            </div>
            <div className="flex w-full justify-between ">
            <div className="flex flex-col h-1/2 my-1">
            <label className='text-gray-700 text-sm'>Twitter</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7'/>
            </div>
            <div className="flex flex-col h-1/2 my-1">
            <label className='text-gray-700 text-sm'>Website</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-7'/>
            </div>
            </div>
        </div>
        <div className="flex justify-end mx-4 mt-2">
            <button className='text-primary border-2 border-primary px-3 py-1 rounded-md'>Cancel</button>
            <button className='text-white bg-primary px-3 py-1 rounded-md ml-3'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditProfile
