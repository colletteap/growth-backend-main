const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");

const { updateProfile } = require("../controller/profileControllers");
const { requiresAuth } = require("../middlewares/authMiddleware");

router.put(
  "/update_profile",
  requiresAuth,
  upload.single("image"),
  updateProfile
);

module.exports = router;