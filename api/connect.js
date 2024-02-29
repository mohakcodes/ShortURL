const mongoose = require("mongoose");

export const connectDB = async(url) => {
    return mongoose.connect(url);
}