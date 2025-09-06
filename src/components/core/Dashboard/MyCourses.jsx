import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import IconBtn from "../../common/IconBtn"; // adjust path
import CourseTable from "./InstructorCourse/CourseTable"; // adjust path
import { fetchInstructorCourses } from "../../../services/operations/courseDetailsAPI"; // adjust path


const MyCourses=()=>{
    const {token}=useSelector((state)=>state.auth);
    const navigate=useNavigate();
    const[courses,setCourses]=useState([]);

    useEffect(()=>{
        const fetchCourses=async()=>{
           const result=await fetchInstructorCourses(token);
           console.log(result);
             if(result){
                setCourses(result);
             }
             
        }
         fetchCourses();
    },[token]);

    return(
          <div className="w-full  flex flex-col gap-y-5 "> 
                    <div className=" flex flex-col gap-y-5">
                        <h1>My Courses</h1>
                        <div className="w-full flex justify-center">
                            <IconBtn text="Add Course" onClick={()=>navigate("/dashboard/add-course")}/>
                        </div>
                       
                            {/*todo:add icon here*/}
                    </div>
                    
                    {courses && <CourseTable courses={courses} setCourses={setCourses}/>}
          </div>
    )
}
export default MyCourses;