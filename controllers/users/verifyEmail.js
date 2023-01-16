const { NotFound } = require("http-errors");

const { User } = require("../../models/user");

async function verifyEmail(req, res) {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    throw new NotFound();
  }
  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.json({
    code: 200,
    message: "Verification successful",
  });
}

module.exports = verifyEmail;
