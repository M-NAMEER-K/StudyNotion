import React from "react"
import {Link} from "react-router-dom"
import {FaArrowRight} from "react-icons/fa"
import Instructor from "../assets/Images/Instructor.png"

import bghome from "../assets/images/bghome.svg"
import HighLightText from "../components/core/HomePage/HighLightText"
import CodeBlocks from "../components/core/HomePage/CodeBlocks"
import CTAButton from "../components/core/HomePage/CTAButton"
import TimeLineSection from "../components/core/HomePage/TimeLineSection"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import Footer from "../components/common/Footer"
import ReviewSlider from "../components/common/ReviewSlider"
import Explore from "../components/core/HomePage/Explore"

const Home=()=>{
    return (
        <div className="w-full  flex flex-col items-center gap-y-4  ">

            {/*Section 1 */}
            <div className="w-full flex justify-center">
                    <Link to="/signup" className="flex  items-center gap-2 justify-center rounded-[20px]  bg-gray-600 hover:bg-gray-800 hover:border hover:border-gray-600 p-2 border-l-0 border-t-0 border border-gray-300  transform hover:scale-95 transition duration-200">
                <span>Become an Instructor</span> <FaArrowRight className="text-sm" />
                        </Link>
            </div>
            
         
                <div className=" flex flex-col items-center w-full">
                    <p className="text-2xl font-medium flex gap-x-1">Empower Your Future with <HighLightText text={"Coding Skills"}/></p>
                    <p className="w-[60%]  text-center text-gray-400">With our online coding courses,you can learn at your own pace,from anywhere in the world and get access </p>
                    <p className="w-[60%]  text-center text-gray-400">to a  wealth of resources,including hands-on projects,quizzes and personalized feedback from instructors.</p>
                </div>
                <div className=" flex gap-x-4">
                       <CTAButton text={"Learn More"} bgColor={"bg-yellow-500"} textColor={"text-black"} linkto={"/signup"} />
                        <CTAButton text={"Book a Demo"} bgColor={"bg-gray-600"} textColor={"text-white"} border={"border-l-0 border-t-0 border border-gray-300"} linkto={"/signup"}/>
                           </div>
                <div className="w-[80%] flex justify-center mt-4">
                     <video muted loop autoPlay className="h-[600px] rounded-lg"><source src="/videos/banner.mp4" type="video/mp4" /></video>
                </div>
                <div className="w-full flex flex-col items-center  gap-y-5">
                        <CodeBlocks 
                position={"lg:flex-row"} 
                heading={ <div className="  text-xl gap-x-1 flex font-semibold">Unlock Your<HighLightText text={"coding potential"}/>with our online courses</div>}
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1><a href="/" >Header</a></h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-500"}
                />
                 <CodeBlocks 
                position={"lg:flex-row-reverse"} 
                heading={ <div className="  text-xl gap-x-1 flex font-semibold">Unlock Your<HighLightText text={"coding potential"}/>with our online courses</div>}
                subheading={"Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you"}
                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n<link rel="stylesheet" href="style.css">\n</head>\n<body>\n<h1><a href="/" >Header</a></h1>\n<nav><a href="one/">One</a>\n<a href="two/">Two</a>\n<a href="three/">Three</a>\n</nav>`}
                codeColor={"text-yellow-500"}
                />

                </div>
              
                  <div className="w-full flex flex-col items-center gap-y-3 ">
                       <div className="flex gap-x-2 text-2xl">Unlock your <HighLightText text={"Power of Code"}/></div>
                       <p className="text-gray-400">Learn to build anything you can imagine</p>
                       
                         <Explore/>


                  </div>
              
                 {/* Section2*/}
                 
               <div className="w-full ">
                     <div className="w-full  bg-cover bg-center bg-white " style={{ backgroundImage: `url(${bghome})` }}>
                          
                          <div className="flex gap-x-4 w-full justify-center py-8">
                         <CTAButton text={"Explore Full Catalog"} bgColor={"bg-yellow-500"} textColor={"text-black"} linkto={"/signup"}> <FaArrowRight/> </CTAButton>
                      <CTAButton text={"Learn More"} bgColor={"bg-gray-600"} textColor={"text-white"} linkto={"/signup"}/>
                          </div>
                </div>
                 <div className="bg-white w-full">
                          <div className="w-full text-black flex py-3 px-8">
                              <div className="w-[50%]  text-3xl font-medium">
                                Get the skills you need for a <HighLightText text={"job that is in demand"}/>
                              </div>
                              <div className="w-[50%] flex flex-col items-start gap-y-3">
                               <div>The modern StudyNotion is the dictates its own terms.Today, to be a competitive specialist requires more than professional skills  </div> 
                                  
                                <CTAButton  text={"Learn More"} bgColor={"bg-yellow-500"} textColor={"text-black"} linkto={"/signup"}/>
                                  
                              </div>
                          </div>
                              
                          <TimeLineSection />
                          <LearningLanguageSection/>

                            
               </div>
             
               
                    {/* TimelLine Section */}
          
                       <div className="w-full flex items-center ">
                                  <div className="w-[50%] flex p-10 ">
                            
                                        
                                                 <img className="w-[75%] h-[300px] shadow-white shadow-[-20px_-20px_0_0]" src={Instructor} alt="" />
                                    
                                    
                                         
                                        
                                  </div>
                               
                                <div className="w-[50%] flex flex-col gap-y-3 py-3 ">
                                    <p className="text-2xl  flex gap-x-2">Become an <HighLightText text={"instructor"}/></p>
                                     <p className="text-gray-400"> Instructors from around the world teach millions of students on StudyNotion.
                                        We provide the tools and skills to teach you what you love.
                                     </p>
                                    <div className=" w-[30%]">
                                        <CTAButton text={"Start Teaching Today"} bgColor={"bg-yellow-500" } textColor={"text-black"} linkto={"/signup"}> <FaArrowRight/> </CTAButton>
                                    </div>
                                         
                                      
                                    
                                </div>
                            </div>
                         <ReviewSlider/>
                        
                     
</div>
                                       
                              <Footer/>
                       
        </div> 
    )
}

export default Home;