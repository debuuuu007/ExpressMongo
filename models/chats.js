const mongoose = require('mongoose');

const ChatSchema=new mongoose.Schema({
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    message:{
        type:String,
        maxlengh:30,
        
    },
    at:{
        type:Date,
        required:true
    }
});

const Chat=mongoose.model("Chat",ChatSchema);

module.exports=Chat;