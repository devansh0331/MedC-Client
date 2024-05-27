import React from 'react'
import MaxJobCard from './MaxJobCard'

const MaxJob = () => {
  return (
    <div className='flex flex-col w-2/4 mx-auto mt-6 overflow-y-scroll scrollbar-thin'>
      <MaxJobCard/>
      <MaxJobCard/>
      <MaxJobCard/>
      <MaxJobCard/>
      <MaxJobCard/>
      <MaxJobCard/>
      <MaxJobCard/>
      <MaxJobCard/>
    </div>
  )
}

export default MaxJob
