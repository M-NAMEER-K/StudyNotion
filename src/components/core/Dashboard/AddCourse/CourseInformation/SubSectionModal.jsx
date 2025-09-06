import React,{useState,useEffect} from 'react'
import {useForm} from "react-hook-form"
import toast from 'react-hot-toast';
import {useDispatch,useSelector} from "react-redux"
import { RxCross1 } from "react-icons/rx";
import IconBtn from "../../../../common/IconBtn";
import Upload from "./Upload";
import { setCourse } from "../../../../../slices/courseSlice";
import { createSubSection, updateSubSection } from "../../../../../services/operations/courseDetailsAPI";


const SubSectionModal=({modalData , setModalData , add=false, view=false,edit=false})=>{
      const {register ,handleSubmit ,setValue , formState:{errors} , getValues }=useForm();
    const dispatch=useDispatch();
     const [loading , setLoading]=useState(false);
     const {course}=useSelector((state)=>state.course);
     const {token}=useSelector((state)=> state.auth);

     useEffect(()=>{
           if(view || edit){
              setValue("lectureTitle",modalData.title);
              setValue("lectureDesc",modalData.description);
            
           }
     },[]);

     const isFormUpdated=()=>{
          const currentValues=getValues();
           if(currentValues.lectureTitle !== modalData.title ||
            currentValues.lectureDesc !== modalData.description ||
            currentValues.lectureVideo !== modalData.videoUrl 
           ){
            return true;
           }
           else{
            return false;
           }
     } 

     const handleEditSubSection=async()=>{
           const currentValues=getValues();
           const formData=new FormData();
           formData.append("sectionId",modalData.sectionId);
           formData.append("subSectionId",modalData._id);

           if(currentValues.lectureTitle!==modalData.title){
               formData.append("title",currentValues.lectureTitle);
           }
           if(currentValues.lectureDesc!==modalData.description){
              formData.append("description",currentValues.lectureDesc);
           }
           if(currentValues.lectureVideo!==modalData.videoUrl){
            formData.append("video",currentValues.lectureVideo);
           }
           setLoading(true);

           const result=await updateSubSection(formData,token);
           if(result){
             //Todo :same check
              const updatedCourseContent=course.courseContent.map((section)=>section._id===modalData.sectionId?result:section);
                const updatedCourse={...course,courseContent:updatedCourseContent}
            
               dispatch(setCourse(updatedCourse));
           }
           setModalData(null);
           setLoading(false);

     }


        const onSubmit=async(data)=>{
              if(view)
                  return;
                if(edit){
                    if(!isFormUpdated){
                        toast.error("No changes made to the form");
                    }
                    else{
                        handleEditSubSection();
                    }
                    return;
                }

                const formData=new FormData();
                formData.append("sectionId",modalData);
                formData.append("subSectionId", modalData._id)  // ✅ correct key
                formData.append("title",data.lectureTitle);
                formData.append("description",data.lectureDesc);
                formData.append("video",data.lectureVideo);
                setLoading(true);
                  //API call
                  const result=await createSubSection(formData,token);
                  if(result){
                     const updatedCourseContent=course.courseContent.map((section)=>section._id===modalData?result:section);
                const updatedCourse={...course,courseContent:updatedCourseContent}
             
                    dispatch(setCourse(updatedCourse));
                  }
                    setModalData(null);
                    setLoading(false);
        }

    return(
        <div className="w-full ">
                <div>
                      <div>
                         <p>{view && "Viewing"} {add && "Adding"} {edit && "Editing"} Lecture</p>
                         <button onClick={()=>(!loading?setModalData(null):{})}> <RxCross1/></button>
                      </div>
                      <form onSubmit={handleSubmit(onSubmit)}>
                         <Upload name="lectureVideo" label="Lecture Video"  register={register} setValue={setValue} 
                         errors={errors} video={true}  viewData={view?modalData.videoUrl:null } editData={edit?modalData.videoUrl:null} />
                          <div>
                            <label htmlFor="lectureTitle">Lecture Title</label><br/>
                            <input type="text" id="lectureTitle" placeholder="Enter Lecture title" className="bg-gray-900 rounded outline-0 m-2 p-2"
                               {...register("lectureTitle",{required:true})} />
                               { errors.lectureTitle && (<span>Lecture title is required</span>)}
                          </div>
                            <div>
                              <label htmlFor="lectureDesc">Label Description</label><br/>
                              <textarea placeholder="Enter lecture description" id="lectureDesc"  className="bg-gray-900 rounded p-2 m-2 outline-0" {...register("lectureDesc" ,{required:true})}  ></textarea>
                              {errors.lectureDesc && (<span>
                                Lecture Description is required
                              </span>)}
                            </div>

                             {!view && (
                         <div className="flex justify-end">
                   <IconBtn  disabled={loading}  text={loading ? "Loading.." : edit ? "Save Changes" : "Save"}/>
                        </div>
                                 )}

                      
                      
                      </form>
                </div>
        </div>
    )
}

export default SubSectionModal;