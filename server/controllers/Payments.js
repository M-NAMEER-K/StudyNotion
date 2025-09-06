const {instance} =require("../config/razorpay");
const crypto = require("crypto");
const Course=require("../models/Course");
const User =require("../models/User");
const {mailSender}=require("../utils/mailSender");
const CourseProgress=require("../models/CourseProgress");
const {courseEnrollmentEmail}=require("../mail/templates/courseEnrollmentEmail");
const {paymentSuccessEmail}=require("../mail/templates/paymentSuccessEmail");

const mongoose=require("mongoose");

//catpture the payment and initiate the razorpay order

exports.capturePayment= async (req,res)=>{
     
        const {courses} =req.body;
        const  userId = req.user.id;
        if(courses.length===0){
          return res.json({
            success:false, message:"Please provide course ID"
          });
        }

        let totalAmount=0;
        for(const course_id of courses){
          let course;

          try{
            course=await Course.findById(course_id);
            if(!course){
                return res.status(200).json({
                  success:false,message:"Could not find course"
                });
            }

            const uid= new mongoose.Types.ObjectId(userId);
           if(course.studentsEnrolled.some(id => id.toString() === userId)) {
                  return res.status(200).json({ 
                    success:false,
                    message :"Students is already Enrolled"
                  });
            }
totalAmount+=course.price;

          }
          catch(err){
      console.log(err);
        return res.status(500).json({success:false,message:err.message});
          }
        }

           console.log("tA",totalAmount);

            const options ={
              amount : totalAmount * 100,
              currency :"INR",
             receipt: `${Date.now()}_${Math.floor(Math.random() * 1000)}`

            }
            try {
           
              const paymentResponse = await instance.orders.create(options);
               
              res.json({
                success:true,
                data:paymentResponse
              });
            }
            catch(err){
              console.log(err);
              return res.status(500).json({
                success:false,
                message:"Could not Initiate Order"
              });
            }
        
}


 exports.verifyPayment=async (req,res)=>{
           const razorpay_order_id=req.body?.razorpay_order_id;
           const razorpay_payment_id= req.body?.razorpay_payment_id;
           const razorpay_signature=req.body?.razorpay_signature;
           const courses=req.body?.courses;
           const userId=req.user.id;

           if(!razorpay_order_id || !razorpay_payment_id || !courses || !userId){
                       return res.status(200).json({
                        success:false,
                        message:"Payment failed"
                       });
           }

           let body= razorpay_order_id + "|" + razorpay_payment_id;
           const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET)
           .update(body.toString()).digest("hex");

           if(expectedSignature === razorpay_signature){

            // enroll karwao students ko

                await  enrollStudents(courses , userId , res);

            //return  res
                     return res.status(200).json({success:true,message:"Payment verified"});
           }
           return res.status(200).json({ success:false,message:"Payment Failed"});
          }

           const enrollStudents = async(courses , userId , res)=>{
                               if(!courses || !userId){
                               return res.status(400).json({success:true,message:"Please provide data for courses or UserId"});
                               }

                        for(const courseId of courses){
                    try{
                          // find the course and enroll the students in it
                          const enrolledCourse = await Course.findOneAndUpdate(
                            {_id:courseId},{$push:{studentsEnrolled:userId}},
                            {new :true}
                          )
                             if(!enrolledCourse){
                          return res.status(500).json({
                            success:false,
                            message:"Course not found"
                          });
                        }

                  // find the student and add the course to their list of enrolled courses
                    const courseProgress=await CourseProgress.create({
                      courseId:courseId,
                      userId:userId,
                      completedVideos:[]
                    });
                  
                  const enrolledStudent=await User.findByIdAndUpdate(userId,
                    {
                      $push:{  courses:courseId,
                        courseProgress:courseProgress._id
                      }
                    },{new:true}
                  )
                  // baccho ko mail send kro
                  const emailResponse=await mailSender(
                    enrolledStudent.email,`Successfully Enrolled into ${enrolledCourse.courseName}`,
                    courseEnrollmentEmail(enrolledCourse.courseName , `${enrolledStudent.firstName}`)
                    
                  )
                              console.log("Email sent successfully ", emailResponse.response);
                }
                  catch(err){
                     console.log(err);
                     return res.status(500).json({success:false,message:err.message});
                  }

             }

                     
           }
 
 
 
 
 
 
exports.sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body

  const userId = req.user.id

  if (!orderId || !paymentId || !amount || !userId) {
    return res.status(400).json({ success: false, message: "Please provide all the details" })
  }

  try {
    const enrolledStudent = await User.findById(userId)

    await mailSender(
      enrolledStudent.email,
      `Payment Received`,
      paymentSuccessEmail(
        `${enrolledStudent.firstName} ${enrolledStudent.lastName}`,
        amount / 100,
        orderId,
        paymentId
      )
    )
  } catch (error) {
    console.log("error in sending mail", error)
    return res
      .status(400)
      .json({ success: false, message: "Could not send email" })
  }
}

