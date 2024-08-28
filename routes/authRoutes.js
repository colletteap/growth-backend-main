const express = require("express");
const { register, login, logout } = require("../controller/authControllers");
const { updateProfile, getUserData }= require("../controller/profileControllers");
const { requiresAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", requiresAuth, updateProfile);
router.post("/logout", logout);

module.exports = router;