   import React,{useState} from 'react'
  import {useForm} from 'react-hook-form'
  import {useSelector} from "react-redux"
  import IconBtn from "../../../../common/IconBtn"
import { MdAddCircleOutline } from "react-icons/md";
import {useDispatch} from "react-redux"
import { BiRightArrow } from "react-icons/bi";
// Missing import
import { toast } from "react-hot-toast";

import NestedView from "./NestedView"
import {
  createSection,
  updateSection,
} from "../../../../../services/operations/courseDetailsAPI"
import {
  setCourse,
  setEditCourse,
  setStep,
} from "../../../../../slices/courseSlice"

   const CourseBuilderForm=()=>{
          const dispatch=useDispatch();
        const {register , handleSubmit,setValue, formState:{errors}}=useForm();
        const [editSectionName , setEditSectionName]=useState(null);
        const {course}=useSelector((state)=>state.course);
        const [loading,setLoading]=useState(false);
        const {token}=useSelector((state)=> state.auth);



        const onSubmit=async(data)=>{

            
      setLoading(true);
      let result;
      if(editSectionName){
          result=await updateSection({
           sectionName:data.sectionName,
           sectionId:editSectionName,
           courseId:course._id
          },token);

        
      }
      else{
          result= await createSection({
              sectionName:data.sectionName,
              courseId:course._id,

          },token);
      }
      
     if(result){
             console.log("------------",result);
        dispatch(setCourse(result));
     
        setEditSectionName(null);
        setValue("sectionName","");
     }
         setLoading(false);
        }

        const cancelEdit=()=>{
             setEditSectionName(null);
             setValue("sectionName","");

        }

   const goBack=()=>{
     dispatch(setStep(1));
     dispatch(setEditCourse(true));
   }

   const goToNext=()=>{
       if(course.courseContent.length===0){
        toast.error("Please add atleast one section");
        return;
       }
        if(course.courseContent.some((section)=> section.subSection.length===0)){
              toast.error("Please add atleast one lecture in each section");
              return;
        }      
        dispatch(setStep(3));
         
   }

    const handleChangeEditSectionName=(sectionId , SectionName) =>{
        if(editSectionName === sectionId){
               cancelEdit();
               return;
        }
        setEditSectionName(sectionId);
        setValue("sectionName",SectionName);

    }
      return(
           <div className="text-white bg-gray-600 w-full rounded p-2">
                    <p className="text-xl">Course Builder</p>
                    <form  onSubmit={handleSubmit(onSubmit) }>
                        <div className="flex flex-col mb-5">
                            <label htmlFor="SectionName">Section name <sup>*</sup></label>
                            <input type="text" id="SectionName" placeholder="Add section name" className="w-full rounded outline-0 bg-white text-black" {...register("sectionName" , {required:true})} />
                            {errors.sectionName && ( <span>Section Name is required</span>)}
                        </div>
                        <div className="mb-5 ">
                            <IconBtn type="Submit" text={editSectionName ? "Edit Section Name" : "Create Section"} 
                            outline={true} customClasses={"text-white"}>
                                <MdAddCircleOutline className="text-yellow-500" size={20}/>
                            </IconBtn>
                            {editSectionName && ( <button type="button" onClick={cancelEdit}>Cancel Edit</button>)}
                        </div>


                    </form>
                         
                    {course.courseContent.length > 0 && (
                        <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
                    )}

                    <div className="flex gap-x-5">
                        <button  className="bg-yellow-500 text-black p-2 rounded" onClick={goBack}>Back</button>
                        <IconBtn text="Next" onClick={goToNext}>
                            <BiRightArrow/>
                        </IconBtn>
                    </div>
           </div>
      )
   }
   export default CourseBuilderForm;