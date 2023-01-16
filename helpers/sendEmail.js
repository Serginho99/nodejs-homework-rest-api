const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

async function sendEmail(data) {
  const email = { ...data, from: "ostroverkh27@gmail.com" };
  try {
    await sgMail.send(email);
    return true;
  } catch (error) {
    throw error();
  }
}

module.exports = sendEmail;
