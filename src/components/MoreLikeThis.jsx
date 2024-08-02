import React from 'react'
import { Card, Typography } from '@material-tailwind/react'
import SingleJobCard from './SingleJobCard'
const MoreLikeThis = () => {
  return (
    <Card className="bg-inherit h-2/3 lg:flex hidden flex-col items-center mx-auto mt-5 shadow-none">
      <Card className="w-full flex items-center justify-center bg-white rounded-md">
        <div className="flex w-11/12 my-1 justify-between items-center">
          <Typography className="text-xl w-full font-semibold">More Like This</Typography>
        </div>
      </Card>
      <div className="w-full overflow-y-scroll scrollbar-thin flex flex-col items-center">
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
        <SingleJobCard />
      </div>
    </Card>
  )
}

export default MoreLikeThis
