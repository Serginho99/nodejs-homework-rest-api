const { BadRequest } = require("http-errors");

const { Contact } = require("../../models/contact");

async function updateFavorite(req, res) {
  const { _id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, owner: _id },
    req.body,
    {
      new: true,
    }
  );
  if (!result) {
    throw new BadRequest("missing fields");
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
}

module.exports = updateFavorite;
