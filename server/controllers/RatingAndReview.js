const RatingAndReview = require("../models/RatingAndReview");
const Course = require("../models/Course");
const {default: mongoose}=require("mongoose");

//create Rating

exports.createRating= async (req,res)=>{
    try{
               
        //get user id
        const userId = req.user.id;
        //fetchData from req body
        const {rating,review,courseId}=req.body;
        //check if user is enrolled or not 
      const courseDetails = await Course.findOne({
  _id: courseId,
  studentsEnrolled: userId,   // no $elemMatch, no $eq
});

        if(!courseDetails){
            return res.status(404).json({
                success:false,
                message:"student is not enrolled in the course"
            });
        }

        //check if user already reviewed the course
         const alreadyReviewed = await RatingAndReview.findOne({
            user:userId,
            course:courseId
         });
         if(alreadyReviewed){
      return res.status(403).json({
            success:false,
            message:"Course is already reviewed by the user"
      });
         }

         //create rating and review
           const ratingReview = await RatingAndReview.create({
            rating,review,
            course:courseId,
            user:userId
           });

           //update  course with this rating / review
             const updatedCourseDetails = await Course.findByIdAndUpdate({_id : courseId},{
                       $push : { ratingAndReviews : ratingReview._id}},{new:true});

                       console.log(updatedCourseDetails);

                       //return response
                       return res.status(200).json({
                        success:true,
                        message:"Raing and Review created successfully",
                        ratingReview
                       });




    }
    catch(err){
        console.log(err);
            return res.status(500).json({
                        success:false,
                        message:err.message
                       });
    }
}


exports.getAverageRating= async (req,res) =>{
    try{
         
        //get course ID
        const courseId=req.body.courseId;

        //calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    course: mongoose.Types.ObjectId(courseId)
                }
            },
            {
                $group :{
                    _id:null,
                    averageRating: {$avg :"$rating"}
                }
            }
        ]);

        //return rating
        if(result.length > 0){
              return res.status(200).json({
                success:true,
                averageRating:result[0].averageRating
              });
        }

        //if no rating/review exist

        return res.status(200).json({
   success:true,
   message:"No rating given till now",
   averageRating:0
        });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}

exports.getAllRating= async (req,res) =>{
    try{
                 const AllReviews = await RatingAndReview.find({})
                 .sort({rating:"desc"}).populate({
                    path:"user",
                    select:"firstName lastName email image"
                 }).populate({
                    path:"course",
                    select:"courseName"
                 }).exec();

                 return res.status(200).json({
                    success:true,
                    message:"All Ratings and reviews fetched successfully",
                    data:AllReviews
                 });
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            success:false,
            message:err.message
        });
    }
}


