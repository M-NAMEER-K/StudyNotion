const express = require ("express");


const userRoutes = require("./routes/User");

const profileRoutes = require("./routes/Profile");
const paymentRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const contactRoutes = require("./routes/Contact");

const database = require("./config/database");
const cookieParser = require("cookie-parser");
const cors=require("cors");
const cloudinary=require("./config/cloudinary");
const fileUpload=require("express-fileupload");
const dotenv=require("dotenv");
 dotenv.config();
const PORT=process.env.PORT;
const app =express();
//database connect
  database.connect();

  //middlewares
  
  app.use(express.json()); // for JSON requests
app.use(express.urlencoded({ extended: true })); // for form submissions

  app.use(cookieParser());

  app.use( cors({
      origin :"http://localhost:5173",
      credentials:true,
    
  }));

 

app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: "/tmp/",
}));

  //cloudinary connect
   cloudinary.cloudinaryConnect();

   //routes
  app.use("/api/v1/auth",userRoutes);
  app.use("/api/v1/profile",profileRoutes);
  app.use("/api/v1/course",courseRoutes);
  app.use("/api/v1/payment",paymentRoutes);
  app.use("/api/v1/reach", contactRoutes);

  //default route
  app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:"Your server is up and running..."
    });
  });

  app.listen(PORT,(req,res)=>{
       console.log(`app is listening at ${PORT}`);
  });