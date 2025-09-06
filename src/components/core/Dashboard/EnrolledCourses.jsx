import React,{useState,useEffect} from 'react'
import {useSelector} from "react-redux"
import {getUserEnrolledCourses} from "../../../services/operations/profileAPI"
import ProgressBar from "@ramonak/react-progress-bar";
import {useNavigate} from "react-router-dom"

const EnrolledCourses= ()=>{
  const navigate=useNavigate();
   const {token}=useSelector((state)=>state.auth);
   const [enrolledCourses,setEnrolledCourses]=useState(null);
   
   const getEnrolledCourses= async()=>{

    try{
     const response=await getUserEnrolledCourses(token);
       setEnrolledCourses(response);
     

    }  
    catch(err){
     console.log("Unable to fetch enrolled courses");
    }

   }


   useEffect(()=>{
    getEnrolledCourses();
   },[]);
   console.log("eC", enrolledCourses);
    return(
        <div clasName="w-full">
             <div className="text-xl">Enrolled Courses</div>
             {
                 !enrolledCourses ? (<div>Loading...</div>) :!enrolledCourses.length?(<p>You have not enrolled in any course yet</p>):(
                    <div className="w-full">
                        

                              {
                                enrolledCourses.map((course,index)=>(
                                       <div className="w-full" key={course._id || index}  onClick={() => {
  const firstSection = course.courseContent[0];
  const firstSubSection = firstSection?.subSection[0]?._id; // safeguard

  if (!firstSection || !firstSubSection) return; // avoid errors if empty

 navigate(`/dashboard/enrolled-courses/view-course/${course._id}/section/${firstSection._id}/sub-section/${firstSubSection}`)
}}>
                                        <div className="w-full my-3 flex gap-x-3">
                                            <img className="w-[5%] rounded" src={course.thumbnail} alt="" />
                                            <div>
                                                <p>{course.courseName}</p>
                                                <p>{course.courseDescription}</p>
                                            </div>
                                        </div>
                                          <div>
                                            {course?.totalDuration}
                                          </div>
                                          <div className="w-full flex flex-col gap-y-2">
                                            <p>Progress : {course.progressPercentage || 0}</p>
                                            <ProgressBar className="w-[50%]" completed={course.progressPercentage || 0}
                                             height='8px' isLabelVisible={false}/>
                                          </div>
                                       </div>
                                ))
                              }
                    </div>
                 )
             }
        </div>
    )
}

export default EnrolledCourses;