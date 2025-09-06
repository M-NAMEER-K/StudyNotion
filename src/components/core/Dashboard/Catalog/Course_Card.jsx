import React,{useState,useEffect} from 'react'
import RatingStars from "../../../common/RatingStars"
import {Link} from "react-router-dom"
import GetAvgRating from "../../../../utils/avgRating"

const Course_Card=({course,Height})=>{

  const [avgReviewCount , setAvgReviewCount]=useState(0);
    useEffect(()=>{
        const count=GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course]);

    return(
        <div className="w-full ">
             <Link to={`/courses/${course._id}`}>
             <div className="w-full">
                <div className="w-full">
                    <img src={course?.thumbnail} alt="course thumbnail" className={`w-[70%] rounded-xl object-cover ${Height}`}/>
                </div>
                <div>
                    <p>{course?.courseName}</p>
                    <p>{ course?.instructor?.firstName} {course?.instructor?.lastName}</p>
                    <div>
                        <span>{avgReviewCount || 0}</span>
                        <RatingStars Review_Count={avgReviewCount}/>
                        <span>{course?.ratingAndReviews?.length} Ratings</span>
                    </div>
                    <p>&#8377; {course?.price}</p>
                </div>
             </div>
             
             
             </Link>
        </div>
    )
}
export default Course_Card;