const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require("./db/db");
const path = require('path');

const app = express();

app.use(cors({
  origin: ["https://colletteap.github.io", "https://growthnl.onrender.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const port = process.env.PORT || 3306;

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillRoutes");
const adviceLandingRoutes = require("./routes/adviceLandingRoutes");
const blogLandingRoutes = require("./routes/blogLandingRoutes");

app.get('/', (req, res) => {
    res.redirect('https://colletteap.github.io/growth/');
});

app.use(express.urlencoded({ extended: false }));

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", skillRoutes);
app.use("/", adviceLandingRoutes);
app.use("/", blogLandingRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/images', express.static(path.join(__dirname, 'images')));

// Connect to the database
(async () => {
    try {
        const pool = await connectDB();
        console.log('Database connected successfully:', pool);

        if (process.env.NODE_ENV !== 'test') {
            app.listen(port, () => {
                console.log(`Server running on port ${port}`);
            });
        }
    } catch (err) {
        console.error('Failed to connect to the database. Exiting...', err);
        process.exit(1); 
    }
})();

// Export the app for testing
module.exports = app;
