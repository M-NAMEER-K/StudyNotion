// mailSender.js
const { Resend } = require("resend");
    require("dotenv").config();
// Initialize Resend with your API key
const resend = new Resend(process.env.RESEND_API_KEY);

exports.mailSender = async (email, title, body) => {
  try {
    // Send email via Resend
    const data = await resend.emails.send({
      from: "StudyNotion <onboarding@resend.dev>", // verified sender
      to: email,
      subject: title,
      html: body,
    });

    console.log("Email sent successfully:", data);
    return data;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err; // Throw the error so calling code knows something went wrong
  }
};
