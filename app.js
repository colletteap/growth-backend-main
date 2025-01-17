const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require("./db/db");
const path = require('path');

const app = express();

app.use(cors({
  origin: ["https://colletteap.github.io", "https://growthnl.com"],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.use(express.json());

const port = process.env.PORT || 80;

app.get('/health', (req, res) => {
    res.status(200).send('OK'); // Simple response for health checks on target groups load balancer
});

app.get('/', (req, res) => {
    res.redirect('https://colletteap.github.io/growth/');
});

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
