const mongoose = require('mongoose');

const express=require("express")
const app=express();
const path=require("path")

const methodOverride = require('method-override')

const chats=require("./models/chats");
const Chat = require('./models/chats');

app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('X-HTTP-Method-Override'))

main().then(
    ()=>{
        console.log("success")
    }
)
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chats');
}

// let chat1= new chats({
//     from:"neha",
//     to:"riya",
//     message:"BKL",
//     at:Date.now()
// })

// chat1.save().then((res)=>{
//     console.log(res)
// })


app.listen(8080,()=>{
    console.log("Working in port 8080")
})

app.get("/",(req,res)=>{
    res.send("working fine home dir")
})

app.get("/chats",async (req,res)=>{
    let chat=await chats.find();
    res.render("index.ejs",{chat})
})

app.get("/chats/new",(req,res)=>{
    res.render("newChat.ejs");
    res.redirect("/chats")
})

app.post("/chats",async (req,res)=>{
    let {from, to, message}=req.body;
    let newChat=new Chat({
        from:from,
        to:to,
        message:message,
        at:new Date()
    })
    await newChat.save();
    res.redirect("/chats")
})


app.get("/chats/:id/edit",async (req,res)=>{
    let{id}=req.params
    let mes= await chats.findById(id)
    console.log(mes)
    res.render("edit.ejs",{mes})
})

app.post("/chats/:id", async(req,res)=>{
    let {id}= req.params
    let {message:newmessage}=req.body
    // console.log(newmessage)

    let newchat=await Chat.findByIdAndUpdate(id,{message:newmessage},{new:true},{runValidators:true})
    // console.log(newchat)
    res.redirect("/chats")

})

app.post("/chats/:id/rem",async (req,res)=>{
    let {id}=req.params
    let newchat=await Chat.findByIdAndDelete(id)
    console.log(newchat)
    res.redirect("/chats")
})
