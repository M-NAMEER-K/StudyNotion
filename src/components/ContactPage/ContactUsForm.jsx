import React,{useState,useEffect} from 'react'
import {useForm} from "react-hook-form"
import CountryCode  from "../../data/countrycode"
import {apiConnector} from "../../services/apiConnector"
import { contactusEndpoint } from "../../services/apis";


const ContactUsForm=()=>{

  const [loading,setLoading]=useState(false);
  const{ register, handleSubmit, reset, formState:{errors,isSubmitSuccessful}}=useForm();

   useEffect(()=>{
          if(isSubmitSuccessful){
             reset({
                email:"",firstname:"",lastname:"",message:"",phoneNo:""
             })
          }
   },[reset,isSubmitSuccessful]);

  const submitContactForm=async(data)=>{
          try{
              setLoading(true)
               const response=await apiConnector("POST",contactusEndpoint.CONTACT_US_API,data);
               console.log("Logging response",response);
               setLoading(false);
          }
          catch(err){
             console.log("Error",err.message);
             setLoading(false);
          }
  }

   return(
           <form className="w-[60%] flex flex-col items-center gap-y-5  " onSubmit={handleSubmit(submitContactForm)}>
                    
                    <div className=" w-full  flex flex-col items-center   gap-y-5">
                        <div className=" w-[60%]  flex  gap-x-3 ">
                             <div className="w-[50%] flex items-start flex-col">
                            <label htmlFor="firstname">First Name</label>
                            <input className="bg-gray-400 w-full text-black rounded p-2 outline-0" type="text" id="firstname" name="firstname" placeholder="Enter first name" {...register("firstname" ,{required:true})}  />
                            { errors.firstname && ( 
                                <span>Please enter your name</span>
                            )}
                            </div>

                             <div className=" w-[50%]  flex items-start flex-col">
                            <label htmlFor="lastname">Last Name</label>
                            <input className="bg-gray-400 w-full text-black rounded p-2 outline-0" type="text" id="lastname" name="lastname" placeholder="Enter last name" {...register("lastname" ,{required:true})}  />
                            { errors.lastname && ( 
                                <span>Please enter your name</span>
                            )}

                            
                        </div>
                        </div>
                        

                        
                         <div className=" w-[60%] flex flex-col items-start ">
                            <label htmlFor="email">Email Address</label>
                            <input  className="bg-gray-400 w-full text-black rounded p-2 outline-0" type="text" id="email" name="email" placeholder="Enter  email" {...register("email" ,{required:true})}  />
                            { errors.email && ( 
                                <span>Please enter your email</span>
                            )}
                        </div>
                        
                          <div className=" w-[60%] flex flex-col items-start ">
                     <label htmlFor="phonenumber" className="lable-style">
                          Phone Number
                               </label>

        <div className="flex gap-5 w-full ">
          <div className="flex w-[30%] flex-col gap-2 bg-gray-400 rounded p-2 text-black">
            <select
              
              name="dropdown"
              id="dropdown"
              className="outline-0"
              {...register("countrycode", { required: true })}
            >
              {CountryCode.map((ele, i) => {
                return (
                  <option key={i} value={ele.code}>
                    {ele.code} - {ele.country}
                  </option>
                )
              })}
            </select>
          </div>
          <div className="flex w-[70%] flex-col gap-2  bg-gray-400 rounded p-2">
            <input type="number" name="phonenumber" id="phonenumber" placeholder="12345 67890"
              className="outline-0 text-black"
              {...register("phoneNo", {
                required: {
                  value: true,
                  message: "Please enter your Phone Number.",
                },
                maxLength: { value: 12, message: "Invalid Phone Number" },
                minLength: { value: 10, message: "Invalid Phone Number" },
              })}
            />
          </div>
        </div>
        {errors.phoneNo && (
          <span >
            {errors.phoneNo.message}
          </span>
        )}
      </div>


                         <div className=" w-[60%] flex flex-col items-start">
                            <label htmlFor="message">Message</label>
                            <textarea className="bg-gray-400 w-full text-black rounded p-2 outline-0" name="message" id="message" cols="18" rows="7" placeholder="Enter your message here" {...register("message",{required:true})}></textarea>
                            {
                                errors.message && (
                                    <span>Please enter your message.</span>
                                )
                            }
                         </div>


                    </div>
                    <button type="submit" className="bg-yellow-500 rounded w-[60%] text-black p-2 font-medium">Send Message</button>
           </form>
   )
}


export default ContactUsForm;