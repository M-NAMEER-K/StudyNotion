import React ,{ useState,useEffect} from "react"

const RequirementField=({name,label,register,errors,setValue,getValues , editData = []})=>{
     const [requirement,setRequirement]=useState("");
     const [ requirementList , setRequirementList] = useState([]);
     useEffect(()=>{  
        register(name,{required:true , validate:(value)=>value.length})  
    },[register,name]);

    // 👇 preload requirementList from editData if available
    useEffect(()=>{  
        if(editData.length > 0) {
            setRequirementList(editData);
            setValue(name, editData); // sync with form
        }
    },[editData,setValue,name]);

    // keep form updated when list changes
    useEffect(()=>{ 
        setValue(name,requirementList)
    },[requirementList,setValue,name])
    
     const handleAddRequirement=()=>{
         if(requirement){
              setRequirementList([...requirementList,requirement]);
               setRequirement("");  
         }
     }

     const handleRemoveRequirement=(index)=>{
          const updatedRequirementList=[...requirementList];
          updatedRequirementList.splice(index , 1);
            setRequirementList(updatedRequirementList);
     }
    return(
                <div className="w-full  ">
                    <label >{label} <sup>*</sup></label>
                    <div>
                        <input type="text" id={name} value={requirement}  onChange={ (e)=> setRequirement(e.target.value)}
                         className="w-full outline-0 bg-white text-black rounded" />
                         <button type="button" onClick={handleAddRequirement} className="font-semibold text-yellow-500">Add</button>
                    </div>
                    {
                          requirementList.length>0 &&(
                              <ul>
                                {
                                     requirementList.map((requirement , index)=>(
                                    <li key={index} className=" flex gap-x-2 my-3  items-center">
                                        <span>{requirement}</span>
                                        <button type="button" className="bg-yellow-500 rounded p-2 text-black" onClick={()=>handleRemoveRequirement(index)} >clear</button>
                                    </li>
                                     ))
                                }
                              </ul>
                          )
                    }
                </div>
    )
}

export default RequirementField;