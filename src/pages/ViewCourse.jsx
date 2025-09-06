import React from 'react'
import { Outlet } from 'react-router';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../slices/viewCourseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import { useState } from 'react';
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal';
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar';
import { getFullDetailsOfCourse } from '../services/operations/courseDetailsAPI';

const ViewCourse=()=>{

    const [reviewModal,setReviewModal]=useState(false);
    const {courseId}=useParams();
    const {token}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();

     useEffect(()=>{
          const setCourseSpecificDetails=async()=>{
            const courseData=await getFullDetailsOfCourse(courseId,token);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
            dispatch(setEntireCourseData(courseData.courseDetails));
            dispatch(setCompletedLectures(courseData.completedVideos));

            let lectures=0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
                lectures+=sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
          }

           setCourseSpecificDetails();
     },[]);


     return(
        <div className="w-full">
                  <div className="w-full flex">    
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            <div className="w-full ">
                <Outlet/>
            </div>
            
        </div>
        {reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>}
        </div>
     
     )
}

export default ViewCourse;