const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
let heroes = [];
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(
    cors({
        cors:"*"
    })
)
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"/public")));
fs.readFile("./server/db.json","utf8",(e,data)=>{
    let dataFormatted= JSON.parse(data);
    heroes =  dataFormatted.heroes[0];
});

app.listen(2000,()=>{
    
});

app.get("/heroes",(req,res)=>{
  res.send(heroes);
});

app.put("/heroes/:id",(req,res)=>{
   console.log("body",req.body);
   const id = req.body.id;
   
   const hero = heroes.find(h => h._id === id);
   if(hero){
    //hero.name=req.body.name;
    console.log("HERO:",hero);
    hero.name = req.body.name;
    hero.armor = req.body.armor;
    hero.health = req.body.health;
    hero.damage = req.body.damage;
   //addHero(hero);
   }
  

});

app.delete("/heroes/:id",(req,res)=>{
    const id = req.params.id;
    let he;
    heroes.forEach(hero => {
        he = hero.filter(h => h._id === id);
    });
    res.send(he);
});

app.post("/heroes",(req,res)=>{
   const s = {text:req.body.text};
   res.send(s);
});

app.post("/create",(req,res)=>{
  const details = getHeroDetails(req);
  console.log("Det",details);
  console.log("req is",req.body);
  res.send(details);
});


function getHeroDetails(req){
    heroDetails = {
        name:req.body.name,
        armor:req.body.armor,
        health:req.body.health,
        damage:req.body.damage
    };
   
    return heroDetails;
}

function addHero(hero){
  
   fs.appendFile("./server/db.json",JSON.stringify(hero),()=>{

   })
   
}
