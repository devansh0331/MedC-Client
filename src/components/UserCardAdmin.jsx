import React from 'react'
import { Card, CardBody, CardHeader, CardFooter, Avatar, Badge, Typography, Button,
    Dialog, DialogHeader, DialogBody, DialogFooter
 } from '@material-tailwind/react'
import altprofile from '../assets/altprofile.png'
import { IoLocationSharp } from "react-icons/io5";
import { BsBuildingsFill } from "react-icons/bs";
import { useState } from 'react';

const UserCardAdmin = () => {

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(!open);


  return (
    <Card className="p-3 m-3 cursor-pointer">
    <CardHeader
      floated={false}
      shadow={false}
      color="transparent"
      className="p-0 m-0  flex flex-col items-center justify-center w-full border-b-2 rounded-none pb-2"
    >
        <Avatar
          src={altprofile}
          alt="altprofile"
          size="xl"
          className="w-24 h-24 mx-auto"
        />
      <Typography className="text-lg mt-2">John Doe</Typography>
      <Typography className="text-sm">
        Lorem ipsum dolor sit amet.
      </Typography>
    </CardHeader>
    <CardBody className="m-0 p-0 mt-3 border-b-2 rounded-none pb-2">
      <Typography className="flex items-center">
        <IoLocationSharp />
        <span className="ml-1">Jaipur</span>
      </Typography>
      <Typography className="flex items-center">
        <BsBuildingsFill />
        <span className="ml-1">ABC Hospital</span>
      </Typography>
    </CardBody>
    <CardFooter className="m-0 p-0 mt-3 mx-auto">
      <Button
        size="sm"
        className="px-2 py-1 font-light rounded-md"
        variant='outlined'
        color="red"
        onClick={handleOpen}
      >
        Delete User
      </Button>
    </CardFooter>

    {/* DELETE DIALOG */}
    <Dialog open={open} handler={handleOpen}>
      <DialogHeader className="text-gray-800 m-0 pb-2">Delete User</DialogHeader>
       <DialogBody className="m-0 pt-2">
        <Typography className="text-gray-800 text-lg">
        Choose the reason why you want to delete this user.
        </Typography>
        <div className="w-full p-3 text-[16px] text-gray-700">
            <div className="flex items-center">
                <input id="default-radio-1" type="radio" name="reason"/>
                <label className="ml-3" htmlFor="default-radio-1">Inappropriate content</label>
            </div>
            <div className="flex items-center">
                <input id="default-radio-2" type="radio" name="reason"/>
                <label className="ml-3" htmlFor="default-radio-2">Inappropriate content</label>
            </div>
            <div className="flex items-center">
                <input id="default-radio-3" type="radio" name="reason"/>
                <label className="ml-3" htmlFor="default-radio-3">Inappropriate content</label>
            </div>
        </div>
       </DialogBody>
       <DialogFooter className="flex gap-4">
        <Button variant="outlined" color="blue" onClick={handleOpen}  size='sm' className="">
          Cancel
        </Button>
        <Button variant="" color="blue" onClick={handleOpen} size='sm' >
          Delete User
        </Button>
       </DialogFooter>
    </Dialog>
  </Card>
  )
}

export default UserCardAdmin
