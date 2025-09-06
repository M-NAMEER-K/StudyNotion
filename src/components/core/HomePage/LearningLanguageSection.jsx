import React from 'react'
import HighLightText from "./HighLightText"
import know_your_progress from "../../../assets/Images/Know_your_progress.png"
import compare_with_others from "../../../assets/Images/Compare_with_others.png"
import plan_your_lesson from "../../../assets/Images/Plan_your_lessons.png"
import CTAButton from "./CTAButton"

const LearningLanguageSection =()=>{
   return(
    <div className="w-full text-black mt-15 flex items-center  flex-col gap-y-5 py-5">
              <div className="font-medium text-2xl flex gap-x-2">Your swiss knife for <HighLightText text={"learning any language"}/></div>
               <div>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over,
                progress tracking cusom schedule and more
               </div>
               <div className="flex justify-center w-full  ">
                   <img className="-mr-30" src={know_your_progress} alt="" />
                <img className="" src={compare_with_others} alt="" />
                 <img  className="-ml-40" src={plan_your_lesson} alt="" />
               </div>
               <CTAButton text={"Learn More"} bgColor={"bg-yellow-500"} textColor={"text-black"} linkto={"/signup"}/>
            
    </div>
   )
}

export default LearningLanguageSection;