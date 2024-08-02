import React from 'react'
import SideBar from '../components/SideBar'
import PostJobCard from '../components/PostJobCard'

const PostJobPage = () => {
  return (
    <div className='w-full flex bg-background h-[89vh]'>
      <SideBar/>
      <div className="flex w-full gap-4 justify-center mt-5">
        <div className="w-3/4">
        <PostJobCard/>
        </div>
      </div>
    </div>
  )
}

export default PostJobPage
