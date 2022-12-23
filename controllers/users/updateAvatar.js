const { User } = require("../../models/user");

const path = require("path");
const fs = require("fs/promises");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

async function updateAvatar(req, res) {
  const { path: tempUpload, originalname } = req.file;
  const { _id: id } = req.user;
  const newAvatarName = `${id}_${originalname}`;
  try {
    const resultUpload = path.join(avatarsDir, newAvatarName);
    await fs.rename(tempUpload, resultUpload);
    const avatarUrl = path.join("public", "avatars", newAvatarName);
    await User.findByIdAndUpdate(req.user._id, { avatarUrl });
    res.json({
      status: "success",
      code: 200,
      data: {
        avatarUrl,
      },
    });
  } catch (error) {
    await fs.unlink(tempUpload);
    throw error;
  }
}

module.exports = updateAvatar;
