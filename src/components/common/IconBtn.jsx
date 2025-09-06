import React from 'react'
import { FaRegEdit } from "react-icons/fa";

const IconBtn=({ text,onClick,children,disabled,outline=false,customClasses,type})=>{
  
 
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        className={`flex justify-center items-center ${
          outline ? "border border-yellow-500 bg-transparent" : "bg-yellow-500"
        } cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-800 ${customClasses}    `}
        type={type}
      >
        {children ? (
          <>
            <span className={`${outline && "text-yellow-500"}`}>{text}</span>
            {children}
          </>
        ) : (
          text
        )}
      </button>
    )
  }

  export default IconBtn;