const Course=require("../models/Course");
const Category=require("../models/Category");
const User=require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")

const CourseProgress = require("../models/CourseProgress")
const { convertSecondsToDuration } = require("../utils/secToDuration")


exports.createCourse=async (req,res)=>{
     try{
             
        //fetch data
           const {courseName , courseDescription , whatYouWillLearn,price,category,tag,status,instructions}=req.body;

           //get thumbnail 
           const thumbnail =req.files?.thumbnailImage;
           let parsedInstructions;
try {
  parsedInstructions = JSON.parse(instructions);
} catch (err) {
  parsedInstructions = [];
}

           //validation 
              if(!courseName || !courseDescription || !whatYouWillLearn || !price || !category){
                  return  res.status(400).json({
                       success:false,
                       message:"All fields are required"
                  });
              }

              //check for instructor
                     const userId=req.user.id;
                     const instructorDetails= await User.findById(userId);
                     console.log("Instructor Details : ",instructorDetails);
          
            //HW- Verify that userid and instructorDetailsid are same or different?
            
                     if(!instructorDetails){
                        return res.status(404).json({
                            success:false,
                            message:"Instructor details not found"
                        });
                     }














                     //check given tag is valid or not
                     const CategoryDetails=await Category.findById(category);

                     if(!CategoryDetails){
                        return res.status(404).json({
                            sucess:false,
                            message:"Category details not found"
                        });
                     }
                 let parsedTags = [];
    if (typeof tag === "string") {
      try {
        parsedTags = JSON.parse(tag);
      } catch {
        parsedTags = [tag];
      }
    } else {
      parsedTags = tag;
    }
                     //Upload Image to CLoudinary
                     const thumbnailImage=await uploadImageToCloudinary(thumbnail,process.env.FOLDER_NAME);

                     //create an entry for new Course
                     // create an entry for new Course




                    const newCourse=await Course.create({
                        courseName,
                        courseDescription,
                        instructor:instructorDetails._id,
                        whatYouWillLearn:whatYouWillLearn,
                        price,
                        tag:parsedTags,
                        thumbnail:thumbnailImage.secure_url,
                        instructions: parsedInstructions,
                        status:status,
                        category:CategoryDetails._id

                     });
                     



                        
                     //add the new course to the user schema of instructor
                
                     await User.findByIdAndUpdate(
                        {_id:instructorDetails._id},
                        {$push:{ courses:newCourse._id}},
                        {new:true}
                     );
                      


                     
                     // Add the new course to the Categories
await Category.findByIdAndUpdate(
  { _id: CategoryDetails._id },
  { $push: { Course: newCourse._id } },
  { new: true }
);


                     return res.status(200).json({
                        success:true,
                        message:"Course added successfully",
                        data:newCourse
                     });
     }
     catch(err){
             console.log(err);
             return res.status(401).json({
                success:false,
                message:err.message
             });
     }
}

//getAllCourses Handler function
exports.getAllCourses=async(req,res)=>{

        try{

       const allcourses=await Course.find({},{courseName:true,price:true,thumbnail:true,instructor:true,
        ratingAndReviews:true,studentsEnrolled:true }).populate({ path: "instructor", populate: { path: "additionalDetails" } })
.populate("category")
.populate({
  path: "courseContent",
  populate: { path: "subSection" }
})
.populate({
  path: "ratingAndReviews",
  populate: { path: "user" } // populate user inside reviews
})
.populate("studentsEnrolled")
.exec();

        return res.status(200).json({
            success:true,
            message:"data for all courses fetch successfully",
            data:allcourses
        });



        }
        catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:"Cannot fetch course Details",
                error:err.message
            });
        }
}

