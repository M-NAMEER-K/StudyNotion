import React from 'react'
import {Link} from "react-router-dom"
import  {FaArrowRight} from "react-icons/fa"
import CTAButton from "./CTAButton"
import {TypeAnimation} from "react-type-animation"
const CodeBlocks =(({position , heading , subheading , codeblock , backgroundGradient , codeColor})=>{
    return(
        <div className={`w-[75%] flex  ${position}`}>
                <div className="w-[50%] flex flex-col gap-y-4 p-2">
                       {heading}
                       <div className="text-gray-400">{subheading}</div>
                   <div className=" flex gap-x-4">
                                         <CTAButton text={"try it yourself"} bgColor={"bg-yellow-500"} linkto="/login" textColor={"text-black"} > <FaArrowRight/> </CTAButton>
                                             <CTAButton text={"Learn More"} bgColor={"bg-gray-600"} linkto="/login" textColor={"text-white"} border={"border-l-0 border-t-0 border border-gray-300"}/>
                      </div>    
                </div>
                <div className="w-[50%]  flex ">
                       <div className="w-[10%]   flex flex-col text-gray-600">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                   
                   
                </div>
                 <div className={` w-[90%] ${codeColor} flex flex-col `}> 
                    <TypeAnimation sequence={[codeblock,2000,""]} 
                    repeat={Infinity}
                     cursor={true} 
                      omitDeletionAnimation={true}
                      // preserves spacing and newlines
                     style={{ whiteSpace: "pre-line", display:"block"}}/></div>
                </div>
              
        </div>
    )
})


export default CodeBlocks;