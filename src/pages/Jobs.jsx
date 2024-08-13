import React from 'react'
import SideBar from '../components/SideBar'
import MaxJob from '../components/MaxJob'
import MinPost from '../components/MinPost'

const Jobs = () => {
  return (
    <div className="w-full flex h-[90vh] bg-background">
      <SideBar/>
      <div className="flex mx-auto gap-4 justify-center flex-row w-full lg:w-[80%] xl:w-[70%]">
        <div className="w-[95%] sm:w-2/3  lg:w-4/6 flex justify-center">
        <MaxJob/>
        </div>
        <div className="hidden lg:block w-96">
        <MinPost />
        </div>
      </div>
    </div>
  )
}

export default Jobs
