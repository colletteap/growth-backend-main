const { v4: uuidv4 } = require("uuid");
const jwt = require("jsonwebtoken");
const userSchema = require("../schemas/userSchema");
const bcrypt = require("bcryptjs");
const {
  createTable,
  checkRecordExists,
  insertRecord,
} = require("../utils/sqlFunctions");

const generateAccessToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
};

const insertToken = async (userId, token) => {
  try {
    const pool = await connectDB();
    pool.query(
      'INSERT INTO tokens (user_id, token) VALUES (?, ?)',
      [userId, token],
      (err, results) => {
        if (err) {
          console.error('Error inserting token:', err);
          throw err;
        }
        console.log('Refresh token inserted successfully:', results.insertId);
      }
    );
  } catch (error) {
    console.error('Database error:', error);
  }
};

const register = async (req, res) => {
  const { email, password, firstName, username } = req.body;
  if (!email || !password || !username || !firstName) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = {
    userId: uuidv4(),
    email,
    password: hashedPassword,
    firstName,
    username,
  };
  try {
    await createTable(userSchema);
    const userAlreadyExists = await checkRecordExists("users", "email", email);
    if (userAlreadyExists) {
      res.status(409).json({ error: "Email already exists" });
    } else {
      await insertRecord("users", user);
      res.status(201).json({ message: "User created successfully!" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res
      .status(400)
      .json({ error: "Email or Password fields cannot be empty!" });
    return;
  }

  try {
    const existingUser = await checkRecordExists("users", "email", email);

    if (existingUser) {
      if (!existingUser.password) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const passwordMatch = await bcrypt.compare(
        password,
        existingUser.password
      );

      if (passwordMatch) {

        const accessToken = generateAccessToken(existingUser.userId);
        const refreshToken = generateRefreshToken(existingUser.userId);
    
        await insertToken(existingUser.userId, refreshToken);

        res.status(200).json({
          userId: existingUser.userId,
          email: existingUser.email,
          firstName: existingUser.firstName,
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      } else {
        res.status(401).json({ error: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteToken = async (token) => {
  try {
    const pool = await connectDB();
    pool.query(
      'DELETE FROM tokens WHERE token = ?',
      [token],
      (err, results) => {
        if (err) {
          console.error('Error deleting token:', err);
          throw err;
        }
        console.log('Token deleted successfully:', results.affectedRows);
      }
    );
  } catch (error) {
    console.error('Database error:', error);
  }
};

const logout = async (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(400).json({ error: "No token provided!" });
  }

  try {
    
    await deleteToken(token);
    
    res.status(200).json({ message: "Logout successful" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



module.exports = {
  register,
  login,
  logout,
};