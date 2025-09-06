import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className=" w-full flex flex-col items-center">
      <h1 className="text-xl text-center p-2">
        Got a Idea? We&apos;ve got the skills. Let&apos;s team up
      </h1>
      <p className="text-xl text-center p-2">
        Tell us more about yourself and what you&apos;re got in mind.
      </p>

      <div className="w-full mt-7  flex justify-center">
                <ContactUsForm/>
               </div>
    </div>
  );
};

export default ContactForm;