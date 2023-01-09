const { User } = require("../../models/user");
const { BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");

async function resendVerifyEmail(req, res) {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new BadRequest("Missing required field email");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Подтверждениу email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationToken}">Нажмите для подтверждения email</a>`,
  };
  await sendEmail(mail);
  res.json({
    code: 200,
    message: "Verification email sent",
  });
}

module.exports = resendVerifyEmail;
