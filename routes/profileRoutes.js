const express = require("express");
const router = express.Router();

const { updateProfile, getUserData } = require("../controller/profileControllers");
const { requiresAuth } = require("../middlewares/authMiddleware");

router.get("/profile", requiresAuth, getUserData); 
router.put("/profile", requiresAuth, updateProfile); 

module.exports = router;