const express = require("express");

const { contacts: ctrl } = require("../../controllers");

const {
  validation,
  ctrlWrapper,
  isValidId,
  auth,
} = require("../../middlewares");

const { schemas } = require("../../models/contact");

const validateMiddleware = validation(schemas.contactsSchema);

const router = express.Router();

router.get("/", auth, ctrlWrapper(ctrl.listContacts));

router.get("/:contactId", auth, isValidId, ctrlWrapper(ctrl.getContactById));

router.post("/", auth, validateMiddleware, ctrlWrapper(ctrl.addContact));

router.patch(
  "/:contactId/favorite",
  auth,
  isValidId,
  validation(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);

router.delete("/:contactId", auth, isValidId, ctrlWrapper(ctrl.removeContact));

router.put(
  "/:contactId",
  auth,
  isValidId,
  validateMiddleware,
  ctrlWrapper(ctrl.updateContact)
);

module.exports = router;
