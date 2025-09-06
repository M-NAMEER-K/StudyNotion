import React,{useState} from "react"
import {sidebarLinks} from "../../../data/dashboard-links"
import {logout} from "../../../services/operations/authAPI"
import {useSelector,useDispatch} from "react-redux"
import SidebarLink from "./SidebarLink"
import {useNavigate} from "react-router-dom"
import {VscSignOut} from "react-icons/vsc"
import ConfirmationModal from "../../common/ConfirmationModal";


const Sidebar=()=>{
     
      const {user ,loading:profileLoading}=useSelector((state)=>state.profile);
    const {loading:authLoading}=useSelector((state)=>state.auth);
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const [confirmationModal,setConfirmationModal]=useState(null);

     if(profileLoading || authLoading){
        return(
            <div className="mt-10">
                Loading...
            </div>
        )
     }

    return(
        <div className="w-[15%]  bg-gray-600 h-screen  relative ">
             <div className="w-full">
                <div className="w-full  flex flex-col justify-center items-start ">
                    {
                        sidebarLinks.map((link,index)=>{
                            if(link.type && user?.accountType!==link.type) return null;
                            return(
                                <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                            )
                        })
                    }
                </div>
                <div className=" mt-6  w-full bg-gray-600 flex justify-center items-center"></div>
                <div className="w-full ">
                    <div className="w-full  flex items-center justify-center">
                        
                        <SidebarLink link={{name:"Settings" ,path:"dashboard/settings"}} iconName="VscSettingsGear"/>
                    </div>
                    
                    <button className="w-full" onClick={()=>setConfirmationModal({
                        text1:"Are you Sure?" ,
                        text2:"You will be Logged out of Your Account",
                        btn1Text:"Logout",
                        btn2Text:"Cancel",
                        btn1Handler:()=>dispatch(logout(navigate)),
                        btn2Handler:()=>setConfirmationModal(null)
                          
                        
                    })}>
                        <div className="w-full flex items-center justify-center  gap-x-2">
                            <VscSignOut size={24}/>
                             <span>Logout</span>
                        </div>
                    </button>
                </div>
             </div>
                { confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    )
}

export default Sidebar;