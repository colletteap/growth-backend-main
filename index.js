const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require("./db/db");

const app = express();
app.use(cors());
app.use(express.json());
const path = require('path');

const port = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
const skillRoutes = require("./routes/skillRoutes");
const adviceLandingRoutes = require("./routes/adviceLandingRoutes");
const blogLandingRoutes = require("./routes/blogLandingRoutes");

app.use(express.urlencoded({ extended: false }));

app.use("/", authRoutes);
app.use("/", profileRoutes);
app.use("/", skillRoutes);
app.use("/", adviceLandingRoutes);
app.use("/", blogLandingRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to the database
connectDB().then(pool => {
    console.log('Database connected successfully');

    if (process.env.NODE_ENV !== 'test') {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    }
}).catch(err => {
    console.error('Failed to connect to the database. Exiting...', err);
    process.exit(1); 
});

// Export the app for testing
module.exports = app;
