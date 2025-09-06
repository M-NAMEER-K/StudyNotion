const Profile=require("../models/Profile");
const User=require("../models/User");
const Course=require("../models/Course");
const cloudinary=require("cloudinary").v2;
const fileUpload=require("express-fileupload");
const courseProgress=require("../models/CourseProgress");
const  {convertSecondsToDuration}=require("../utils/secToDuration");

const { uploadImageToCloudinary } = require("../utils/imageUploader")
exports.updateProfile = async (req, res) => {
  try {
    const { dateOfBirth = "", about = "", contactNumber, gender, firstName, lastName } = req.body;
    const id = req.user.id;

    if (!contactNumber || !gender || !id) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // Update User basic info
    const userDetails = await User.findById(id);
    if (!userDetails) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (firstName) userDetails.firstName = firstName;
    if (lastName) userDetails.lastName = lastName;
    await userDetails.save();

    // Update Profile
    const profileDetails = await Profile.findById(userDetails.additionalDetails);
    profileDetails.dateOfBirth = dateOfBirth;
    profileDetails.about = about;
    profileDetails.gender = gender;
    profileDetails.contactNumber = contactNumber;
    await profileDetails.save();

    // Return updated User with populated additionalDetails
    const updatedUser = await User.findById(id).populate("additionalDetails");

    return res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      profileDetails: updatedUser
    });
  } catch (err) {
    return res.status(500).json({ success: false, message: err.message });
  }
};


 exports.deleteAccount=async (req,res)=>{
    try{
                //get  id
                const id=req.user.id;
                //validation
                const userDetails=await User.findById(id);
                if(!userDetails){
                    return res.status(404).json({
                        success:false,
                        message:"User not found"
                    });
                }
                //delete profile
                await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

   //HW how to unenroll user from enrolled courses
   // explore crone job , how can we schedule delete operation
                //delete user
                await User.findByIdAndDelete({_id:id});


                return res.status(200).json({
                    success:true,
                    message:"User deleted successfully"
                });
    }
    catch(err){
             return res.status(500).json({
                success:false,
                message:"User cannot be deleted"
            });
    }
 }
   
    exports.getAllUserDetails=async (req,res) =>{
          
        try{
                
            const id=req.user.id;
            const userDetails=await User.findById(id).populate("additionalDetails").exec();

            //return response
            return res.status(200).json({
                    success:true,
                    messsage:"User data fetched successfully",
                    data:userDetails
            });
        }
        catch(err){
             return res.status(500).json({
                success:false,
                message:"User details cannot be found"
            });
        }
    }

exports.getEnrolledCourses = async (req, res) => {
  try {
    const userId = req.user.id
    console.log("userid", userId)

    let userDetails = await User.findOne({ _id: userId })
      .populate({
        path: "courses",
        populate: {
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        },
      })
      .exec()

    if (!userDetails) {
      return res.status(400).json({
        success: false,
        message: `Could not find user with id: ${userId}`,
      })
    }

    userDetails = userDetails.toObject()

    for (let i = 0; i < userDetails.courses.length; i++) {
      let totalDurationInSeconds = 0
      let SubsectionLength = 0

      for (let j = 0; j < userDetails.courses[i].courseContent.length; j++) {
        totalDurationInSeconds += userDetails.courses[i].courseContent[j].subSection.reduce(
          (acc, curr) => acc + parseInt(curr.timeDuration),
          0
        )

        SubsectionLength += userDetails.courses[i].courseContent[j].subSection.length
      }

      // store formatted total duration
      userDetails.courses[i].totalDuration = convertSecondsToDuration(totalDurationInSeconds)

      // check course progress
      let courseProgressDoc = await courseProgress.findOne({
        courseId: userDetails.courses[i]._id,
        userId: userId,
      })

      let completedCount = courseProgressDoc?.completedVideos.length || 0

      if (SubsectionLength === 0) {
        userDetails.courses[i].progressPercentage = 100
      } else {
        const multiplier = Math.pow(10, 2)
        userDetails.courses[i].progressPercentage =
          Math.round((completedCount / SubsectionLength) * 100 * multiplier) /
          multiplier
      }
    }

    return res.status(200).json({
      success: true,
      data: userDetails.courses,
    })
  } catch (error) {
    console.error(error)
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }
}
    exports.updateDisplayPicture=async (req,res)=>{
      
      
          try    {
              console.log("req.files:", req.files);

       if (!req.files || !req.files.displayPicture) {
       return res.status(400).json({
        success: false,
        message: "No image file uploaded",
      });
    }
    const displayPicture = req.files.displayPicture
    const userId = req.user.id

   

    const image = await uploadImageToCloudinary(
      displayPicture, 
      process.env.FOLDER_NAME,
      1000,
      1000
    )
    console.log("image: ",image)
    const updatedProfile = await User.findByIdAndUpdate(
      { _id: userId },
      { image: image.secure_url },
      { new: true }
    )
   return res.status(200).json({
      success: true,
      message: `Image Updated successfully`,
      data: updatedProfile,
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    })
  }

  
    }
 
   exports.instructorDashboard = async (req, res) => {
  try {
    const courseDetails = await Course.find({ instructor: req.user.id })

    const courseData = courseDetails.map((course) => {
      const totalStudentsEnrolled = course.studentsEnrolled.length
      const totalAmountGenerated = totalStudentsEnrolled * course.price

      // Create a new object with the additional fields
      const courseDataWithStats = {
        _id: course._id,
        courseName: course.courseName,
        courseDescription: course.courseDescription,
        // Include other course properties as needed
        totalStudentsEnrolled,
        totalAmountGenerated,
      }

      return courseDataWithStats
    })

    res.status(200).json({ courses: courseData })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server Error" })
    console.log(error);
  }
}