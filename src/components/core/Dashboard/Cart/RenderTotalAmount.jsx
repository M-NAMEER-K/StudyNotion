import React from 'react'
import { useSelector } from 'react-redux'
import { buyCourse } from '../../../../services/operations/studentFeaturesAPI';
import IconBtn from '../../../common/IconBtn';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const RenderTotalAmount = () => {

    const {total, cart} = useSelector((state) => state.cart);
    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const handleBuyCourse = () => {
        const courses = cart.map((course) => course._id);
        // console.log("Bought these course:", courses);
        if(token){
          const courses = cart.map((course) => course._id);
          buyCourse(token,courses,user,navigate,dispatch);
      }
      else{
          navigate('/login');
      }
    }
  return (
    <div className='w-full mt-4 rounded-md border-[1px] border-gray-700 bg-gray-800 p-3  '>

        <p className='mb-1 text-sm font-medium text-gray-300'>Total:</p>
        <p className='mb-6 text-3xl font-medium text-yellow-100 crimson'>₹ {total}</p>

        <IconBtn 
            text="Buy Now"
            onClick={handleBuyCourse}
            customClasses={"flex items-center bg-yellow-500 cursor-pointer gap-x-2 rounded-md py-2 px-5 font-semibold text-gray-900 w-full justify-center"}
        />
        
    </div>
  )
}

export default RenderTotalAmount