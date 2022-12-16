const { User } = require("../../models/user");
const { Conflict } = require("http-errors");
const gravatar = require("gravatar");
// const bcrypt = require("bcryptjs");

async function signUp(req, res) {
  const { password, email, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`User with ${email} already exist`);
  }
  const avatarUrl = gravatar.url(email);
  const newUser = new User({ email, subscription, avatarUrl });
  newUser.setPassword(password);
  newUser.save();
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
        avatarUrl,
      },
    },
  });
}

module.exports = signUp;
