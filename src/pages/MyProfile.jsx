import React from "react"
import {useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import IconBtn from "../components/common/IconBtn"


const MyProfile=()=>{
     const {user} = useSelector((state)=>state.profile);
     const navigate=useNavigate();

    return(
        <div className="w-[80%] flex flex-col item-start gap-y-3 " >
             <h1 className="font-medium text-2xl">My Profile</h1>
               <div className="w-full flex justify-between  bg-gray-600 rounded-lg p-2">
                  <div className=" w-[70%] flex gap-x-2 ">
                    <img className="rounded-[50%] h-[50px] w-[50px]" src={`${user.image}`} alt={`profile-${user?.firstName}`} />
                    <div>
                        <p className="text-xl">{user?.firstName + " " + user?.lastName}</p>
                        <p className="text-gray-400">{user?.email}</p>
                    </div>
                  </div>
                  <div className="w-[10%]">
                    <IconBtn  text="Edit" onClick={()=>{ navigate("/dashboard/settings")}}/> 
                    </div>
               </div>


               <div className="w-full bg-gray-600 p-2 rounded-lg">
                <div className="w-full flex justify-between">
                       <p>About</p>
                       <div className="w-[10%]">
                        <IconBtn text="Edit" onClick={()=>{ navigate("/dashboard/settings")}}/>
                       </div>
                       

                </div>
                <p className="text-gray-400">{user?.additionalDetails?.about ?? "write Something about yourself"}</p>
               </div>

              

                <div className="w-full flex flex-col items-center gap-y-3 bg-gray-600 p-2 rounded-lg">
                   <div className="w-full flex justify-between  items-center  mb-5">
                    <p className="text-xl">Personal Details</p>
                    <div className="w-[10%]">
                       <IconBtn text="Edit" onClick={()=>{ navigate("/dashboard/settings")}}/>
                    </div>
                    
                 </div>
                   <div className="w-[80%] flex justify-between ">
                           <div className="w-[50%]">
                    <p>First Name</p>
                     <p className="text-gray-400">{user?.firstName}</p>
                 </div>
                  <div className="w-[50%]">
                    <p>Last Name</p>
                     <p className="text-gray-400">{user?.lastName}</p>
                 </div>
                   </div>
                    <div className="w-[80%] flex justify-between">
                              <div className="w-[50%]">
                    <p>email</p>
                     <p className="text-gray-400">{user?.email}</p>
                 </div>
                  <div className="w-[50%]">
                    <p>Gender</p>
                     <p className="text-gray-400">{user?.additionalDetails?.gender??"Add Gender"}</p>
                 </div>
                    </div>
                  
                 <div className="w-[80%] flex justify-between">
                  <div className="w-[50%]">
                    <p>Phone Number</p>
                         <p className="text-gray-400">{user?.additionalDetails?.contactNumber??"Add Phone Number"}</p>
                 </div>
                 <div className="w-[50%]">
                    <p>Date of Birth</p>
                         <p className="text-gray-400">{user?.additionalDetails?.dateOfBirth??"Add Date of Birth"}</p>
                 </div>
                 </div>
                  
               </div>
        </div>
    )
}

export default MyProfile;