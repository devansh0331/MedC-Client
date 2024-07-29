import { Button, Card, CardHeader, Input } from '@material-tailwind/react'
import React from 'react'
import { IoMdSearch } from "react-icons/io";
import { MdOutlineLocationCity } from "react-icons/md";

const JobNav = () => {
  return (
    <Card className='bg-white w-full'>
        <CardHeader
        floated={false}
        shadow={false}
        className='p-4 m-0 flex gap-4'
        >
      <Input
      label='Search Jobs'
      icon={<IoMdSearch />}
      className='   '
      />
      <Input
      label='Location'
      icon={<MdOutlineLocationCity />}
      className='   '
      />
      <Button color="blue" className=''>
        Search
      </Button>
      </CardHeader>
    </Card>
  )
}

export default JobNav
