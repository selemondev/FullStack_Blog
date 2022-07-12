const path = require("path");
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
app.use("/api/user", userRoute);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
    app.get('*', (req, res) =>
      res.sendFile(
        path.resolve(__dirname, '../', 'frontend', 'dist', 'index.html')
      )
    );
  } else {
    app.get('/', (req, res) => res.send('Please set to production'));
};
app.use(errorMiddleware);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
