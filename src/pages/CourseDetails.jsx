import React, { useEffect, useState } from "react"

import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/common/ConfirmationModal"

import RatingStars from "../components/common/RatingStars"
import CourseAccordionBar from "../components/core/Course/CourseAccordionBar"
import CourseDetailsCard from "../components/core/Course/CourseDetailsCard"
import  formatDate  from "../services/operations/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import getAvgRating from "../utils/avgRating"




const CourseDetails=()=>{

  const {user}=useSelector((state)=>state.profile);
  const {token}=useSelector((state)=>state.auth);
  const {loading}=useSelector((state)=>state.profile);
  const {paymentLoading}=useSelector((state)=>state.course);
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const {courseId}=useParams();
const [avgReviewCount, setAverageReviewCount] = useState(0);
const [courseData,setCourseData]=useState(null);
const [confirmationModal ,setConfirmationModal]=useState(null);


useEffect(()=>{
  const getCourseFullDetails=async()=>{
      try{
        const result=await fetchCourseDetails(courseId);
            console.log("r",result);
       setCourseData(result?.data?.[0]);
       
      }
      catch(err){
         console.log(err,"Course could not be fetched");
      }
  }
  getCourseFullDetails();

},[courseId]);


  console.log("R&R",courseData?.ratingAndReviews)


useEffect(() => {
  if (courseData?.ratingAndReviews?.length > 0) {
    const count = parseFloat(getAvgRating(courseData.ratingAndReviews));
    console.log("CountR",count);
    setAverageReviewCount(count);
  } else {
    setAverageReviewCount(0);
  }
}, [courseData]);





    const [isActive ,setIsActive]=useState(Array(0));
    const handleActive=(id)=>{
            setIsActive(
              !isActive.includes(id)?isActive.concat(id):isActive.filter((e)=>e!=id)
            )
    }
const [courseStats, setCourseStats] = useState({
  totalSections: 0,
  totalLectures: 0,
  totalDuration: 0,
});

useEffect(() => {
  if (!courseData?.courseContent) return;

  let sections = courseData.courseContent.length;
  let lectures = 0;
  let duration = 0;

  courseData.courseContent.forEach((sec) => {
    lectures += sec.subSection?.length || 0;
    sec.subSection?.forEach((sub) => {
      duration += parseFloat(sub.timeDuration || 0);
    });
  });

  setCourseStats({
    totalSections: sections,
    totalLectures: lectures,
    totalDuration: duration,
  });
}, [courseData]);
const formatDuration = (seconds) => {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  return `${hrs > 0 ? hrs + "h " : ""}${mins}m ${secs}s`;
};


 const handleBuyCourse=()=>{
        if(token){
             buyCourse(token,[courseId],user,navigate,dispatch);
             return;
        }
            setConfirmationModal({
              text1:"you are not Logged In",
              text2:"Please login to purchase the course",
              btn1Text:"Login",
              btn2Text:"Cancel",
              btn1Handler:()=>navigate("/login"),
              btn2Handler:()=>setConfirmationModal(null)
            })


          if(loading || !courseData){
              return(
                 <div>Loading...</div>
              )
          }
 }

if (!courseData) {
  return <div>Loading...</div>;
}

const { courseName , courseDescription, thumbnail , price , whatYouWillLearn , 
      courseContent , ratingAndReviews , instructor , studentsEnrolled , createdAt } = courseData;
     

{
  return (
    <div className="w-full pl-2">
         <p className="text-xl">{courseName}</p>
         <p>{courseDescription}</p>
           <div className="flex flex-col">
            <span>{avgReviewCount} Average Reviews</span>
            <RatingStars Review_Count={avgReviewCount} Star_Size={24}/>
            <span> {`(${ratingAndReviews?.length ||0} reviews)`}</span>
            <span>{`(${studentsEnrolled?.length ||0} students Enrolled)`}</span>
           </div>
             <div>
              <p>Created By {`${instructor.firstName}`}</p>
            
             </div>
             <div>
              <p>Created At {formatDate(createdAt)}</p>
              <p>{" "}English</p>
             </div>
             <div>
              <CourseDetailsCard course={courseData} setConfirmationModal={setConfirmationModal} handleBuyCourse={handleBuyCourse}/>
             </div>
             <div className="flex gap-x-5 m-2">
                <p>What You Will learn</p>
                <div className="text-yellow-300">{whatYouWillLearn}</div>
             </div>

              
                 <div className="pl-2">
                  <p className="text-2xl ">Course Content:</p>
                 
                  <p><strong>Total Sections:</strong> {courseStats.totalSections}</p>
                  <p><strong>Total Lectures:</strong> {courseStats.totalLectures}</p>
             <p><strong>Total Duration:</strong> {formatDuration(courseStats.totalDuration)}</p>
              </div>

<div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

                 <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
                </p>
                </div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        
    </div>
  )
  }
}

export default CourseDetails;