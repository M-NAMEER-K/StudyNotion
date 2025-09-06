import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import ReactStars from "react-stars"

import IconBtn from "../../common/IconBtn"
import { createRating } from "../../../services/operations/courseDetailsAPI";

const CourseReviewModal=({setReviewModal})=>{
    const {user}=useSelector((state)=>state.profile);
    const {token}=useSelector((state)=>state.auth);
    const { courseEntireData } = useSelector((state) => state.viewCourse);

    const {register,handleSubmit , setValue ,watch, formState:{errors}}=useForm();
    useEffect(()=>{
        setValue("courseExperience","");
        setValue("courseRating",0);
    },[]);

    const onSubmit=async(data)=>{
           await createRating(
            {
                courseId:courseEntireData._id,
                rating:data.courseRating,
                review:data.courseExperience
            },token
           )
           setReviewModal(false);
    }
    const ratingChanged = (newRating) => {
  setValue("courseRating", newRating, { shouldValidate: true });
};



       return(
              <div className="w-full">
                   <div className="w-full p-2">
                      
                        <div className="w-full my-3">
                            <img className="w-[5%] rounded-[50%]" src={user?.image}  alt="user Image"  />
                             <div>
                                <p>{user?.firstName} {user?.lastName}</p>
                                <p>Post Publicly</p>
                             </div>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)}>
  
<ReactStars
  count={5}
  size={30}
  value={watch("courseRating") || 0}
  color2="#facc15"
  onChange={ratingChanged}
/>


                             <div className="flex items-center gap-x-5">
                                <label htmlFor="courseExperience"> Add Your Experience</label>
                                <textarea  className=" border rounded outline-0 p-2" id="courseExperience" placeholder="Add your Experience" {...register("courseExperience",{required:true})}></textarea>
                                {
                                    errors.courseExperience && ( <span> Please add your Experience</span>)
                                }
                             </div>
                             <div className="w-full flex gap-x-5 my-3">
                                <button className="text-black font-medium bg-yellow-500 rounded-lg p-2" onClick={()=> setReviewModal(false)}>Cancel</button>
                                <IconBtn text="save" />
                             </div>
                        </form>
                   </div>
                </div>
       )
}

export default CourseReviewModal;