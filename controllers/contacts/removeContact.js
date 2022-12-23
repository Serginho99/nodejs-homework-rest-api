const { NotFound } = require("http-errors");
const { Contact } = require("../../models/contact");

async function removeContact(req, res) {
  const { _id } = req.user;
  const { contactId } = req.params;
  const result = await Contact.findOneAndDelete({ _id: contactId, owner: _id });
  if (!result) {
    throw new NotFound();
  }
  res.json({
    status: "success",
    code: 200,
    message: "contact deleted",
    data: {
      result,
    },
  });
}

module.exports = removeContact;
