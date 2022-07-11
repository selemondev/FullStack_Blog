const express = require('express');
const cors = require('cors');
const dotenv = require("dotenv").config();
const colors = require('colors');
const PORT = process.env.PORT || 5000;
const { errorMiddleware } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoutes");
const blogRoute = require("./routes/blogRoutes");
const userRoute = require("./routes/userRoutes");
const app = express();
connectDB();
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cors());
app.use("/api/auth", authRoute);
app.use("/api/blog", blogRoute);    
app.use("/api/user", userRoute)
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
