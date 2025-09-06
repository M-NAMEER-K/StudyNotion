const User=require("../models/User");
const {mailSender}=require("../utils/mailSender");
const {passwordUpdated}=require("../mail/templates/passwordUpdate");
const bcrypt=require("bcrypt");
const crypto=require("crypto");
///resetPasswordToken
exports.resetPasswordToken=async (req,res) =>{
         try{
                   //get email and validate it
        const email=req.body.email; 
        const user=await User.findOne({email:email});
        if(!user){
            return res.json({
                success:false,
                message:"Your email is not registered with us"
            })
        }

            //generate token
             const token=crypto.randomUUID();

             //update user by adding token and expiration time
            const updatedDetails=await User.findOneAndUpdate(
                {email:email},{
                    token:token,
                    resetPasswordExpires:Date.now() + 5*60*1000
                },
                {new :true}
             );

             //create url
                    const url=`http://localhost:5173/update-password/${token}`;

            
            //send mail containing the url
            await mailSender(email,"Password Reset Link",`Password Reset Link : ${url}`);

            //return response
              return res.json({
                                    success:true,
                                    message:"Email sent successfully,please check email and change password"

              });
         }
         catch(err){
            console.log(err);
            return res.status(500).json({
                success:false,
                message:"Something went wrong while sending reset password email"
            });

         }
   

        


   
}

   //reset Password
   exports.resetPassword= async (req,res)=>{
      try{
           //data fetch
             const {password,confirmPassword,token}=req.body;
                console.log(req.body);
             //validation
             if(password!==confirmPassword){
                return res.json({
                    success:false,
                    message:"Password not matching"
                });
             }
             //get userDetails from db using token
              const userDetails= await User.findOne({token:token});
              //if no entry - invalid token 
              if(!userDetails){
                return res.json({
                    success:false,
                    message:"Token is invalid"
                });
              }

              //token time check
              if(userDetails.resetPasswordExpires < Date.now()){

                return res.json({
                    success:false,
                    message:"token is expired,please regenrate your token"
                });
              }

              //hash pwd
              const hashedPassword=await bcrypt.hash(password,10);

              //password update
              await User.findOneAndUpdate(
                {token:token},
                {password:hashedPassword},
                {new:true}
              );
             
               await mailSender(userDetails.email,"Password Reset Successful!",passwordUpdated(userDetails.email,userDetails.firstName));
              //return response
              return res.status(200).json({
                success:true,
                message:"Password reset successfully"
              });
      }
      catch(err){
                  console.log(err);
                  return res.status(400).json({
                    success:false,
                    message:"password is not reset yet,something went wrong"
                  });
      }
   }



