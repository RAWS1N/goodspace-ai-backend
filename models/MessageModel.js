const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    user : {type:mongoose.Schema.Types.ObjectId,ref:"User"},
    role:String,
    message : String,
    response : String
},{timestamps:true})


const Message = mongoose.model("Message",MessageSchema)
module.exports = Message