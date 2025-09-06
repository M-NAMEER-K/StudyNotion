import React from 'react'
import  ContactUsForm from "../../ContactPage/ContactUsForm"

const ContactForm=()=>{
      return(
        <div className="w-full flex flex-col items-center p-2 gap-y-3">
               <h1 className="text-2xl">Get in Touch</h1>
               <p className="text-gray-400 text-md">We'd love to here for you, Please fill out this form.</p>
               <div className="w-full flex justify-center">
                <ContactUsForm/>
               </div>
        </div>
      )
}


export default ContactForm;