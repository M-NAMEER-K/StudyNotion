import React from "react"
import {toast} from "react-hot-toast"
import {apiConnector} from "../apiConnector"
import {catalogData} from "../apis"


const getCataLogPageData=async(categoryId)=>{
      const toastId=toast.loading("Loading...");
      let result=[];
      try{
               const response=await apiConnector("POST",catalogData.CATALOGPAGEDATA_API , { categoryId:categoryId})
               if(!response?.data?.success)
                  throw new Error("Could not fetch Category page data");

               result=response?.data;
      } 
      catch(err){
            console.log("CATALOG PAGE DATA API ERROR...",err);
            toast.error(err.message);
            result=err.response?.data;
      }
        toast.dismiss(toastId);
        return result;
   return(
    <div>
           
    </div>
   )
}

export default getCataLogPageData;