import React,{useState,useEffect} from 'react'
import {useForm} from "react-hook-form"
import {useDispatch,useSelector} from "react-redux"
import { TbCurrencyRupee } from "react-icons/tb";
import RequirementField from "./RequirementField"
import {  addCourseDetails,  editCourseDetails,fetchCourseCategories,} from "../../../../../services/operations/courseDetailsAPI"
import { setStep,setCourse } from '../../../../../slices/courseSlice';
import {toast} from 'react-hot-toast'
import IconBtn from "../../../../common/IconBtn"
import { COURSE_STATUS } from "../../../../../utils/constants"; 
import Upload from "./Upload"
import ChipInput from "./ChipInput"


const CourseInformationForm=()=>{
      const {register , handleSubmit , setValue , getValues , formState: { errors }} =useForm();
      const dispatch=useDispatch();
      const {token}=useSelector((state)=>state.auth);
      const {course , editCourse}=useSelector((state)=>state.course);
      const [loading,setLoading]=useState(false);
      const [courseCategories,setCourseCategories]=useState([]);

      useEffect(()=>{
               const getCategories =async()=>{
                   setLoading(true);
                   const categories=await fetchCourseCategories();
                   if(categories.length>0){
                     setCourseCategories(categories);
                   }
                   setLoading(false);
               }

             if(editCourse){
                 setValue("courseTitle",course.courseName);
                  setValue("courseShortDesc",course.courseDescription);
                   setValue("coursePrice",course.price);
                    setValue("courseTags",course.tag);
                     setValue("courseBenefits",course.whatYouWillLearn);
                      setValue("courseCategory",course.category);
                       setValue("courseRequirements",course.instructions);
                        setValue("courseImage",course.thumbnail);
             }

               getCategories();
      } ,[]);

      const isFormUpdated=()=>{
            const currentValues=getValues();
            if(    currentValues.courseTitle !== course.courseName ||
      currentValues.courseShortDesc !== course.courseDescription ||
      currentValues.coursePrice !== course.price ||
      currentValues.courseTags.toString() !== course.tag.toString() ||
      currentValues.courseBenefits !== course.whatYouWillLearn ||
      currentValues.courseCategory._id !== course.category._id ||
      currentValues.courseRequirements.toString() !== course.instructions.toString() 
    || currentValues.courseImage !== course.thumbnail
             )
               return true;
            else 
              return false;
      }
            const onSubmit= async(data)=>{
                   if(editCourse){
                    if(isFormUpdated()){
                    const currentValues=getValues();
                    const formData=new FormData();

                    formData.append("courseId",course._id);
                    if(currentValues.courseTitle!==course.courseName){
                        formData.append("courseName",data.courseTitle);
                    }
                     if(currentValues.courseShortDesc!==course.courseDescription){
                        formData.append("courseDescription",data.courseShortDesc);
                    }
                     if(currentValues.coursePrice!==course.price){
                        formData.append("price",data.coursePrice);
                    }
                     if(currentValues.courseBenefits!==course.whatYouWillLearn){
                        formData.append("whatYouWillLearn",data.courseBenefits);
                    }
                     if (currentValues.courseTags.toString() !== course.tag.toString()) {
          formData.append("tag", JSON.stringify(data.courseTags))
        }
                     if(currentValues.courseCategory._id!==course.category._id){
                        formData.append("category",data.courseCategory);
                    }
                     if(currentValues.courseRequirements.toString()!==course.instructions.toString()){
                        formData.append("instructions",JSON.stringify(data.courseRequirements));
                    }
                     if (currentValues.courseImage !== course.thumbnail) {
          formData.append("thumbnailImage", data.courseImage)
        }
                   setLoading(true);
                   const result=await editCourseDetails(formData,token);
                   console.log("CourseInformation---",result);
                   setLoading(false);
                   if(result){
                    dispatch(setStep(2));
                    dispatch(setCourse(result));
                   }
                  }
                  else{
                         toast.error("No changes made so far");
                  }
      return;
                   }

                   const formData=new FormData();
                   formData.append("courseName",data.courseTitle);
                    formData.append("courseDescription",data.courseShortDesc);
                     formData.append("price",data.coursePrice);
                      formData.append("whatYouWillLearn",data.courseBenefits);
                       formData.append("category",data.courseCategory);
                        formData.append("instructions",JSON.stringify(data.courseRequirements));
                         formData.append("tag", JSON.stringify(data.courseTags))
                         formData.append("thumbnailImage", data.courseImage)
                        
                      
                        formData.append("status",COURSE_STATUS.DRAFT);

                        setLoading(true);
                        const result=await addCourseDetails(formData,token);
                        if(result){
                          dispatch(setStep(2));
                          dispatch(setCourse(result));
                        }

                        setLoading(false);
                        console.log("Printing FormData",formData);
                        console.log("Printing result",result);
            }

      return(
        <div className="w-full bg-gray-600 rounded">
               <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border-gray-600  p-6 space-y-8">
                      <div>
                         <label htmlFor="courseTitle">Course Title<sup>*</sup></label>
                         <input  id="courseTitle" placeholder="Enter Course Title" className="w-full outline-0 text-black bg-white rounded" {...register("courseTitle",{required:true})}  />
                         { errors.courseTitle && ( <span>Course Title is Required</span>)}
                      </div>

                      <div>
                         <label htmlFor="courseShortDesc">Course Short Description<sup>*</sup></label>
                         <input id="courseShortDesc" placeholder="Enter Course Description" className="w-full outline-0 text-black bg-white rounded" {...register("courseShortDesc",{required:true})}  />
                         { errors.courseShortDesc && ( <span>Course Description is Required</span>)}
                      </div>

                      <div className="relative">
                         <label htmlFor="coursePrice">Course Price<sup>*</sup></label>
                         <input id="coursePrice" placeholder="Enter Course Price" className="w-full outline-0 text-black bg-white rounded" {...register("coursePrice",{required:true,valueAsNumber:true})}  />
                         <TbCurrencyRupee className="absolute"/>
                         { errors.coursePrice && ( <span>Course Price is Required</span>)}
                      </div>

                      <div>
                        <label htmlFor="courseCategory" >Course Category <sup>*</sup></label>
                        <select className="bg-white text-black rounded outline-0" id="courseCategory" defaultValue="" {...register("courseCategory",{required:true})}>
                          <option value="" disabled>Choose a Category</option>
                          {
                               !loading && courseCategories.map((category ,index) =>(
                                  <option className="bg-gray-400 text-black outline-0" key={index} value={category?._id}>{category?.name}</option>
                               ))
                          }
                        </select>
                        { errors.courseCategory && (
                            <span>Course Category is Required</span>
                        )}
                      </div>
                               <ChipInput
        label="Tags"
        name="courseTags"
        placeholder="Enter Tags and press Enter"
        register={register}
        errors={errors}
        setValue={setValue}
        getValues={getValues}
      />
      {/* Course Thumbnail Image */}
      <Upload
        name="courseImage"
        label="Course Thumbnail"
        register={register}
        setValue={setValue}
        errors={errors}
        editData={editCourse ? course?.thumbnail : null}
      />

                      {/* create custom component for handling tag inputs  */}
                      {/* create custom component for handling preview of media  */}

                             <div>
                              <label htmlFor="coursebenefits">Benefits of the course <sup>*</sup></label>
                              <input id="coursebenefits" placeholder="Enter benefits of the course" 
                                 className="w-full outline-0 bg-white rounded text-black"  {...register("courseBenefits" ,{required:true})} />
                                 { errors.courseBenefits && (
                                      <span>Benefits of the course are required </span>
                                 )}
                             </div>

                             <RequirementField name="courseRequirements" label="Requirements/Instructions" register={register} errors={errors}
                               setValue={setValue} getValues={getValues} editData={editCourse ? course?.instructions : []}
 />

                           <div>{
                                  editCourse && (
                                     <button onClick={()=> dispatch(setStep(2))}>Continue without saving</button>
                                  )
                            }
                            
                               <IconBtn  type="submit" text={!editCourse ? "Next" : "Save Changes"}/>
                            
                            
                            
                            </div>
               </form>
        </div>
      ) 
}

export default CourseInformationForm;