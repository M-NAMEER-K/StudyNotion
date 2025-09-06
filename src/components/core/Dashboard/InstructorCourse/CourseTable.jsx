import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Table, Tbody, Td, Th, Thead, Tr } from "react-super-responsive-table"
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"

import {
  deleteCourse,
  fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../../common/ConfirmationModal"
import { useNavigate } from "react-router-dom"

export default function CourseTable({ courses, setCourses }) {
  const dispatch = useDispatch()
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const handleCourseDelete = async (courseId) => {
    setLoading(true)
    await deleteCourse({ courseId: courseId }, token)
    const result = await fetchInstructorCourses(token)
    if (result) {
      setCourses(result)
    }
    setConfirmationModal(null)
    setLoading(false)
  }

  const convertSecondsToDuration = (totalSeconds) => {
    if (!totalSeconds || totalSeconds <= 0) return "No Duration"

    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)

    return `${hours > 0 ? hours + "hr " : ""}${minutes}min`
  }

  return (
    <div className="w-full flex items-start">
      <Table className="w-full">
        <Thead className="w-full">
          <Tr>
            <Th className="w-[40%]">Courses</Th>
            <Th className="w-[20%]">Duration</Th>
            <Th className="w-[20%]">Price</Th>
            <Th className="w-[20%]">Actions</Th>
          </Tr>
        </Thead>
        <Tbody className="w-full">
          {courses.length === 0 ? (
            <Tr>
              <Td>No Courses Found</Td>
            </Tr>
          ) : (
            courses?.map((course) => {
              let totalSeconds = 0
              course.courseContent?.forEach((section) => {
                section.subSection?.forEach((sub) => {
                  if (sub.timeDuration) {
                    totalSeconds += parseFloat(sub.timeDuration)
                  }
                })
              })

              const totalDuration = convertSecondsToDuration(totalSeconds)

              return (
                <Tr key={course._id} className="w-full ">
                  <Td>
                    <img
                      className="h-[150px] w-[90%] rounded mt-3"
                      src={course?.thumbnail}
                      alt="thumbnail"
                    />
                    <div className="w-full flex flex-col justify-center">
                      <p>{course.courseName}</p>
                      <p>{course.courseDescription}</p>
                      <p>{course.createdAt}</p>
                      {course.status === COURSE_STATUS.DRAFT ? (
                        <p>DRAFTED</p>
                      ) : (
                        <p>PUBLISHED</p>
                      )}
                    </div>
                  </Td>

                  <Td className="text-center">{totalDuration}</Td>
                  <Td className="text-center">${course.price}</Td>

                  <Td className="relative flex  gap-2 items-center   ">
                    <button
                      className="bg-yellow-500 text-black p-2 mt-[50%] rounded"
                      onClick={() =>
                        navigate(`/dashboard/edit-course/${course._id}`)
                      }
                      disabled={loading}
                    >
                      EDIT
                    </button>

                    <button
                      className="bg-yellow-500 text-black  p-2 mt-[50%] rounded"
                      disabled={loading}
                      onClick={() =>
                        setConfirmationModal({
                          courseId: course._id,
                          text1: "Do you want to delete this course?",
                          text2:
                            "All the data related to this course will be deleted.",
                          btn1Text: "Delete",
                          btn2Text: "Cancel",
                          btn1Handler: !loading
                            ? () => handleCourseDelete(course._id)
                            : () => {},
                          btn2Handler: !loading
                            ? () => setConfirmationModal(null)
                            : () => {},
                        })
                      }
                    >
                      DELETE
                    </button>

                    {/* Modal inline only for this row */}
                    {confirmationModal?.courseId === course._id && (
                      <div className="absolute  mt-2 w-full z-50">
                        <ConfirmationModal modalData={confirmationModal} />
                      </div>
                    )}
                  </Td>
                </Tr>
              )
            })
          )}
        </Tbody>
      </Table>
    </div>
  )
}
