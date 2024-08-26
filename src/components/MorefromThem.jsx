import { Card, Typography } from '@material-tailwind/react'
import React, { useContext } from 'react'
import MinPostCard from './MinPostCard'
import { UserContext } from '../UserContext'

const MorefromThem = (props) => {
  
  const {handleLike} = useContext(UserContext) 
  // console.log(props.posts);
  
  return (
    <Card className='bg-inherit h-2/3 lg:flex hidden flex-col items-center mx-auto mt-5 shadow-md'>
      <Card className="w-full flex items-center justify-center bg-white rounded-md">
        <div className="flex w-11/12 my-1 justify-between items-center">
          <Typography className="text-xl w-full font-semibold">More from <span className='text-blue-500'>{props.userName}</span></Typography>
        </div>
      </Card>
      <div className="w-full overflow-y-scroll scrollbar-thin flex flex-col items-center">
        {props.posts.map((post, key) => (
          <MinPostCard
            post={post}
            key={key}
          />
        ))}
      </div>
    </Card>
  )
}

export default MorefromThem