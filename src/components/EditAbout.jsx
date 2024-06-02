import React from 'react'
import { MdClose } from "react-icons/md";
const EditAbout = (props) => {
  return (
    <div className='w-screen h-screen z-100 bg-dialogueBg flex items-center justify-center'>
      <div className='w-2/5 h-3/5 m-auto bg-white rounded-2xl flex flex-col p-3'>
        <div className='flex justify-between mx-4 mt-1'>
            <p className='text-lg text-gray-700 font-medium'>Edit Profile</p>
            <button onClick={() => props.setCloseAbout(false)}><MdClose className='w-6 h-6 text-gray-700 font-medium'/></button>
        </div>
        <div className="flex flex-col mx-4 my-1 h-full">
            <div className="flex flex-col my-1 h-full">
            <label className='text-gray-700 text-base'>About</label>
            <textarea className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-4/5'/>
            </div>
        </div>
        <div className="flex justify-end mx-4 mt-2">
            <button className='text-primary border-2 border-primary px-3 py-1 rounded-md' onClick={() => props.setCloseAbout(false)}>Cancel</button>
            <button className='text-white bg-primary px-3 py-1 rounded-md ml-3'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditAbout
