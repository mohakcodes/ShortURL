const mongoose = require('mongoose');

const {Schema} = mongoose;

const urlSchema = new Schema({
    shortId:{
        type:String,
        required:true,
        unique:true,
    },
    longUrl:{
        type:String,
        required:true,
    },
    visitHistory:[
        {timestamp:{type:String}}
    ],
    ownerId:{
        type:String,
    }
},{timestamps:true})

const URL = mongoose.model('url',urlSchema);
module.exports = URL;