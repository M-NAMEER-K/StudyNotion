import React from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode , Pagination ,Autoplay ,Navigation} from "swiper/modules"

 import Course_Card from "./Course_Card"



const CourseSlider=({Courses=[]})=>{
              console.log("++++",Courses);
   return(
               <div className="w-full p-2">
                {   
                    Courses.length?(<Swiper slidesPerView={1} loop={true} spaceBetween={200} modules={[Pagination,Navigation,Autoplay,FreeMode]}
                     pagination={true} className="mySwiper" autoplay={{delay:1000 , disableOnInteraction:false}} navigation={true} breakpoints={{1024:{slidesPerView:3}}}>
                        {
                            Courses?.map((course,index)=>(
                                <SwiperSlide key={index}>
                                    <Course_Card course={course} Height={"h-[250px]"}/>
                                </SwiperSlide>
                            ))
                        }
                    </Swiper>):(
                        <p>No Course Found</p>
                    )
                }
               </div>
   )
}

export default CourseSlider;