const { checkRecordExists, updateRecord } = require("../utils/sqlFunctions");

const updateProfile = async (req, res) => {
  try {
    const profile = await checkRecordExists(
      "users",
      "userId",
      req.user.userId
    );

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    const updates = {
      title: req.body.title || profile.title,
      bio: req.body.bio || profile.bio,
      ...req.body,
    };


    await updateRecord("users", updates, "userId", user.userId);
    res.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const jwt = require("jsonwebtoken");

const getUserData = async (req, res) => {
  try {
    const profile = await checkRecordExists("users", "userId", req.user.userId);

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    // Respond with the user's profile data
    res.status(200).json({
      userId: profile.userId,
      firstName: profile.firstName,
      email: profile.email,
      title: profile.title,
      bio: profile.bio,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateProfile,
  getUserData, 
};
