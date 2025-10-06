 const User=require("../models/User");
 const Profile=require("../models/Profile");
 const { passwordUpdated } = require("../mail/templates/passwordUpdate")
 const OTP=require("../models/OTP");
const otpGenerator=require("otp-generator");
const bcrypt=require("bcrypt");
const {mailSender}=require("../utils/mailSender");
const JWT=require("jsonwebtoken");
require("dotenv").config();
//Send Otp
exports.sendOTP= async (req,res)=>{
      try{
           const {email}=req.body;
           console.log("hello:",email);
           const checkUserPresent = await User.findOne({email});

           if(checkUserPresent){
            return res.status(401).json({
                success:false,
                message:"User already registered"
            });
           }
           //generate OTP
                let otp=otpGenerator.generate(6,{
                    upperCaseAlphabets:false,
                    lowerCaseAlphabets:false,
                    specialChars:false
                });

                console.log("OTP Generated : ",otp);

                //check unique otp or not
                 let result =await OTP.findOne({otp :otp});
                 while(result){
                    otp = otpGenerator(6, {upperCaseAlphabets:false,
                    lowerCaseAlphabets:false,
                    specialChars:false});
                    result=await OTP.findOne({otp:otp});
                 }
                 const otpPayload={email,otp};

                 //create an entry for OTP
                 const otpBody = await OTP.create(otpPayload);
                
                 console.log(otpBody);

                 //return response successful

                 return res.status(200).json({
                    success:true,
                    message:"OTP sent successfully",
                    otp
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

// SignUp

exports.signUp=async (req,res)=>{
   
     //return res
     try{
            //data fetch from request body
    const {firstName,lastName,email,password,confirmPassword,accountType,contactNumber,otp}=req.body;
    if(!firstName ||!lastName ||!email||!password||!confirmPassword||!otp){
                 return res.status(403).json({
                    success:false,
                    message:"All fields are required"
                 });
    }
     //match the passwords
       if(password!==confirmPassword){
        return res.status(400).json({
            success:false,
            message:"Please enter correct password"
        });
    }
        //check user already exists
        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User is already registered"
            });
        }

     //find most recent otp stored for the user
     const recentOtp=await OTP.find({email}).sort({createdAt:-1}).limit(1);
     console.log(recentOtp);
  console.log(typeof otp, otp); 
console.log(typeof recentOtp[0].otp, recentOtp[0].otp);
     //validate OTP
     if(recentOtp.length==0){
        //otp not found
        return res.status(400).json({
            success:false,
            message:"OTP not found"
        });
     }
     else if(otp!==recentOtp[0].otp){
           console.log(otp , recentOtp.otp);
              //InvalidOTP
              return res.status(400).json({
                success:false,
                message:"Invalid OTP"
              });
     }

     //Hash Password
     const hashedPassword=await bcrypt.hash(password,10);

     //entry create in DB

     const profileDetails = await Profile.create({
        gender:null,
        dateofBirth:null,
        about:null,
        contactNumber:null
     });
     
     const user=await User.create({
        firstName,
        lastName,
        email,
        password:hashedPassword,
        accountType,
        additionalDetails:profileDetails._id,
        image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
     });
    
       return res.status(200).json({
        success:true,
        message:"User is registered sucessfully" ,
        user
       });
     }
     catch(error){
           console.log(error);
           return res.status(500).json({
            success:false,
            message:error.message
           });
     }
}
   //Login

   exports.Login=async(req,res)=>{
       try{
        const {email,password}=req.body;

        //validate data
        if(!email || !password){
            return res.status(403).json({
                success:false,
                message:"All fields are required,please try again"
            });

        }
        // check user exist or not
         const user=await User.findOne({email}).populate("additionalDetails");
         if(!user){
            return res.status(401).json({
                success:false,
                message:"User is not registered,please signup first"
            });
         }

         //generate JWT,after password matching
         if(await bcrypt.compare(password,user.password)){
            const payload={
                   email:user.email,
                   id:user._id,
                   accountType:user.accountType
            };
            const token=JWT.sign(payload,process.env.JWT_SECRET,{
                  expiresIn:"2h"
            })
            user.token=token;
            user.password=undefined;
             

            const options={
                expires:new Date(Date.now() +3*24*60*60*1000)
            };
          res.cookie("token",token,options).status(200).json({
          success:true,
          token,
          user,
          message:"Logged in successfully"
            });
         }
         else{
            return res.status(401).json({
                success:false,
                message:"password does not matched"
            });
         }
       }
       catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:"Login Failed,Please try again!"
            });
       }
   }

// Controller for Changing Password
exports.changePassword = async (req, res) => {
  try {
    // Get user data from req.user
    const userDetails = await User.findById(req.user.id)

    // Get old password, new password, and confirm new password from req.body
    const { oldPassword, newPassword } = req.body

    // Validate old password
    const isPasswordMatch = await bcrypt.compare(
      oldPassword,
      userDetails.password
    )
    if (!isPasswordMatch) {
      // If old password does not match, return a 401 (Unauthorized) error
      return res
        .status(401)
        .json({ success: false, message: "The password is incorrect" })
    }

    // Update password
    const encryptedPassword = await bcrypt.hash(newPassword, 10)
    const updatedUserDetails = await User.findByIdAndUpdate(
      req.user.id,
      { password: encryptedPassword },
      { new: true }
    )

    // Send notification email
    try {
      const emailResponse = await mailSender(
        updatedUserDetails.email,
        "Password for your account has been updated",
        passwordUpdated(
          updatedUserDetails.email,
          `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
        )
      )
      console.log("Email sent successfully:", emailResponse.response)
    } catch (error) {
      // If there's an error sending the email, log the error and return a 500 (Internal Server Error) error
      console.error("Error occurred while sending email:", error)
      return res.status(500).json({
        success: false,
        message: "Error occurred while sending email",
        error: error.message,
      })
    }

    // Return success response
    return res
      .status(200)
      .json({ success: true, message: "Password updated successfully" })
  } catch (error) {
    // If there's an error updating the password, log the error and return a 500 (Internal Server Error) error
    console.error("Error occurred while updating password:", error)
    return res.status(500).json({
      success: false,
      message: "Error occurred while updating password",
      error: error.message,
    })
  }
}
       
