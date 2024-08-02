import { Accordion, AccordionBody, AccordionHeader, Button, Card, CardBody, Input, Option, Select, Switch, Typography } from '@material-tailwind/react'
import React, { useState } from 'react'
import { FaChevronDown } from "react-icons/fa";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import JobCardSingle from './JobCardSingle';


const PostJobCard = () => {
  const [options, setOptions] = useState("");
  const [acceptingResponses, setAcceptingResponses] = useState(true);
  const [joiningPeriod, setJoiningPeriod] = useState("");
  const [joiningPeriodManual, setJoiningPeriodManual] = useState("");
  const [description, setDescription] = useState('');
  const [preview, setPreview] = useState(false);
  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
    // clipboard: {
    //   // toggle to add extra line breaks when pasting HTML:
    //   matchVisual: false,
    // },
  };

  return (
    <Card className='bg-white p-4 w-full h-full'>
      <div className="w-full flex flex-row h-full">
      <CardBody className='m-0 p-0 pr-4 flex flex-col gap-3 w-2/5 border-r-2 h-full justify-between'>
      <div className="flex flex-col gap-3">
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
        <Input
        label='Joining Period'
        />
        <Input
        label='Last Date to Apply'
        type='date'
        />
        <Switch
        color='blue'
        checked={acceptingResponses}
        onChange={() => setAcceptingResponses(!acceptingResponses)}
        label='Accept Responses'
        />
      </div>
      <div className="w-full flex gap-4">
        <Button size='sm' color='blue' variant='outlined' onClick={() => setPreview(!preview)}>{preview ? "Edit" : "Preview"}</Button>
        <Button size='sm' color='blue'>Post</Button>
      </div>
      </CardBody>
      {preview ? (
        <div className="m-0 p-0  w-3/5 overflow-y-scroll scrollbar-thin">
        <JobCardSingle/>
        </div>
      ):
      <CardBody className='m-0 p-0 pl-4 flex flex-col gap-3 w-3/5'>
      <Typography className='text-2xl text-black'>Enter Job Description</Typography>
      <ReactQuill
          className="react-quill h-4/5"
          modules={modules}
          value={description}
          placeholder="Enter Job Description"
          onChange={(newValue) => setDescription(newValue)}
        />
      </CardBody>
      }
      </div>
    </Card>
  )
}

export default PostJobCard

