import React from 'react'
import SideBar from '../components/SideBar'
import BlogCard from '../components/BlogCard'
import SingleBlogCard from '../components/SingleBlogCard'

const SingleBlog = () => {
  return (
    <div className='w-full h-[90vh] overflow-y-scroll scrollbar-thin flex bg-background'>
        <SideBar/>
        <div className="flex w-[80%] mx-auto gap-4 mt-5 justify-center mb-5">
            <div className="w-4/5">
                <SingleBlogCard/>
            </div>
            <div className="w-56">
                <BlogCard/>
            </div>
        </div>
    </div>
  )
}

export default SingleBlog
