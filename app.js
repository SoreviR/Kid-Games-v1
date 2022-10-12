
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/GamesDB", {useNewUrlParser: true});


const gamesSchema = {
  title: String,
  age: Number,
  content: String
};

const Game = mongoose.model("Game", gamesSchema);


const game1 = new Game({
  title: "Game 1",
  age: 4,
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae nulla beatae labore qui. Quaerat laudantium consequuntur nam! Obcaecati harum corporis quibusdam ipsum id voluptates vero saepe quaerat neque quod, odit aspernatur sunt esse accusantium fugiat atque corrupti nam dicta adipisci optio. Ea, esse? Dolorum incidunt et nemo, maiores ducimus natus!"
});

const game2 = new Game({
  title: "Game 2",
  age: 6,
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae nulla beatae labore qui. Quaerat laudantium consequuntur nam! Obcaecati harum corporis quibusdam ipsum id voluptates vero saepe quaerat neque quod, odit aspernatur sunt esse accusantium fugiat atque corrupti nam dicta adipisci optio. Ea, esse? Dolorum incidunt et nemo, maiores ducimus natus!"
});

const game3 = new Game({
  title: "Game 3",
  age: 6,
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae nulla beatae labore qui. Quaerat laudantium consequuntur nam! Obcaecati harum corporis quibusdam ipsum id voluptates vero saepe quaerat neque quod, odit aspernatur sunt esse accusantium fugiat atque corrupti nam dicta adipisci optio. Ea, esse? Dolorum incidunt et nemo, maiores ducimus natus!"
});

const game4 = new Game({
  title: "Game 4",
  age: 6,
  content: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae nulla beatae labore qui. Quaerat laudantium consequuntur nam! Obcaecati harum corporis quibusdam ipsum id voluptates vero saepe quaerat neque quod, odit aspernatur sunt esse accusantium fugiat atque corrupti nam dicta adipisci optio. Ea, esse? Dolorum incidunt et nemo, maiores ducimus natus!"
});

let gamesList = [game1, game2, game3, game4];


app.get("/", function(req, res) {
  
  Game.find({}, function(err, foundGames){

    if (foundGames.length === 0){
      Game.insertMany(gamesList, function(err){
        if (err){
          console.log(err);
        }else{
          console.log("The items were iserted");
        }
      });
      res.redirect("/");

    }else{
      res.render("home", {newGame: foundGames});
    }
  });  
});




app.post("/", function(req, res){
  const age = req.body.button;
  

  if (age === "all"){
    res.redirect("/");

  }else if (age === "buttonOne"){
    Game.find({$or:[{age: 3}, {age:4}, {age:5}]}, function(err, foundGame){
      if (!err){
        
        res.render("home", {newGame: foundGame});
      };
    });

  }else if (age === "buttonTwo"){
    Game.find({$or:[{age: 6}, {age:7}, {age:8}]}, function(err, foundGame){
      if (!err){
        
        res.render("home", {newGame: foundGame});
      };
    });

  }else if (age === "buttonThree"){
    Game.find({$or:[{age: 9}, {age:10}, {age:11}]}, function(err, foundGame){
      if (!err){
        
        res.render("home", {newGame: foundGame});
      };
    });

  }else{
    Game.find({$or:[{age: 12}, {age:13}, {age:14}]}, function(err, foundGame){
      if (!err){
        
        res.render("home", {newGame: foundGame});
      };
    });
  }  
});

app.get("/:gameId", function(req, res){
  const requestedId = req.params.gameId;

  Game.findOne({_id:requestedId}, function(err, foundGame){

    if(!err){

      const storedId = foundGame.id;      

      if (storedId === requestedId) {
        res.render("game", {
          title: foundGame.title,
          age: foundGame.age,
          content: foundGame.content
        });
    }    
    }
  });
});

app.listen(3000, function(){
  console.log("Server started on port 3000.");
});

