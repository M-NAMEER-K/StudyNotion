import React from 'react'
import {useSelector} from "react-redux"
import Sidebar from "../components/core/Dashboard/Sidebar"; // adjust path
import { Outlet } from "react-router-dom";

const Dashboard=()=>{

       const {loading:authLoading}=useSelector((state)=>state.auth);
       const {loading:profileLoading}=useSelector((state)=>state.profile);
    
          if(profileLoading || authLoading){
            return(
                <div className="mt-10">
                    Loading...
                </div>
            )
          }

    return(
        <div className="w-full flex justify-between">
              <Sidebar/>
              <div className="w-[70%]">
                <Outlet/>
              </div>
        </div>
    )
}

export default Dashboard;