import React from 'react'
import SideBar from '../components/SideBar'
import MaxJob from '../components/MaxJob'
import MinPost from '../components/MinPost'

const Jobs = () => {
  return (
    <div className="w-full flex h-[90vh] bg-background">
      <SideBar/>
      <div className="flex w-[80%] mx-auto h-[90vh] gap-4">
        <div className="w-3/5">
        <MaxJob/>
        </div>
        <div className="w-2/5">
        <MinPost />
        </div>
      </div>
    </div>
  )
}

export default Jobs
