import React, { useEffect } from "react";
import logofoot from "../assets/logofoot.png";
import altprofile from "../assets/altprofile.png";
import { useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";

const AboutPage = () => {
  useEffect(() => {
    const topElement = document.getElementById("about");
    if (topElement) {
      topElement.scrollIntoView({ behavior: "smooth" });
    }
  }, []);
  return (
    <div id="about" className="h-[90vh] overflow-y-scroll scrollbar-thin">
      <div className="block lg:hidden">
        <SideBar />
      </div>
      <div className="flex justify-center py-10 px-10 about-main">
        <h2 className="text-[80px] lg:text-[120px] 2xl:text-[160px] font-bold text-light-blue-400 text-center drop-shadow-lg">
          About MedC
        </h2>
      </div>

      <div className="flex flex-col md:flex-row px-10 my-10 2xl:w-[80%] mx-auto gap-10 items-center">
        <img src={logofoot} className="mx-auto h-32 lg:h-40" alt="logo" />
        <p className="mx-6 text-gray-800">
          <span className="text-blue-400 text-3xl lg:text-4xl font-bold">
            Welcome to MedC!
          </span>{" "}
          Your ultimate destination for all things related to healthcare. At
          MedC, we are dedicated to connecting healthcare professionals with
          their dream jobs while fostering a vibrant and supportive community
          for networking, collaboration, and professional growth.
        </p>
      </div>

      <div className="px-10 my-10 2xl:w-[85%] mx-auto">
        <h3 className="text-3xl lg:text-4xl font-bold text-blue-400 text-center">
          Our Mission
        </h3>
        <p className="text-gray-800">
          Our mission is to revolutionize the healthcare industry by providing a
          comprehensive, user-friendly platform that combines job search
          capabilities with the dynamic features of social media. We aim to
          empower healthcare professionals by:
          <ul className="list-disc">
            <li>
              Simplifying the Job Search: Find the perfect job match with our
              advanced search tools, tailored to the specific requirements and
              preferences of the healthcare sector.
            </li>
            <li>
              Fostering Connections: Build a robust professional network by
              connecting with peers, mentors, and industry leaders.
            </li>
            <li>
              Supporting Career Development: Access a wealth of resources,
              including industry news, educational content, and professional
              development opportunities to stay ahead in your field.
            </li>
            <li>
              Providing professionalism: We help the health sector businesses to
              find the perfect person to grow your business.
            </li>
          </ul>
        </p>
      </div>

      <div className="px-10 my-10 2xl:w-[85%] mx-auto">
        <h3 className="text-3xl lg:text-4xl font-bold text-blue-400 mt-10 text-center">
          Our Team
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mt-3 justify-center items-center">
          <div className="flex flex-col items-center gap-3">
            <img src={altprofile} className="rounded-lg" />
            <p>Mr. Aman</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src={altprofile} className="rounded-lg" />
            <p>Mr. Himanshu</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src={altprofile} className="rounded-lg" />
            <p>Mr. Gautam</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src={altprofile} className="rounded-lg" />
            <p>Ms. Yukti</p>
          </div>
          <div className="flex flex-col items-center gap-3">
            <img src={altprofile} className="rounded-lg" />
            <p>Mr. Devansh</p>
          </div>
        </div>
      </div>

      <div className="px-10 my-10 2xl:w-[85%] mx-auto">
        <h3 className="text-3xl lg:text-4xl font-bold text-blue-400 text-center">
          What We Offer
        </h3>
        <p className="text-gray-800">
          <ul className="list-disc">
            <li>
              <b> Job Board: </b> Our extensive job board features opportunities
              across all healthcare disciplines. From clinical roles to
              administrative positions, we have listings that cover the entire
              spectrum of the medical sector.
            </li>
            <li>
              <b> Networking Opportunities:</b> Engage with a community of
              like-minded professionals. Join groups, participate in
              discussions, and attend virtual events to expand your network and
              share your expertise.
            </li>
            <li>
              <b> Professional Profiles: </b> Create a detailed professional
              profile to showcase your skills, experience, and accomplishments.
              Let potential employers and colleagues get to know you and your
              career journey.
            </li>
            <li>
              <b> Resources and Insights: </b> Stay informed of the latest
              industry trends, news, and best practices. Our resource center
              offers articles, webinars, and tutorials to support your ongoing
              education and professional development.
            </li>
            <li>
              <b>Career Tools: </b>Utilize our suite of career tools, including
              resume builders, interview tips, and job application trackers to
              streamline your job search process.
            </li>
          </ul>
        </p>
      </div>

      <div className="px-10 my-10 2xl:w-[85%] mx-auto">
        <h3 className="text-3xl lg:text-4xl font-semibold text-light-blue-400 mt-10 text-center">
          General FAQs
        </h3>
        <ol className="list-decimal px-4  flex flex-col gap-4">
          <li className="font-semibold">
            What is MedC?
            <p className="font-normal">
              MedC is a platform that combines social media networking and job
              board functionalities specifically for the medical sector. It
              connects healthcare professionals, institutions, and job seekers,
              offering networking opportunities, job listings, and professional
              development resources.
            </p>
          </li>
          <li className="font-semibold">
            Who can use MedC?
            <p className="font-normal">
              Our platform is designed for healthcare professionals, medical
              institutions, job seekers, and anyone involved in the medical
              field. This includes doctors, nurses, administrators, and
              healthcare organizations.
            </p>
          </li>
          <li className="font-semibold">
            What services do you offer to healthcare organizations and
            businesses?
            <p className="font-normal">
              We provide job posting and recruitment services, brand promotion
              through company profiles and sponsored content, access to a talent
              pool, market research and analytics, professional development
              opportunities, and advertising and marketing services.
            </p>
          </li>
          <li className="font-semibold">
            How can I post a job listing?
            <p className="font-normal">
              To post a job listing, create an account and access the job
              posting dashboard. From there, you can enter job details, set
              application deadlines, and manage your postings.
            </p>
          </li>
          <li className="font-semibold">
            What are the options for promoting my job postings?
            <p className="font-normal">
              We offer premium placement options, sponsored posts, and targeted
              advertising to increase the visibility of your job listings.
            </p>
          </li>
          <li className="font-semibold">
            How can I search for jobs on MedC?
            <p className="font-normal">
              Create a personal profile, then use our job search feature to
              browse listings based on your preferences, including location, job
              type, and specialty. You can also set up job alerts to receive
              notifications for new postings.
            </p>
          </li>
          <li className="font-semibold">
            What networking features are available for professionals?
            <p className="font-normal">
              Our platform offers profile creation, professional networking
              tools, groups, and opportunities to connect with mentors or
              mentees in the medical field.
            </p>
          </li>
          <li className="font-semibold">
            Can I find information on industry trends and career opportunities?
            <p className="font-normal">
              Yes, our platform provides access to industry reports, job market
              trends, and articles on career development to help you stay
              informed about the medical field.
            </p>
          </li>
          <li className="font-semibold">
            What should I do if I encounter issues or need help with my account?
            <p className="font-normal">
              If you experience any issues or need assistance, please contact
              our customer support team through the Help Center or submit a
              support request. We're here to help!
            </p>
          </li>
          <li className="font-semibold">
            Is my personal information secure on MedC?
            <p className="font-normal">
              Yes, we prioritize data protection and comply with relevant
              regulations to ensure your personal information is secure. We use
              advanced security measures to protect your data and privacy.
            </p>
          </li>
          <li className="font-semibold">
            How do I update my profile or account information?
            <p className="font-normal">
              Log in to your account and navigate to the profile settings
              section. From there, you can update your personal information,
              resume, job preferences, and other details.
            </p>
          </li>
          <li className="font-semibold">
            What should I do if I forget my password or have trouble logging in?
            <p className="font-normal">
              Use the “Forgot Password” feature on the login page to reset your
              password. If you encounter further issues, contact our support
              team for assistance.
            </p>
          </li>
          <li className="font-semibold">
            Is MedC available as an app?
            <p className="font-normal">
              No, currently we are not available as an app. But we are coming
              soon.
            </p>
          </li>
        </ol>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
