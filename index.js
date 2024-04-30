const mongoose = require('mongoose');

const express=require("express")
const app=express();
const path=require("path")

app.set("view engine", "ejs")
app.set("views",path.join(__dirname,"views"))

app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}))

main().then(
    ()=>{
        console.log("success")
    }
)
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/chats');
}

app.listen(8080,()=>{
    console.log("Working in port 8080")
})

app.get("/",(req,res)=>{
    res.send("working fine home dir")
})

