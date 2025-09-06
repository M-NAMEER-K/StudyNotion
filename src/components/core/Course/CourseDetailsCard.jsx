import React from "react"
import {useDispatch , useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import copy from "copy-to-clipboard"
import {toast} from "react-hot-toast"





import { addToCart } from "../../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../../utils/constants"

const CourseDetailsCard=({course , setConfirmationModal , handleBuyCourse})=>{
 const {user}=useSelector((state)=> state.profile);
 const {token}=useSelector((state)=>state.auth);
 const navigate=useNavigate();
 const dispatch=useDispatch();

    console.log("user",user);
    console.log("studentsenrolled",course);

    const isEnrolled = course?.studentsEnrolled.some(
  (student) => student._id.toString() === user._id.toString()
);

   const { thumbnail : ThumbnailImage ,
          price : CurrentPrice
   }=course;

   const handleAddToCart=()=>{
            if(user && user?.accountType===ACCOUNT_TYPE.INSTRUCTOR){
                toast.error("You are an instructor,you cannot buy this course");
                return;
            }
            if(token){
                 dispatch(addToCart(course));
                 return;
            }
            setConfirmationModal({
                text1:"you are not logged in",
                text2:"Please Login to add to cart",
                btn1Text:"login",
                btn2Text:"cancel",
                btn1Handler:()=>navigate("/login"),
                btn2Hnadler:()=>setConfirmationModal(null)
            })
    }

    const handleShare=()=>{
       copy(window.location.href);
       toast.success("Link Copied to Clipboard");
    }

  return(

    


    <div className="w-full  p-2">
         <img className="w-[40%] rounded-lg m-2" src={ThumbnailImage} alt="Thumbnail Image" />
          <div className="text-2xl my-2">Rs. {CurrentPrice}</div>
          <div className="flex gap-x-5">
           <button
  className="bg-yellow-500 text-black font-medium rounded p-2"
  onClick={() => {
    if (isEnrolled) {
      navigate("/dashboard/enrolled-courses");
    } else {
      handleBuyCourse();
    }
  }}
>
  {isEnrolled ? "Go To Course" : "Buy Now"}
</button>

             {
                  (!course?.studentsEnrolled.includes(user?._id)) && (
                    <button className="bg-yellow-500 text-black font-medium rounded p-2" onClick={handleAddToCart}>
                        Add to Cart
                    </button>
                  )
             }


          </div>
          <div className="my-4">
               <p>30-Day Money Back Guarantee</p>
               <p>This Course Includes</p>
                <div>
                    {
                        course?.instructions?.map((item,index)=>(
                             <p key={index} >
                                <span >{item}</span>
                             </p>
                        ))
                    }
                </div>
          </div>
            <div>
                <button className="bg-yellow-500 text-black font-medium rounded p-2" onClick={handleShare}>Share</button>
            </div>
    </div>
  )
}

export default CourseDetailsCard;