const jwt = require("jsonwebtoken");
const { checkRecordExists } = require("../utils/sqlFunctions");

const requiresAuth = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer")) {
    console.error("No authorization header or incorrect format");
    return res.status(401).json({ error: "Not authorized, no token" });
  }

  try {
    const token = authorizationHeader.split(" ")[1];

    if (!token) {
      console.error("No token found after Bearer");
      return res.status(401).json({ error: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.userId) {
      console.error("Invalid token or no userId in token");
      return res.status(401).json({ error: "Invalid token" });
    }

    const userExists = await checkRecordExists("users", "userId", decoded.userId);

    if (!userExists) {
      console.error("User not found in the database");
      return res.status(404).json({ error: "User not found" });
    }

    // Attach only the userId to req.user
    req.user = { userId: decoded.userId };

    next();
  } catch (error) {
    console.error("Token verification failed:", error.message);
    return res.status(401).json({ error: "Token verification failed" });
  }
};

module.exports = { requiresAuth };