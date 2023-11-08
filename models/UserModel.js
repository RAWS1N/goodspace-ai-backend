const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({
    name : {type:String},
    email : {type:String},
    password : String,
    messages : [{type:Object}]
})


const User = mongoose.model("User",UserSchema)
module.exports = User