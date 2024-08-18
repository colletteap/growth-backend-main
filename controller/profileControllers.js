const { checkRecordExists, updateRecord } = require("../utils/sqlFunctions");
const db = require ('../db/db.js');

const updateProfile = async (req, res) => {
  try {
    const profile = await checkRecordExists(
      "users",
      "userId",
      req.user.userId
    );

    const updates = {
      title: req.body.title || user.title,
      bio: req.body.bio || user.bio,
      ...req.body,
    };


    await updateRecord("users", updates, "userId", user.userId);
    res.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateProfile,
};