exports.getCourseDetails= async (req,res)=>{
                  try{
                        //get id
                        const {courseId}=req.body;

                        //find course details
                        const courseDetails = await Course.find(
                                    {_id:courseId})
                        .populate({ path: "instructor", populate: { path: "additionalDetails" } })
  .populate("category")
  .populate({
    path: "courseContent",
    populate: { path: "subSection" }
  })
  .populate({
    path: "ratingAndReviews",
    populate: { path: "user" }
  })
  .populate("studentsEnrolled").exec();

      //validation
       if(!courseDetails){
         return res.status(400).json({
            success:false,
            message:`Could not find the course with ${courseId}`
         });
       }
           //return response
           return res.status(200).json({
            success:true,
            message:"Course details fetched successfully",
            data:courseDetails
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

exports.getFullCourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body
    const userId = req.user.id
    const courseDetails = await Course.findById(courseId)
  .populate({ path: "instructor", populate: { path: "additionalDetails" } })
  .populate("category")
  .populate({
    path: "courseContent",
    populate: { path: "subSection" }
  })
  .populate({
    path: "ratingAndReviews",
    populate: { path: "user" }
  })
  .populate("studentsEnrolled")
  .exec();

    let courseProgressCount = await CourseProgress.findOne({
      courseId: courseId,
      userId: userId,
    })

    console.log("courseProgressCount : ", courseProgressCount)

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find course with id: ${courseId}`,
      })
    }

    // if (courseDetails.status === "Draft") {
    //   return res.status(403).json({
    //     success: false,
    //     message: `Accessing a draft course is forbidden`,
    //   });
    // }

    let totalDurationInSeconds = 0
    courseDetails.courseContent.forEach((content) => {
      content.subSection.forEach((subSection) => {
        const timeDurationInSeconds = parseInt(subSection.timeDuration)
        totalDurationInSeconds += timeDurationInSeconds
      })
    })

    const totalDuration = convertSecondsToDuration(totalDurationInSeconds)

    return res.status(200).json({
      success: true,
      data: {
        courseDetails,
        totalDuration,
        completedVideos: courseProgressCount?.completedVideos
          ? courseProgressCount?.completedVideos
          : [],
      },
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}


exports.editCourse = async (req, res) => {
  try {
    const { courseId } = req.body
    const updates = req.body
    const course = await Course.findById(courseId)

    if (!course) {
      return res.status(404).json({ error: "Course not found" })
    }

    // If Thumbnail Image is found, update it
    if (req.files) {
      console.log("thumbnail update")
      const thumbnail = req.files?.thumbnailImage
      const thumbnailImage = await uploadImageToCloudinary(
        thumbnail,
        process.env.FOLDER_NAME
      )
      course.thumbnail = thumbnailImage.secure_url
    }

    // Update only the fields that are present in the request body
    for (const key in updates) {
     if (key === "tag" || key === "instructions") {
  course[key] = typeof updates[key] === "string" 
    ? JSON.parse(updates[key]) 
    : updates[key];
} else {
  course[key] = updates[key];
}
    }

    await course.save()

    const updatedCourse = await Course.findOne({
      _id: courseId,
    })
      .populate({ path: "instructor", populate: { path: "additionalDetails" } })
  .populate("category")
  .populate({
    path: "courseContent",
    populate: { path: "subSection" }
  })
  .populate({
    path: "ratingAndReviews",
    populate: { path: "user" }
  })
  .populate("studentsEnrolled")
      .exec()

    res.json({
      success: true,
      message: "Course updated successfully",
      data: updatedCourse,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    })
  }
}
 exports.getInstructorCourses = async (req, res) => {
  try {
    const instructorId = req.user.id; // from JWT

    // Find instructor and populate their courses
    const instructor = await User.findById(instructorId)
      .populate({
    path: "courses",
    populate: [
      { path: "category" },
      { path: "instructor", populate: { path: "additionalDetails" } },
      { path: "ratingAndReviews" },
      { path: "courseContent", populate: { path: "subSection" } }
    ]
  })
  .exec();

    if (!instructor) {
      return res.status(404).json({
        success: false,
        message: "Instructor not found",
      });
    }

    res.status(200).json({
      success: true,
      data: instructor.courses || [],
    });
  } catch (error) {
    console.error("Error in getInstructorCourses:", error);
    res.status(500).json({
      success: false,
      message: "Failed to retrieve instructor courses",
      error: error.message,
    });
  }
};

  exports.deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.body

    // Find the course
    const course = await Course.findById(courseId)
    if (!course) {
      return res.status(404).json({ message: "Course not found" })
    }

    // Unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled
    for (const studentId of studentsEnrolled) {
      await User.findByIdAndUpdate(studentId, {
        $pull: { courses: courseId },
      })
    }

    // Delete sections and sub-sections
    const courseSections = course.courseContent
    for (const sectionId of courseSections) {
      // Delete sub-sections of the section
      const section = await Section.findById(sectionId)
      if (section) {
        const subSections = section.subSection
        for (const subSectionId of subSections) {
          await SubSection.findByIdAndDelete(subSectionId)
        }
      }

      // Delete the section
      await Section.findByIdAndDelete(sectionId)
    }

    // Delete the course
    await Course.findByIdAndDelete(courseId)

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully",
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    })
  }
}