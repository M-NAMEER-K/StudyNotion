import React, { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router"
import { useSelector, useDispatch } from "react-redux"
import { useParams, useLocation } from "react-router-dom"
import IconBtn from "../../common/IconBtn"
import { markLectureAsComplete } from "../../../services/operations/courseDetailsAPI"
import { updateCompletedLectures } from "../../../slices/viewCourseSlice"

const VideoDetails = () => {
  const { courseId, sectionId, subSectionId } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const playerRef = useRef()
  const location = useLocation()
  const { token } = useSelector((state) => state.auth)
  const { courseSectionData, courseEntireData, completedLectures } =
    useSelector((state) => state.viewCourse)

  const [videoData, setVideoData] = useState(null)
  const [videoEnded, setVideoEnded] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const setVideoSpecificDetails = async () => {
      if (!courseSectionData.length) return
      if (!courseId && !sectionId && !subSectionId) {
        navigate("/dashboard/enrolled-courses")
      } else {
        const filteredData = courseSectionData.filter(
          (course) => course._id === sectionId
        )
        const filteredVideoData = filteredData?.[0].subSection.filter(
          (data) => data._id === subSectionId
        )
        console.log(filteredData)
        setVideoData(filteredVideoData[0])
        setVideoEnded(false)
      }
    }

    setVideoSpecificDetails()
  }, [courseSectionData, courseEntireData, location.pathname])

  const isFirstVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      )

    return currentSectionIndex === 0 && currentSubSectionIndex === 0
  }

  const isLastVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      )

    return (
      currentSectionIndex === courseSectionData.length - 1 &&
      currentSubSectionIndex === noOfSubSections - 1
    )
  }

  const goToNextVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const noOfSubSections =
      courseSectionData[currentSectionIndex].subSection.length
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      )

    if (currentSubSectionIndex !== noOfSubSections - 1) {
      // Same section → next video
      const nextSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex + 1
        ]._id

      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`
      )
    } else {
      // Next section → first video
      const nextSectionId = courseSectionData[currentSectionIndex + 1]._id
      const nextSubSectionId =
        courseSectionData[currentSectionIndex + 1].subSection[0]._id

      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`
      )
    }
  }

  const goToPrevVideo = () => {
    const currentSectionIndex = courseSectionData.findIndex(
      (data) => data._id === sectionId
    )
    const currentSubSectionIndex =
      courseSectionData[currentSectionIndex].subSection.findIndex(
        (data) => data._id === subSectionId
      )

    if (currentSubSectionIndex !== 0) {
      // Same section → previous video
      const prevSubSectionId =
        courseSectionData[currentSectionIndex].subSection[
          currentSubSectionIndex - 1
        ]._id

      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
      )
    } else {
      // Previous section → last video
      const prevSectionId = courseSectionData[currentSectionIndex - 1]._id
      const prevSubSectionLength =
        courseSectionData[currentSectionIndex - 1].subSection.length
      const prevSubSectionId =
        courseSectionData[currentSectionIndex - 1].subSection[
          prevSubSectionLength - 1
        ]._id

      navigate(
        `/dashboard/enrolled-courses/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
      )
    }
  }

  const handleLectureCompletion = async () => {
    setLoading(true)
    const res = await markLectureAsComplete(
      { courseId: courseId, subSectionId: subSectionId },
      token
    )
    if (res) {
      dispatch(updateCompletedLectures(subSectionId))
    }
    setLoading(false)
  }

  console.log("videoData", videoData)

  return (
    <div className="w-full">
      {!videoData ? (
        <div>No Data Found</div>
      ) : (
        <div className="w-full">
          <video
            ref={playerRef}
            src={videoData?.videoUrl}
            controls
            width="100%"
            height="100%"
            onEnded={() => setVideoEnded(true)}
          />

          {videoEnded && (
            <div className="w-full flex justify-between mt-2">
              {/* Mark as completed */}
              <div className="w-[40%] flex justify-start gap-x-5 ml-5 ">
                {!completedLectures.includes(subSectionId) && (
                  <IconBtn
                    disabled={loading}
                    onClick={() => handleLectureCompletion()}
                    text={!loading ? "Mark As Completed" : "Loading..."}
                  />
                )}

                {/* Rewatch */}
                <IconBtn
                  disabled={loading}
                  onClick={() => {
                    if (playerRef?.current) {
                      playerRef.current.currentTime = 0 // reset video
                      playerRef.current.play() // auto play again
                      setVideoEnded(false)
                    }
                  }}
                  text="Rewatch"
                  customClasses="text-xl"
                />
              </div>

              {/* Navigation */}
              <div className="w-[40%] flex justify-end gap-x-5 mr-10 ">
                {!isFirstVideo() && (
                  <button
                    className="bg-yellow-500 text-black font-medium rounded p-2"
                    disabled={loading}
                    onClick={goToPrevVideo}
                  >
                    Prev
                  </button>
                )}
                {!isLastVideo() && (
                  <button
                    disabled={loading}
                    onClick={goToNextVideo}
                    className="bg-yellow-500 text-black font-medium rounded p-2"
                  >
                    Next
                  </button>
                )}
              </div>
            </div>
          )}

          <h1 className="mt-5">{videoData?.title}</h1>
          <p>{videoData?.description}</p>
        </div>
      )}
    </div>
  )
}

export default VideoDetails
