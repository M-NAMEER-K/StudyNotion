import React from 'react'
import RenderSteps from "./RenderSteps"

const AddCourse=()=>{
    return(
        <div className="w-full flex  justify-evenly items-start ">
               <div className="w-[45%]">
                      <h1 className="text-xl">Add Course</h1>
                      <div className="w-full"><RenderSteps/></div>
               </div>
               <div className="w-[45%]  bg-gray-600   p-4 ">
                  <p className="text-xl font-medium ">Code Upload Tips</p>
                  <ul className=" list-disc list-outside  p-4 ">
                    <li>Set the Course Price option or make it free.</li>
                    <li>Standard size for the course thumbnail is 1024x576.</li>
                    <li>Video section controls the course overview video.</li>
                    <li>Course Builder is where you create & organize a course.</li>
                    <li>Add topics in the course builder section to create lessons,quizzes and assignments.</li>
                    <li>Information from the Additional Data section shows up on the course single page.</li>
                    <li>Make announcements to notify any important.</li>
                    <li>Notes to enroll students at once.</li>
                  </ul>
               </div>
        </div>
    )
}

export default AddCourse;
