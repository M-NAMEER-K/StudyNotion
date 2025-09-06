import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector}from "react-redux"
import {useParams} from "react-router-dom"
import {
  fetchCourseDetails,
  getFullDetailsOfCourse,
} from "../../../../services/operations/courseDetailsAPI"
import { setCourse, setEditCourse } from "../../../../slices/courseSlice"
import RenderSteps from "../AddCourse/RenderSteps"

export default function EditCourse(){

       const dispatch=useDispatch();
        const { course } = useSelector((state) => state.course)
       const {courseId}=useParams();
       const [loading ,setLoading]=useState(false);
       const{token}=useSelector((state)=>state.auth);
      
         useEffect(()=>{
              const populateCourseDetails=async()=>{
                  setLoading(true);
                  const result=await getFullDetailsOfCourse(courseId,token);
                  if(result?.courseDetails){
                     dispatch(setEditCourse(true));
                     dispatch(setCourse(result?.courseDetails));
                  }
                  setLoading(false);
              }
                populateCourseDetails();
         },[]);
           
          

    
          if(loading){
            return(
                <div>
                    Loading...
                </div>
            )
          }

     return(
           <div>
        <h1>Edit Course</h1>
        <div>
            {
                course?(<RenderSteps/>):(<p>Course not found</p>)
            }
        </div>
           </div>
     )
}

