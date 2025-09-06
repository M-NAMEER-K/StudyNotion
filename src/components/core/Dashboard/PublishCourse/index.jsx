 import React, { useState, useEffect } from 'react';
 import {useNavigate} from "react-router-dom"
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import IconBtn from '../../../common/IconBtn';
import { editCourseDetails } from '../../../../services/operations/courseDetailsAPI';
import { resetCourseState, setStep } from '../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../utils/constants';


 const PublishCourse=()=>{
         const {register,handleSubmit ,setValue,getValues}=useForm();
         const {course}=useSelector((state)=>state.course);
         const navigate=useNavigate();
         const dispatch=useDispatch();
         const {token}=useSelector((state)=>state.auth);
         console.log("------",token);
         const [loading,setLoading]=useState(false);
          
         useEffect(()=>{
            if(course?.status===COURSE_STATUS.PUBLISHED){
                  setValue("public",true);
            }
         },[]);

        const onSubmit=()=>{

              handleCoursePublish();

        }
      const goToCourses=()=>{
          dispatch(resetCourseState());
              navigate("/dashboard/my-courses");
      }

       
  const handleCoursePublish = async () => {
    // check if form has been updated or not
    if (
      (course?.status === COURSE_STATUS.PUBLISHED &&
        getValues("public") === true) ||
      (course?.status === COURSE_STATUS.DRAFT && getValues("public") === false)
    ) {
      // form has not been updated
      // no need to make api call
      goToCourses()
      return
    }
    const formData = new FormData()
    formData.append("courseId", course._id)
    const courseStatus = getValues("public")
      ? COURSE_STATUS.PUBLISHED
      : COURSE_STATUS.DRAFT
    formData.append("status", courseStatus)
    setLoading(true)
    const result = await editCourseDetails(formData, token)
    if (result) {
      goToCourses()
    }
    setLoading(false)
  }

        const goBack=()=>{
            dispatch(setStep(2));
        }

        return(
            <div className="w-full  ">
                <p className="my-2">Publish Course</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full">
                        <label htmlFor="public">Make this course as Public
                        <input className="mx-2" type="checkbox" id="public" {...register("public")}  />
                        <span >Make this Course as Public</span></label>
                    </div>
                    <div>
                        <button className="bg-yellow-500 text-black p-2 rounded my-2" disabled={loading} type="button" onClick={goBack}>Back</button>
                        <IconBtn disabled={loading} text="save changes"/>
                    </div>
                </form>
            </div>
        )


 }

 export default PublishCourse;