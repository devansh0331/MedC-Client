import React from 'react'
import MinPostCard from './MinPostCard'
import { FaExpand } from "react-icons/fa";
import { feedClick } from '../Slices/feedSlice';
import { useDispatch, useSelector } from 'react-redux';
const MinPost = () => {
    const dispatch = useDispatch();
    const minJobs = useSelector((state)=> state.feed.minJobs);
const handleExpand = () =>{
   dispatch(feedClick(!minJobs))
    console.log(minJobs)
}
  return (
    <div className='w-1/3 bg-white h-2/3  overflow-y-scroll scrollbar-thin flex flex-col items-center px-6 py-3 mx-auto mt-6'>
      <div className="flex w-full justify-between items-center">
      <p className="text-xl w-full border-b-2 font-semibold">New Posts</p>
      <button onClick={()=>handleExpand()}>
        <FaExpand />
        </button>
      </div>
      <MinPostCard/>
      <MinPostCard/>
      <MinPostCard/>
      <MinPostCard/>
      <MinPostCard/>
      <MinPostCard/>
      <MinPostCard/>
    </div>
  )
}

export default MinPost
