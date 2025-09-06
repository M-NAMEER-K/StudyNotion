import React from 'react'
import {Link} from "react-router-dom"
const CTAButton=({text,bgColor,textColor ,border,children,linkto})=>{
    return(
      <Link to={linkto} className={` flex items-center justify-center font-medium gap-x-1 p-2 rounded ${bgColor} ${textColor} transform hover:scale-95 transition duration-200 ${border} `}>{text} {children}</Link>
    
    )
}

export default CTAButton;