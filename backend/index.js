const express = require('express');
const app = express();
const cors = require('cors');
const { connectDB } = require('./config/db');
require('dotenv').config();

app.use(cors());
app.use(express.json());

const userRoute = require("./routes/userRoutes")
const courseRoutes = require('./routes/courseRouter');
const enrollRoute = require("./routes/EnrollRoutes")

connectDB();
  
app.use("/auth" , userRoute)
app.use('/api', courseRoutes);
app.use("/enroll",enrollRoute)

const PORT = process.env.PORT || 8080;

app.listen(PORT , ()=>{
    console.log(`Server is listening at port ${PORT}`);
})