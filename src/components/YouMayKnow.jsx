import React from 'react'
import { List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Card,
    Avatar,
    Typography
 } from '@material-tailwind/react'
 import altprofile from "../assets/altprofile.png"
 import { IoPersonAddOutline } from "react-icons/io5";


const YouMayKnow = () => {
  return (
    <Card className=''>
      <Typography className='border-b-2 py-3 px-4 text-lg'>People you may know</Typography>
      <Card className='overflow-y-scroll scrollbar-thin h-96'>
        <List>
            <ListItem>
                <ListItemPrefix>
                    <Avatar className='w-10 h-10' src={altprofile} alt="altprofile" />
                </ListItemPrefix>
                <div className="flex flex-col">
                <Typography className='font-bold'>John Doe</Typography>
                <Typography>Designer</Typography>
                </div>
                <ListItemSuffix>
                    <div className="border-[1px] p-1 rounded-full border-gray-400">
                    <IoPersonAddOutline className='w-5 h-5 text-gray-500'/>
                    </div>
                </ListItemSuffix>
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                    <Avatar className='w-10 h-10' src={altprofile} alt="altprofile" />
                </ListItemPrefix>
                <div className="flex flex-col">
                <Typography className='font-bold'>John Doe</Typography>
                <Typography>Designer</Typography>
                </div>
                <ListItemSuffix>
                    <div className="border-[1px] p-1 rounded-full border-gray-400">
                    <IoPersonAddOutline className='w-5 h-5 text-gray-500'/>
                    </div>
                </ListItemSuffix>
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                    <Avatar className='w-10 h-10' src={altprofile} alt="altprofile" />
                </ListItemPrefix>
                <div className="flex flex-col">
                <Typography className='font-bold'>John Doe</Typography>
                <Typography>Designer</Typography>
                </div>
                <ListItemSuffix>
                    <div className="border-[1px] p-1 rounded-full border-gray-400">
                    <IoPersonAddOutline className='w-5 h-5 text-gray-500'/>
                    </div>
                </ListItemSuffix>
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                    <Avatar className='w-10 h-10' src={altprofile} alt="altprofile" />
                </ListItemPrefix>
                <div className="flex flex-col">
                <Typography className='font-bold'>John Doe</Typography>
                <Typography>Designer</Typography>
                </div>
                <ListItemSuffix>
                    <div className="border-[1px] p-1 rounded-full border-gray-400">
                    <IoPersonAddOutline className='w-5 h-5 text-gray-500'/>
                    </div>
                </ListItemSuffix>
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                    <Avatar className='w-10 h-10' src={altprofile} alt="altprofile" />
                </ListItemPrefix>
                <div className="flex flex-col">
                <Typography className='font-bold'>John Doe</Typography>
                <Typography>Designer</Typography>
                </div>
                <ListItemSuffix>
                    <div className="border-[1px] p-1 rounded-full border-gray-400">
                    <IoPersonAddOutline className='w-5 h-5 text-gray-500'/>
                    </div>
                </ListItemSuffix>
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                    <Avatar className='w-10 h-10' src={altprofile} alt="altprofile" />
                </ListItemPrefix>
                <div className="flex flex-col">
                <Typography className='font-bold'>John Doe</Typography>
                <Typography>Designer</Typography>
                </div>
                <ListItemSuffix>
                    <div className="border-[1px] p-1 rounded-full border-gray-400">
                    <IoPersonAddOutline className='w-5 h-5 text-gray-500'/>
                    </div>
                </ListItemSuffix>
            </ListItem>
            <ListItem>
                <ListItemPrefix>
                    <Avatar className='w-10 h-10' src={altprofile} alt="altprofile" />
                </ListItemPrefix>
                <div className="flex flex-col">
                <Typography className='font-bold'>John Doe</Typography>
                <Typography>Designer</Typography>
                </div>
                <ListItemSuffix>
                    <div className="border-[1px] p-1 rounded-full border-gray-400">
                    <IoPersonAddOutline className='w-5 h-5 text-gray-500'/>
                    </div>
                </ListItemSuffix>
            </ListItem>
        </List>
      </Card>
    </Card>
  )
}

export default YouMayKnow