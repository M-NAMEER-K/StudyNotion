import React from 'react'
import IconBtn from "./IconBtn"
const ConfirmationModal=({modalData})=>{

     return(
        <div className="w-full   flex items-start p-2 rounded bg-gray-700 ">
            <div className="w-full " >
                <p>{modalData.text1}</p>
                <p>{modalData.text2}</p>
                <div className="w-full flex flex-col gap-y-3 ">
                 <IconBtn onClick={modalData?.btn1Handler} text={modalData?.btn1Text}/>
                 <button className="bg-yellow-500 p-2 text-black w-full rounded-lg" onClick={modalData?.btn2Handler}>{modalData?.btn2Text}</button>
                </div>
            </div>
        </div>
     )

}

export default ConfirmationModal;