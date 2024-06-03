import React from 'react'
import { MdClose } from "react-icons/md";

const EditCert = (props) => {
  return (
    <div className='w-screen h-screen z-100 bg-dialogueBg flex'>
      <div className='w-2/5 h-3/5 mx-auto mt-24 bg-white rounded-2xl flex flex-col p-3 justify-between'>
        <div className='flex justify-between mx-4 mt-2'>
            <p className='text-lg text-gray-700 font-medium'>Edit Certificate</p>
            <button onClick={() => props.setEditCert(false)}><MdClose className='w-6 h-6 text-gray-700 font-medium'/></button>
        </div>
        <div className="flex flex-col mx-4 my-1">
            <div className="flex flex-col my-1">
            <label className='text-gray-700 text-md'>Certificate</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-2/3'/>
            </div>
            <div className="flex flex-col h-1/2 my-1">
            <label className='text-gray-700 text-md'>Issuer</label>
            <input className='border-2 border-gray-400 rounded-md px-3 py-1 w-full'/>
            </div>
            <div className="flex flex-col my-1">
            <label className='text-gray-700 text-md'>Description</label>
            <textarea className='border-2 border-gray-400 rounded-md px-3 py-1 w-full h-16'/>
            </div>
            
        </div>
        <div className="flex justify-end mx-4 mt-2">
            <button className='text-primary border-2 border-primary px-3 py-1 rounded-md' onClick={() => props.setEditCert(false)}>Cancel</button>
            <button className='text-white bg-primary px-3 py-1 rounded-md ml-3'>Save</button>
        </div>
      </div>
    </div>
  )
}

export default EditCert
