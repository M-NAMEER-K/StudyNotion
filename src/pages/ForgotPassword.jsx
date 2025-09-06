import React,{useState} from 'react'
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {getPasswordResetToken} from "../services/operations/authAPI"

const ForgotPassword=()=>{

        const dispatch=useDispatch();
        const [emailSent , setEmailSent]=useState(false);
        const [email,setEmail]=useState("");
       const {loading}=useSelector((state)=>state.auth);

       const handleOnSubmit=(e)=>{
             e.preventDefault();

             dispatch(getPasswordResetToken(email,setEmailSent));
       }

    return(
        <div className="w-full  flex flex-col ">
             {
                loading?(<div>Loading...</div>):(<div className="w-full flex flex-col gap-y-2 justify-center items-center"> 
                           <h1>{
                                    !emailSent?"Reset your Password":"Check your Email"         }</h1>
                                    <p>
                                        {!emailSent?"Have no fear. We'll email youinstructions to reset your password.If you dont access to your email we can tr account recovery"
                                        :`We have sent the reset email to ${email}`}
                                    </p>


                                    <form onSubmit={handleOnSubmit} className="w-full  flex flex-col gap-y-2 justify-center items-center p-2">
                                        {
                                            !emailSent && (
                                                <label className=" flex items-center gap-x-2">
                                                    <p>Email Address</p>
                                                    <input className="rounded p-2 bg-gray-400 text-black outline-0" type="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)}
                                                    placeholder="Enter your Email Address"/>
                                                </label>
                                            )
                                        }
                                           <button type="submit" className="bg-yellow-500 text-black rounded p-2 ">{ !emailSent ? "Reset Password" :"Resend Email"}</button>
                                    </form>

                                       <div>
                                        <Link to="/login" className="bg-yellow-500 text-black rounded p-2 mt-2">Back To Login</Link>
                                       </div>
                </div>)
             }
        </div>
    )
}

export default ForgotPassword;