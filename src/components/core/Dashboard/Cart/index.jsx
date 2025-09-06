import React from 'react'
import {useSelector} from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount" 


export default function Cart(){

    const {total,totalItems}=useSelector((state)=>state.cart);
    console.log(total,totalItems);
          
    return(
        <div className="w-full pr-10">
             <h1 className="text-2xl p-2">Your Cart</h1>
             <p className="text-xl p-2"><span className="text-yellow-500">{totalItems}</span>  Courses in Cart</p>
             {
                total> 0 ?(
                  <div>
                    <RenderCartCourses/>
                    <RenderTotalAmount/>
                  </div>
                ):(<p>Your cart is empty</p>)
             }
        </div>
    )
}