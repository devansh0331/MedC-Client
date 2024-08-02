import React from 'react'
import SideBar from '../components/SideBar'
import JobCard from '../components/JobCard'
import MoreLikeThis from '../components/MoreLikeThis'
import SingleJobCard from '../components/SingleJobCard'
import JobCardSingle from '../components/JobCardSingle'
import JobNav from '../components/JobNav'

const SingleJob = () => {
  return (
    <div className='w-full h-[90vh] flex bg-background'>
      <SideBar/>
      <div className="flex w-full h-full gap-6 justify-center">
        <div className="w-3/5 mt-5 flex flex-col gap-4">
        <JobNav/>
        <div className=' overflow-y-scroll scrollbar-thin'>
        <JobCardSingle/>
        </div>
        </div>
        <div className="w-96">
        <MoreLikeThis/>
        </div>
      </div>
    </div>
  )
}

export default SingleJob
