const express = require("express");
const router = express.Router();

const { updateProfile } = require("../controller/profileControllers");
const { requiresAuth } = require("../middlewares/authMiddleware");

router.put(
  "/profile",
  requiresAuth,
  updateProfile
);

module.exports = router;