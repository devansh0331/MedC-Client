import { Accordion, AccordionBody, AccordionHeader, Button, Card, CardBody, Input, Option, Select, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";

const PostJobCard = () => {
  const [options, setOptions] = useState("");
  const [joiningPeriodBox, setJoiningPeriodBox] = useState(false);
  const [joiningPeriod, setJoiningPeriod] = useState("");
  const [joiningPeriodManual, setJoiningPeriodManual] = useState("");

  return (
    <Card className='bg-white p-4 w-full h-full overflow-y-scroll scrollbar-thin'>
      <div className="w-full flex flex-row h-full">
      <CardBody className='m-0 p-0 pr-4 flex flex-col gap-3 w-2/5 border-r-2 h-full'>
        <Typography className='text-2xl text-black'>Enter Job Details</Typography>
        <Input 
        label='Job Title'
        className='w-full'
        />
        <Input
        label='Company Name'
        className='w-full'
        />
        <Input
        label='Location'
        className='w-full'
        />
        <Input
        label='Salary / CTC'
        className='w-full'
        />
        <Input
        type='number'
        label='Minimum Experience' 
        className='no-spinner'
        />
        <Select
        label='Joining Period'
        value={joiningPeriod}
        onChange={(e) => setJoiningPeriod(e.target.value)}
        >
          <Option onClick={() => setJoiningPeriodBox(false)}>Immediate</Option>
          <Option onClick={() => setJoiningPeriodBox(false)}>1 Month</Option>
          <Option onClick={() => setJoiningPeriodBox(false)}>3 Months</Option>
          <Option onClick={() => setJoiningPeriodBox(false)}>6 Months</Option>
          <Option onClick={() => setJoiningPeriodBox(true)}>Other</Option>
        </Select>
        {joiningPeriodBox && ( 
        <Input
        label='Other'
        value={joiningPeriodManual}
        onChange={(e) => setJoiningPeriodManual(e.target.value)}
        />
        )}
        <Input
        label='Last Date to Apply'
        type='date'
        />
      </CardBody>
      <CardBody className='m-0 p-0 pl-4 flex flex-col gap-3 w-3/5'>
      
      </CardBody>
      </div>
    </Card>
  )
}

export default PostJobCard
