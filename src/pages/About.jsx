import React from 'react'
import HighLightText from "../components/core/HomePage/HighLightText"
import BannerImage1 from "../assets/Images/aboutus1.webp"
import BannerImage2 from "../assets/Images/aboutus2.webp"
import BannerImage3 from "../assets/Images/aboutus3.webp"
import FoundingStory from "../assets/Images/FoundingStory.png"
import Quote from "../components/core/AboutPage/Quote"
import LearningGrid from "../components/core/AboutPage/LearningGrid"
import ContactForm from "../components/core/AboutPage/ContactForm"
import StatsComponent from "../components/core/AboutPage/StatsComponent"
import Footer from "../components/common/Footer"

const About=()=>{
    return(
        <div className="w-full">
                                      {/*Section1 */}

                <div className="w-full flex flex-col items-center gap-y-5 p-2">
                    <div className="w-[80%] flex flex-col">
                        <p className="text-2xl flex flex-col items-center ">Driving Innovation in Online Education for a <HighLightText text={"Brighter Future"}/></p>
                        <p className="text-gray-400 text-center"> Studynotion is at the forefront of driving innovation in online education . We're passionate about creating a
                             brighter future by offering cutting-edge courses,leveraging emerging technologies, and nurturing a vibrant 
                             learning community.</p>
                    </div>
                    <div className="flex justify-evenly w-full">
                        <img src={BannerImage1} alt="" />
                        <img src={BannerImage2} alt="" />
                        <img src={BannerImage3} alt="" />
                    </div>

                </div>
                                     {/*Section2 */}

                <div className="w-full flex justify-center">
                      <Quote/>
                </div>

                                  {/*Section 3 */}
              <div className="w-full mt-8 p-2 text-gray-400">
                      <div className="w-full flex justify-evenly items-center ">
                           <div className="w-[40%] flex flex-col gap-y-3">
                            <h1 className="p-2 text-2xl text-red-500 font-medium">Our Founding Story </h1>
                            <p>  Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.</p>
                            <p>
                                  As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
                            </p>
                           </div>
                           < div className="w-[40%] ">
                            <img className="w-full rounded shadow-[0_0_20px_0] shadow-[#FC6767]" src={FoundingStory} alt="" />
                           </div>
                      </div>
                      <div className="w-full flex justify-evenly mt-8 " >
                           <div className="w-[40%] ">
                              <h1  className="p-2 text-2xl text-orange-500 font-medium">Our Vision</h1>
                              <p> With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.</p>
                           </div>
                           <div className="w-[40%] ">
                            <h1  className="p-2 text-2xl text-cyan-500 font-medium"> Our Mission</h1>
                            <p> Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives 
                                in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                           </div>
                      </div>
              </div>

                                             {/*Section4 */}

                  <div className="w-full">
                    <StatsComponent/>
                      <LearningGrid/>
                      <ContactForm/>
                  </div>
                    
               <Footer/>

        </div>
    )
}

export default About;