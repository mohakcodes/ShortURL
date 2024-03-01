const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const dotenv = require("dotenv");
const cors = require("cors");
const app = express();

const urlRouter = require('./routes/url');
const authRouter = require('./routes/auth');

//middleware
dotenv.config();
app.use(express.json());
app.use(cors({origin: `${process.env.ORIGIN}`, credentials: true}))
app.use(cookieParser());

app.use('/url', urlRouter);
app.use("/auth" , authRouter);

const port = process.env.PORT || 3001;

app.get('/' , (req,res)=>{
    res.send('<h1>Check</h1>')
})

//function
const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database is Connected Successfully!")
    } catch (err) {
        console.log(err);
    }
}

//run on port
app.listen(port, ()=>{
    connectDB();
    console.log(`Server is running on ${port}`);
})