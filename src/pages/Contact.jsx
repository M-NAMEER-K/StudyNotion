import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"


const Contact = () => {
  return (
    <div className="w-full">
      <div className="w-full flex">
        {/* Contact Details */}
        <div className="w-[30%]">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="w-[70%]">
          <ContactForm />
        </div>
      </div>
      <div className="text-xl">
        {/* Reviws from Other Learner */}
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        
      </div>
      <Footer />
    </div>
  )
}

export default Contact