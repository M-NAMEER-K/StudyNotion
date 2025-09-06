import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchInstructorCourses } from '../../../../services/operations/courseDetailsAPI';
import { getInstructorData } from '../../../../services/operations/profileAPI';
import InstructorChart from './InstructorChart';
import { Link } from 'react-router-dom';

const Instructor=()=>{
    const {token}=useSelector((state)=>state.auth);
    const {user}=useSelector((state)=>state.profile);
    const [loading,setLoading]=useState(false);
    const [instructorData,setInstructorData]=useState([]);
    const [courses,setCourses]=useState([]);

    useEffect(()=>{
           const getCourseDataWithStats=async()=>{
          setLoading(true);
          const instructorApiData=await getInstructorData(token);
          const result=await fetchInstructorCourses(token);
        
            if(instructorApiData.length){
                  setInstructorData(instructorApiData);
                  console.log("instructorAPIData",instructorApiData);
            }
           if(result){
               setCourses(result)
           }
              setLoading(false);
           }
           getCourseDataWithStats();
    },[]);

      
    const totalAmount=instructorData?.reduce((acc,curr)=> acc + curr.totalAmountGenerated,0);
    const totalStudents=instructorData?.reduce((acc,curr)=> acc + curr.totalStudentsEnrolled,0);


   return(
      <div className="w-full ">
        <div className="w-full ">
            <h1 className="text-2xl font-medium">Hi {user?.firstName}</h1>
            <p className="text-gray-400">Let's start something new </p>
        </div>
           {loading ? (<div className="spinner"></div>):
           courses.length>0?(<div> 
                <div className="w-full ">
                   <div className="w-full  flex justify-start gap-3">
                <InstructorChart courses={instructorData}/>
                  <div className="w-[30%] rounded bg-gray-700 flex flex-col gap-y-3 items-start p-2">
                       <p className="text-xl">Statistics</p>
                       <div className="w-full">
                         <p className="text-gray-400">Total Courses</p>
                         <p className="text-xl">{courses.length}</p>
                       </div>
                       <div className="w-full">
                        <p className="text-gray-400">Total Students</p>
                        <p  className="">{totalStudents}</p>
                       </div>
                       <div className="w-full">
                        <p className="text-gray-400">Total Income</p>
                        <p  className="">Rs. {totalAmount}</p>
                       </div>
                  </div>
              </div>
                </div>
                <div className="w-[92%] bg-gray-700 mt-3 rounded ">
                  <div className="w-full  flex   p-4  justify-between">
                      <p>Your Courses</p>
                    <Link to="/dashboard/my-courses">
                     <p className="text-yellow-500">View All</p>
                    </Link>
                  </div>
                  
                
                    <div className="w-[92%] flex justify-evenly ">
                         {
                               courses.slice(0,3).map((course)=>(
                                   <div className="w-[30%] " key={course._id}> 
                                    <img className="w-full h-[300px] rounded-md"  src={course.thumbnail}/>
                                     <div className="w-full">
                                         <p className="text-lg p-2">{course.courseName}</p>
                                         <div className="w-full flex justify-around text-gray-300">
                                            <p>{course.studentsEnrolled.length} students</p>
                                            <p>|</p>
                                            <p> Rs { course.price}</p>
                                            </div>
                                     </div>
                                   </div>
                               ))
                         }
                    </div>
                    </div>

           </div>):(
                 <div>
                    <p>You have not created any courses yet</p>
                    <Link to ={"/dashboard/addCourse"}>Create a course</Link>
                 </div>
           )}
      </div>
   )
}

export default Instructor;