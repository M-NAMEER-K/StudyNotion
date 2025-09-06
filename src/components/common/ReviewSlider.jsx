import React, { useEffect, useState } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { Autoplay, FreeMode, Navigation, Pagination } from "swiper/modules";
import ReactStars from "react-rating-stars-component";
import {apiConnector} from "../../services/apiConnector"
import {ratingsEndpoints} from "../../services/apis"
const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;

  useEffect(() => {
    const fetchAllReviews = async () => {
      const response = await apiConnector("GET", ratingsEndpoints.REVIEWS_DETAILS_API);
      console.log("response---",response);
      if (response?.data?.success) {
        setReviews(response.data.data);
      }
    };
    fetchAllReviews();
  }, []);

  return (
    <div className="w-full ">
      <Swiper
        slidesPerView={4}
        spaceBetween={24}
        loop={true}
        freeMode={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, FreeMode, Pagination, Navigation]}
      >
        {reviews.map((review, index) => (
          <SwiperSlide key={index}>
            <img className="w-[50%] rounded-lg"
              src={
                review?.user?.image
                  ? review?.user?.image
                  : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
              }
              alt="Profile Pic"
            />
            <p>{review?.user?.firstName} {review?.user?.lastName}</p>
            <p>{review?.course?.courseName}</p>
            <p>{review?.review}</p>
            <p>{review?.rating?.toFixed(1)}</p>
            <ReactStars
              count={5}
              value={review.rating}
              size={20}
              edit={false}
              activeColor="#ffd700"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewSlider;
