const express = require("express");
const router = express.Router();

const { updateProfile, getUserData } = require("../controller/profileControllers");
const { requiresAuth } = require("../middlewares/authMiddleware");

router.put(
  "/profile",
  requiresAuth,
  updateProfile
);

router.get("/profile/:userId", requiresAuth, getUserData);

module.exports = router;