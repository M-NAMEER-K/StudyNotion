const postmark = require("postmark");
require("dotenv").config();

const client = new postmark.ServerClient(process.env.POSTMARK_API_KEY);

exports.mailSender = async (to, subject, html) => {
  try {
    const data = await client.sendEmail({
      From: process.env.POSTMARK_SENDER,
      To: to,
      Subject: subject,
      HtmlBody: html,
    });
    console.log("Email sent successfully:", data);
    return data;
  } catch (err) {
    console.error("Error sending email:", err);
    throw err;
  }
};
