const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
const { nanoid } = require("nanoid");
const { sendEmail } = require("../../helpers");

async function signUp(req, res) {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const avatarURL = gravatar.url(email);
  const verificationToken = nanoid();
  const newUser = new User({
    email,
    subscription,
    avatarURL,
    verificationToken,
  });
  newUser.setPassword(password);
  await newUser.save();
  const mail = {
    to: email,
    subject: "Подтверждениу email",
    html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationToken}">Нажмите для подтверждения email</a>`,
  };
  await sendEmail(mail);
  //   const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  //   const result = await User.create({
  //     password: hashPassword,
  //     email,
  //     subscription,
  //   });
  res.status(201).json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        password,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
}

module.exports = signUp;
