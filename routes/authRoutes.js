const express = require("express");
const { register, login } = require("../controller/authControllers");
const { updateProfile }= require("../controller/profileControllers");
const { requiresAuth } = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/profile", requiresAuth, updateProfile);

module.exports = router;