import React from 'react'
import SideBar from '../components/SideBar'
import JobCard from '../components/JobCard'
import MoreLikeThis from '../components/MoreLikeThis'
import SingleJobCard from '../components/SingleJobCard'
import JobCardSingle from '../components/JobCardSingle'
import JobNav from '../components/JobNav'
import { useParams } from 'react-router-dom'

const SingleJob = (props) => {
  const jobId = useParams()

  console.log(jobId.id)

  return (
    <div className='w-full h-[90vh] flex bg-background overflow-y-hidden'>
      <SideBar/>
      <div className="flex w-[90%] mx-auto h-full gap-6 justify-center mt-5">
        <div className="w-3/5 flex flex-col gap-3">
        <JobNav/>
        <div className='overflow-y-scroll scrollbar-thin'>
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
