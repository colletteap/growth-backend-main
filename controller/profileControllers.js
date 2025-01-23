const { checkRecordExists, updateRecord, getRecordCount } = require("../utils/sqlFunctions");
const jwt = require("jsonwebtoken");

const updateProfile = async (req, res) => {
  try {
    console.log('Updating profile for user:', req.user.userId);
    console.log('Uploaded file:', req.file);
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
      yearsExperience: req.body.yearsExperience || profile.yearsExperience,
      education: req.body.education || profile.education,
      contactInfo: req.body.contactInfo || profile.contactInfo,
      favBooks: req.body.favBooks || profile.favBooks,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : profile.profilePicture,
    };


    await updateRecord("users", updates, "userId", req.user.userId);
    res.json({ message: "Profile Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    console.log("User ID:", req.user.userId);
    const profile = await checkRecordExists("users", "userId", req.user.userId);

    if (!profile) {
      return res.status(404).json({ error: "User not found" });
    }

    const skillsSharedCount = await getRecordCount("skillinfo", "userId", req.user.userId);
    const questionsAskedCount = await getRecordCount("askadvicecarddata", "userId", req.user.userId);
    const questionsAnsweredCount = await getRecordCount("comments", "userId", req.user.userId);

    const profilePictureUrl = profile.profilePicture
      ? `${req.protocol}://${req.get("host")}${profile.profilePicture}`
      : `${req.protocol}://${req.get("host")}/images/avatarplaceholder.png`;

    // Respond with the user's profile data
    res.status(200).json({
      userId: profile.userId,
      firstName: profile.firstName,
      email: profile.email,
      title: profile.title,
      skillsShared: skillsSharedCount,      
      questionsAsked: questionsAskedCount,   
      questionsAnswered: questionsAnsweredCount, 
      bio: profile.bio,
      yearsExperience: profile.yearsExperience,
      education: profile.education,
      contactInfo: profile.contactInfo,
      favBooks: profile.favBooks,
      profilePicture: profilePictureUrl,
    });
  } catch (error) {
    console.error("Error fetching profile data:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  updateProfile,
  getUserData, 
};
