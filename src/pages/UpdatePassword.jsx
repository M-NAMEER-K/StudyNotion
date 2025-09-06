import React,{useState} from 'react'
import {useSelector} from "react-redux"
import {AiFillEyeInvisible , AiFillEye} from "react-icons/ai"
import {Link,useLocation} from "react-router-dom"
import {resetPassword} from "../services/operations/authAPI"
import {useDispatch} from "react-redux"


const UpdatePassword=()=>{

const dispatch=useDispatch();
const location=useLocation();


    const [formData,setFormData]=useState({
        password:"",
        confirmPassword:""
    })

    const [showConfirmPassword , setShowConfirmPassword]=useState(false);
    const [showPassword, setShowPassword]=useState(false);
    const  {loading}= useSelector((state)=>state.auth);

    const {password,confirmPassword}=formData;


   const handleOnChange=(e)=>{
      setFormData( (prevData)=>({
          ...prevData,
          [e.target.name]:e.target.value
      }
    ))
   }

   const handleOnSubmit=(e)=>{
       e.preventDefault();
       const token=location.pathname.split('/').at(-1);
       dispatch(resetPassword(password,confirmPassword,token))
   }

    return(
        <div className=" w-full flex flex-col items-center justify-center ">
            {
                loading ? (
                    <div>
                      Loading...

                    </div>
                ):( <div className="flex flex-col gap-y-5">
                                      <h1>Choose New Password</h1>
                                      <p>Almost done.Enter your new password and you are done.</p>
                                   <form onSubmit={handleOnSubmit} className="text-white">
                                    <label >
                                        <p>New password</p>
                                        <input className="outline-0 p-2 bg-gray-400 rounded" type={showPassword ? "text" : "password"}  name="password" placeholder="confirm Password"
                                           value={password} onChange={handleOnChange}/>
                                              <span onClick={()=>setShowPassword((prev)=>!prev)}>
                                           { showPassword ? <AiFillEyeInvisible fontSize={24}/>:<AiFillEye fontSize={24}/> }  </span>   
                                           
                                           
                                        </label>
                                        
                                     <label >
                                        <p>Confirm New password</p>
                                        <input className="outline-0 p-2 bg-gray-400 rounded" type={showConfirmPassword ? "text" : "password"}  name="confirmPassword"
                                           value={confirmPassword} onChange={handleOnChange} placeholder="confirm Password"/>

                                            <span onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                                           { showConfirmPassword ? <AiFillEyeInvisible fontSize={24}/>:<AiFillEye fontSize={24}/> }  </span>   
                                           
                                        </label>  


                       <button className="bg-yellow-500 text-black p-2 rounded" type="submit">Reset Password</button>

                                        
                                           </form>  
                             
                          <div className=" w-[30%] bg-yellow-500 text-black p-2 rounded" ><Link  to="/login"><p>Back To Login</p></Link></div>
                </div>)
            }
        </div>
    )
}

export default UpdatePassword;