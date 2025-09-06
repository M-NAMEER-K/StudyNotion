import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosArrowDown } from "react-icons/io";
import IconBtn from "../../common/IconBtn";

const VideoDetailsSidebar = ({ setReviewModal }) => {
  const [activeStatus, setActiveStatus] = useState("");
  const [videoBarActive, setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const { sectionId, subSectionId } = useParams();
  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures,
  } = useSelector((state) => state.viewCourse);

  useEffect(() => {
    const setActiveFlags = () => {
      if (!courseSectionData.length) return;

      const currentSectionIndex = courseSectionData.findIndex(
        (data) => data._id === sectionId
      );
      const currentSubSectionIndex =
        courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
          (data) => data._id === subSectionId
        );
      const activeSubSectionId =
        courseSectionData[currentSectionIndex]?.subSection?.[
          currentSubSectionIndex
        ]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id);
      setVideoBarActive(activeSubSectionId);
    };

    setActiveFlags();
  }, [courseSectionData, courseEntireData, location.pathname]);

  return (
    <div className="w-[30%] bg-gray-600 ">
      {/* Header */}
      <div className="w-full">
        <div className="w-full flex justify-between p-4">
          <div
            className="text-center bg-yellow-500 text-black font-medium rounded p-2 cursor-pointer"
            onClick={() => {
              navigate("/dashboard/enrolled-courses");
            }}
          >
            Back
          </div>
          <div>
            <IconBtn text="Add Review" onClick={() => setReviewModal(true)} />
          </div>
        </div>

        <div className="w-full p-2">
          <p className="text-xl">{courseEntireData?.courseName}</p>
          <p className="text-gray-200">
            {completedLectures?.length}/{totalNoOfLectures}
          </p>
        </div>
      </div>

      {/* Sidebar Content */}
      <div className="w-full">
        {courseSectionData.map((course) => (
          <div key={course._id}>
            {/* Section */}
            <div className="w-full flex justify-between p-2 "onClick={() =>setActiveStatus(activeStatus === course?._id ? "" : course?._id)}>
              <div >{course?.sectionName}</div>
              <IoIosArrowDown />
              {/* TODO: Add arrow icon here with rotate animation */}
            </div>

            {/* Subsections */}
            {activeStatus === course?._id && (
              <div>
                {course.subSection.map((topic) => (
                  <div    key={topic._id}
                    onClick={() => {
                     navigate(
  `/dashboard/enrolled-courses/view-course/${courseEntireData?._id}/section/${course._id}/sub-section/${topic?._id}`
);
                      setVideoBarActive(topic?._id);
                    }}
                    className={`flex gap-5 p-5 cursor-pointer ${
                      videoBarActive === topic._id
                        ? "bg-yellow-500 text-black"
                        : "bg-gray-700 text-white"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={completedLectures.includes(topic?._id)}
                      onChange={() => {}}
                    />
                    <span>{topic.title}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideoDetailsSidebar;
