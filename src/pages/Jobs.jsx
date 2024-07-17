import React from 'react'
import SideBar from '../components/SideBar'
import MaxJob from '../components/MaxJob'
import MinPost from '../components/MinPost'

const Jobs = () => {
  return (
    <div className='flex'>
      <SideBar/>
      <MaxJob/>
      <MinPost/>
    </div>
  )
}

export default Jobs
