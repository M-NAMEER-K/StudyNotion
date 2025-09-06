import React, { useState } from "react";

import {useDispatch , useSelector} from "react-redux"

import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

import { setCourse } from "../../../../../slices/courseSlice";   // adjust path as needed
import { deleteSection, deleteSubSection } from "../../../../../services/operations/courseDetailsAPI";
import ConfirmationModal from "../../../../common/ConfirmationModal"
import SubSectionModal from "./SubSectionModal"

const NestedView=({handleChangeEditSectionName})=>{
      const {course}=useSelector((state)=>state.course);
      const {token}=useSelector((state)=>state.auth);
      const dispatch=useDispatch();

      const [addSubSection , setAddSubSection]=useState(null);
      const [viewSubSection , setViewSubSection]=useState(null);
      const [editSubSection , setEditSubSection]=useState(null);
      const [confirmationModal,setConfirmationModal]=useState(null);
     
      const handleDeleteSection=async(sectionId)=>{
        console.log("---token---",token);
             const result = await deleteSection({
                
                sectionId,courseId:course._id},token
             )
             if(result){
                dispatch(setCourse(result))
             }
             setConfirmationModal(null);
      }
      const handleDeleteSubSection= async(subSectionId , sectionId)=>{
       const result=await deleteSubSection({subSectionId,sectionId},token);
         if(result){
            //todo : extra kya kr skte hai yaha pr
                const updatedCourseContent=course.courseContent.map((section)=>section._id===sectionId?result:section);
                const updatedCourse={...course,courseContent:updatedCourseContent}
              dispatch(setCourse(updatedCourse));
         }
              setConfirmationModal(null);
         
      }

       return(
        <div className="w-full ">
               <div className="w-full ">
                    { course?.courseContent?.map((section)=>(
                        <details key={section._id} open className="w-full  my-2 p-2 bg-gray-900 rounded ">
                              <summary className="flex w-full " >
                                <div className="flex w-[70%] items-center gap-x-3 ">
                                    <RxDropdownMenu size={20}/>
                                    <p>{section.sectionName}</p>
                                </div>
                                <div className="flex w-[30%]  justify-evenly items-center">
                                    <button onClick={()=>handleChangeEditSectionName(section._id,section.sectionName)}>
                                        <MdEdit/>
                                    </button>
                                    <button onClick={()=>{ setConfirmationModal({
                                          text1:"Delete this Section",
                                          text2:"All the lectures in this section will be deleted",
                                          btn1Text:"Delete",
                                          btn2Text:"Cancel",
                                          btn1Handler:()=> handleDeleteSection(section._id),
                                          btn2Handler:()=> setConfirmationModal(null)
                                    })}}>
                                        <RiDeleteBin6Line/>

                                    </button>
                                    <span>|</span>
                                    <BiSolidDownArrow />
                                </div>
                              </summary>
                              <div className="w-full bg-gray-500 rounded p-2">
                                {
                                    section.subSection.map((data)=> (
                                          <div key={(data?._id)} onClick={()=>setViewSubSection(data)}>
                                               <div>
                                                <RxDropdownMenu/>
                                                <p>{data.title}</p>
                                                </div>
                                               
                                               <div className="w-[30%] flex justify-end gap-x-5" onClick={(e)=>e.stopPropagation()}>
                                                <button onClick={()=> setEditSubSection({...data,sectionId:section._id})}>
                                                    <MdEdit/>
                                                </button>
                                                <button onClick={()=>setConfirmationModal({
                                                    text1:"Delete this Sub Section",
                                                    text2:" All the lectures in this section will be deleted",
                                                    btn1Text:"Delete",
                                                    btn2Text:"Cancel",
                                                    btn1Handler:()=> handleDeleteSubSection(data._id,section._id),
                                                     btn2Handler:()=> setConfirmationModal(null)
                                                })}>
                                                        <RiDeleteBin6Line/>
                                                </button>
                                                </div>
                                               

                                            </div>
                                    ))
                                }
                                <button className="flex items-center justify-start" onClick={()=> setAddSubSection(section._id)}>
                                    <AiOutlinePlus/>
                                    <p>Add Lecture</p>
                                </button>
                              </div>
                        </details>
                    ))

                    }
               </div>
                     { addSubSection ? (<SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true}/>):
                     viewSubSection?(<SubSectionModal  modalData={viewSubSection} setModalData={setViewSubSection} view={true}/>):
                     editSubSection?(<SubSectionModal  modalData={editSubSection} setModalData={setEditSubSection} edit={true}/>):
                     (<div></div>)}
                     {confirmationModal ? (<ConfirmationModal modalData={confirmationModal}/>):(<div></div>)}
        </div>
       )
}

export default NestedView;