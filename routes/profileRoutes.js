const express = require("express");
const router = express.Router();
const multer = require('../utils/multer');

const { updateProfile, getUserData } = require("../controller/profileControllers");
const { requiresAuth } = require("../middlewares/authMiddleware");
const upload = require('../utils/multer');

router.get("/profile", requiresAuth, getUserData); 
router.put("/profile", requiresAuth, upload.single('profilePicture'), updateProfile); 

module.exports = router;