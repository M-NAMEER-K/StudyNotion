import React,{useState,useEffect} from 'react'
import OTPInput from "react-otp-input"
import { Link ,useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import { signUp, sendOtp } from "../services/operations/authAPI";

const VerifyEmail=()=>{
       
     const [otp,setOtp]=useState("");
     const dispatch=useDispatch();
     const navigate=useNavigate();

    const {signupData,loading}=useSelector((state)=> state.auth);
    useEffect(()=>{
        if(!signupData){
            navigate("/signup");
        }
    },[]);

    const handleOnSubmit=(e)=>{
           e.preventDefault();

           const{accountType , firstName , lastName , email , password , confirmPassword}=signupData;

           dispatch(signUp(accountType , firstName , lastName , email , password , confirmPassword,otp,navigate));
    }
       return(
        <div className="text-white flex  jusitfy-center items-center">
             { loading?(<div>Loading...</div>):(<div className=" w-full flex flex-col items-center gap-y-3 ">
                <h1>Verify Email</h1>
                <p>A verification code has been sent to you.Enter the code below</p>
                <form  onSubmit={handleOnSubmit} className=" w-full flex flex-col gap-y-3 items-center   p-2">
                    <OTPInput    containerStyle=" w-full  flex gap-2 justify-center  "
                    value={otp} 
                    onChange={setOtp}
                     numInputs={6}
                     renderSeparator={<span >-</span>}
                  
                      renderInput={ (props)=>(<input    {...props} className="bg-white text-black rounded " />)}/>

                    <button className="bg-yellow-500 w-[10%] text-black p-2 rounded" type="submit">Verify Email</button>
                </form>
                    <div className="bg-yellow-500 text-black p-2 rounded"> <Link to="/login">Back to Login</Link></div> 
                    <button className="bg-yellow-500 text-black p-2 rounded" onClick={()=>dispatch(sendOtp(signupData.email,navigate))}>Resend It</button>
             </div>)}
        </div>
       )
}

export default VerifyEmail;