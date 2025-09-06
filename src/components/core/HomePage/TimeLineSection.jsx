import React from "react"
import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg"
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg"
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg"
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg"
import timelineImage from "../../../assets/Images/TimelineImage.png"


const TimeLineSection=()=>{
    const timeline =[
     {
        Logo:Logo1,
        heading:"Leadership",
        Description:"Fully committed to the success company"
     },
     {
        Logo:Logo2,
        heading:"Responsibility",
        Description:"Students will always be our top priority"
     },
     {
        Logo:Logo3,
        heading:"Flexibilty",
        Description:"The ability to switch s an important skill"
     },
     {
        Logo:Logo4,
        heading:"Solve the problem",
        Description:"Code your way to a solution"
     },
    ];
     return(
        <div className="w-full bg-white text-black flex p-5">
               
                    <div className="w-[50%] flex flex-col">
                        {
                           timeline.map((element,index)=>{
                                return(
                                    <div className="flex gap-x-2 py-6" key={index}> 
                                          <div > <img  src={element.Logo}/></div>
                                          <div>
                                             <p className="font-medium text-xl">{element.heading}</p>
                                             <p>{element.Description}</p>
                                          </div>
                                     </div>
                                )
                           })
                        }
                    </div>
                    <div className="w-[50%] relative">
                     
                           <img className="h-[400px] w-full" src={timelineImage} alt=""  />
                           <div className=" absolute left-[20%] translate-y-[-50%] bg-green-900 text-white font-medium w-[60%] h-[100px] items-center flex justify-evenly ">
                                  <div>
                                    <p>10</p>
                                    <p>Years of Expierence</p>
                                  </div>
                                  <div>
                                    <p>250</p>
                                    <p>Type of Courses</p>
                                  </div>
                           </div>
                    </div>
        </div>
     )
 }
 
 
 
 export default TimeLineSection;