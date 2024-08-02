import { Button, Card, CardHeader, Input } from '@material-tailwind/react'
import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";

const JobNav = () => {
  return (
    <Card className='bg-white w-full'>
        <CardHeader
        floated={false}
        shadow={false}
        className='p-4 m-0 flex gap-4 items-center'
        >
      <Input
      label='Search Jobs'
      icon={<IoMdSearch />}
      className='   '
      />
      <Input
      label='Location'
      icon={<FaLocationDot />}
      className='   '
      />
      <button type='button' className='select-none rounded-lg bg-blue-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none'>SEARCH</button>
      </CardHeader>
    </Card>
  )
}

export default JobNav
