const multer = require('multer');
const path = require('path');

// Configure storage for uploaded images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

// File filter for image types (jpg, png, etc.)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only .png, .jpg, and .jpeg format allowed!'), false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });

// Controller to handle profile update with image upload
const updateProfile = async (req, res) => {
  try {
    const profile = await checkRecordExists('users', 'userId', req.user.userId);

    if (!profile) {
      return res.status(404).json({ error: 'User not found' });
    }

    const updates = {
      title: req.body.title || profile.title,
      bio: req.body.bio || profile.bio,
      yearsExperience: req.body.yearsExperience || profile.yearsExperience,
      education: req.body.education || profile.education,
      contactInfo: req.body.contactInfo || profile.contactInfo,
      favBooks: req.body.favBooks || profile.favBooks,
      profileImage: req.file ? `/uploads/${req.file.filename}` : profile.profileImage, // Save image path
    };

    await updateRecord('users', updates, 'userId', req.user.userId);
    res.json({ message: 'Profile Updated Successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
