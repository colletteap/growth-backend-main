const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const connectDB = require("./db/db");

const app = express();
const port = process.env.PORT || 3000;
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", authRoutes);

// Connect to the database
connectDB().then(pool => {
    console.log('Database connected successfully');

    // Start the server after successful database connection
    app.listen(port, () => {
        console.log(`Server running on port ${port}`);
    });
}).catch(err => {
    console.error('Failed to connect to the database. Exiting...', err);
    process.exit(1); // Exit the application if the database connection fails
});
