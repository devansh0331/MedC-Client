import { Card, Typography } from '@material-tailwind/react'
import React from 'react'
import MinPostCard from './MinPostCard'

const MorefromThem = () => {
  return (
    <Card className='bg-inherit h-2/3 lg:flex hidden flex-col items-center mx-auto mt-5 shadow-md'>
      <Card className="w-full flex items-center justify-center bg-white rounded-md">
        <div className="flex w-11/12 my-1 justify-between items-center">
          <Typography className="text-xl w-full font-semibold">More from Devansh</Typography>
        </div>
      </Card>
      <div className="w-full overflow-y-scroll scrollbar-thin flex flex-col items-center">
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
        <MinPostCard/>
      </div>
    </Card>
  )
}

export default MorefromThem
