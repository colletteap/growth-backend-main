const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require("./db/db");
const path = require('path');

const app = express();

// const corsOptions = {
//     origin: (origin, callback) => {
//       if (process.env.NODE_ENV === 'development') {
//         callback(null, true); 
//       } else if (process.env.NODE_ENV === 'production') {
//         const allowedOrigins = [
//           'https://colletteap.github.io',
//           'http://growth.ca-central-1.elasticbeanstalk.com',
//         ];
//         if (allowedOrigins.includes(origin)) {
//           callback(null, true);
//         } else {
//           callback(new Error('Not allowed by CORS'));
//         }
//       }
//     },
//     credentials: true, 
//   };

// app.use(cors(corsOptions));     THIS CAUSES INTERNAL SERVER ERROR ON EB

app.use(cors({
  origin: ["https://colletteap.github.io, https://growthnl.com"]
}));
app.use(express.json());

const port = process.env.PORT || 80;

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
