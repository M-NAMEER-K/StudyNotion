const jwt=require("jsonwebtoken");
require("dotenv").config();

const User=require("../models/User");

//auth
exports.auth=async (req,res,next)=>{
    try{
           let token = null;
    const authHeader = req.header("Authorization");

    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.replace("Bearer ", "");
    }
    // If not in header, check cookies
    else if (req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    console.log("Backend received token:", token);
    

          //if token missing then return response
          if(!token){
            return res.status(401).json({
                success:false,
                message:"Token is missing"
            });
          }

          //verify the token
          try{
                 const decode= jwt.verify(token,process.env.JWT_SECRET);
                 console.log("decoded:  ",decode);
                 req.user=decode;
          }
          catch(err){
            console.log(err);
              return res.status(401).json({
                success:false,
                message:"Token is Invalid"
            });
          }
           next();
    }
    catch(err){
           return res.status(401).json({
                success:false,
                message:"Something went wrong while validatng token"
            });
    }
}

exports.isStudent=async (req,res,next)=>{
               try{
                                       if(req.user.accountType!=="Student"){
                                        return res.status(401).json({
                                            success:false,
                                            mesage:"This is a protected route for students only"
                                        });
                                       }
                                       next();
               }
               catch(err){
                     return res.status(500).json({
                        success:false,
                        message:"User role cannot be verified,please try again "
                     });
               }
}

exports.isInstructor=async (req,res,next)=>{
               try{
                                       if(req.user.accountType!=="Instructor"){
                                        return res.status(401).json({
                                            success:false,
                                            mesage:"This is a protected route for Instructor only"
                                        });
                                       }

                                     
                                       next();
               }
               catch(err){
                     return res.status(500).json({
                        success:false,
                        message:"User role cannot be verified,please try again "
                     });
               }
}



exports.isAdmin=async (req,res,next)=>{
               try{
                                       if(req.user.accountType!=="Admin"){
                                        return res.status(401).json({
                                            success:false,
                                            mesage:"This is a protected route for Admin only"
                                        });
                                       }
                                       next();
               }
               catch(err){
                     return res.status(500).json({
                        success:false,
                        message:"User role cannot be verified,please try again "
                     });
               }
}

