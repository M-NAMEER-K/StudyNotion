import React from 'react'
import {useSelector} from "react-redux"
import { FaCheck } from "react-icons/fa" 
import CourseInformationForm from "./CourseInformation/CourseInformationForm"
import CourseBuilderForm from "./CourseInformation/CourseBuilderForm"
import PublishCourse from "../PublishCourse"


const RenderSteps=()=>{

  const {step}=useSelector((state)=>state.course);
  const steps=[
      {
        id:1,
        title:"Course Information"
      },
      {
         id:2,
         title:"Course Builder"
      },
      {
         id:3,
         title:"Publish"
      }
  ]

    return(
        <div className="w-full   ">
              <div className=" flex w-full justify-center">
                      {   
                    steps.map((item)=>(
                        
                          <div key={item.id} className="flex w-[50%]  " >
         <div
  className={`w-8 h-8 flex items-center justify-center rounded-full 
    ${
      step > item.id
        ? "bg-yellow-500 border-yellow-500 text-yellow-300"
        : step === item.id
        ? "bg-yellow-800 border-yellow-500 text-yellow-300"
        : "border-gray-700 bg-gray-800 text-gray-400"
    }`}
>
  {step > item.id ? <FaCheck /> : item.id}
</div>
                                 {item.id !== steps.length && (
              
                <div
                  className={`h-[calc(34px/2)] w-full  border-dashed border-b-2 ${
                  step > item.id  ? "border-yellow-500" : "border-gray-500"
                } `}
                ></div>
              
            )}
                            </div>
                         
                       
                           
                        
                      
                    ))
                }
              </div>
               
          
             
                 <div className="relative mb-16 flex w-[70%] select-none  justify-between">
        {steps.map((item) => (
          
            <div
              className="flex  flex-col items-center " key={item.id}
            >
              
              <p
                className={`text-sm ${
                  step >= item.id ? "text-white" : "text-gray-500"
                }`}
              >
                {item.title}
              </p>
            </div>
            
        
        ))}
      </div>
                  {step===1 && <CourseInformationForm/>}
                  {step===2 && <CourseBuilderForm/>}
                  {step===3 && <PublishCourse/>}
        </div>
    )
}

export default RenderSteps;