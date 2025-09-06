const Section=require("../models/Section");
const Course=require("../models/Course");

exports.createSection=async(req,res)=>{
    try{
           //data fetch
      const {sectionName,courseId}=req.body;
      //data validation
      if(!sectionName || !courseId){
        return res.status(400).json({
            success:false,
            message:"Missing Properties"
        });
      }


      //create Section
        const newSection = await Section.create({sectionName});
        console.log(newSection);
        //update course with section ObjectID
        const updatedCourseDetails=await Course.findByIdAndUpdate(
                           courseId,
                           {
                            $push:{ courseContent:newSection._id}
                           },{new:true} ).populate({
                path: "courseContent",
                populate: {
                    path: "subSection",
                },
            })
            .exec();
            console.log(updatedCourseDetails);
        return res.status(200).json({
            success:true,
            message:"Section created successfully", 
            data:updatedCourseDetails
        });
    }
    catch(err){
              return res.status(500).json({
            success:false,
            message:"Unable to create Section ,please try again", 
          error:err.message
        });
    }
    
         
}
exports.updateSection= async (req,res)=>{
    try{
              //data input
              const {sectionName , sectionId,courseId} = req.body;
              //data validation
              if(!sectionName || !sectionId){
                  return res.status(400).json({
                    success:false,
                    message:"Missing Properties"
                  });
              }

              //update data
                 const section =await Section.findByIdAndUpdate(sectionId,{sectionName},{new:true});
                  
                 const course=await Course.findById(courseId).populate({path:"courseContent" ,populate:{path:"subSection"}}).exec();
              //return res
              return res.status(200).json({
                success:true,
                data:course,
                message:"Data updated successfully"
              });

    }
    catch(err){
            
            return res.status(500).json({
            success:false,
            message:"Unable to create Section ,please try again", 
            error:err.message
        });
    }
}

exports.deleteSection = async (req,res)=>{
     try {
    // get data
    const { sectionId, courseId } = req.body;

    if (!sectionId || !courseId) {
      return res.status(400).json({
        success: false,
        message: "Missing Properties",
      });
    }

    // remove sectionId from courseContent array
    await Course.findByIdAndUpdate(
      courseId,
      { $pull: { courseContent: sectionId } },
      { new: true }
    );

    // delete section
    await Section.findByIdAndDelete(sectionId);

    return res.status(200).json({
      success: true,
      message: "Section deleted successfully",
    });}
      catch(err){
            return res.status(500).json({
            success:false,
            message:"Unable to delete Section ,please try again", 
            error:err.message
      })
}
}

