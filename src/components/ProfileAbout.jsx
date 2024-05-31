import React from 'react'
import { FiEdit } from "react-icons/fi";
import { useState } from 'react';
const ProfileAbout = (props) => {
  return (
    <div className='w-full flex flex-col bg-white py-1 px-3 rounded-xl'>
      <div className="flex items-center justify-between pb-1 my-1 border-b-2">
        <p className='text-xl font-medium text-gray-700'>About</p>
        <button onClick={() => props.setCloseAbout(true)}><FiEdit className='w-5 h-5'/></button>
      </div>
      <div className="w-full text-gray-700">
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </div>
    </div>
  )
}

export default ProfileAbout
