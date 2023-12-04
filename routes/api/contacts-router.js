import express from "express";

import contactsController from "../../controllers/contacts-controller.js";
import {
  authenticate,
  isEmptyBody,
  isEmptyBodyFavorite,
  isValidId,
} from "../../middlewares/index.js";
import { validateBody } from "../../decorators/index.js";
import {
  contactAddSchema,
  contactUpdateSchema,
  contactFavoriteSchema,
} from "../../schemas/contacts-schema.js";

const router = express.Router();

router.use(authenticate);

router.get("/", contactsController.getAllContacts);

router.get("/:id", isValidId, contactsController.getContactById);

router.post(
  "/",
  isEmptyBody,
  validateBody(contactAddSchema),
  contactsController.addContact
);

router.delete("/:id", isValidId, contactsController.deleteContactById);

router.put(
  "/:id",
  isValidId,
  isEmptyBody,
  validateBody(contactUpdateSchema),
  contactsController.updateContactById
);

router.patch(
  "/:id/favorite",
  isValidId,
  isEmptyBodyFavorite,
  validateBody(contactFavoriteSchema),
  contactsController.updateContactById
);
export default router;
