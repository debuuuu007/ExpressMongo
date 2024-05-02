const mongoose = require('mongoose');

const chats=require("./models/chats");

main().then(
    ()=>{
        console.log("success")
    }
)
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chats');
}

let allchats=[{
    from:"debu",
    to:"lebu",
    message:"Hellow world",
    at:new Date()
},
{
    from:"sourav",
    to:"ayan",
    message:"java is best",
    at:new Date()
},
{
    from:"john",
    to:"riya",
    message:"javalin throw",
    at:new Date()
}
]

chats.insertMany(allchats)