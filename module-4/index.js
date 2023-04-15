const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const cookieParser = require('cookie-parser');

//Require the Router we defined in movies.js
// const movies = require('./movies.js');

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());



//Use the Router on the sub route /movies
// app.use('/movies', movies);
// conneting bcz route is nt working for me

const movies = [
    {id: 101, name: "Fight Club", year: 1999, rating: 8.1},
    {id: 102, name: "Inception", year: 2010, rating: 8.7},
    {id: 103, name: "The Dark Knight", year: 2008, rating: 9},
    {id: 104, name: "12 Angry Men", year: 1957, rating: 8.9}
 ];


//Get all movies
app.get('/', (req, res)=>{
    res.json(movies);
 });

//route to get a specific movie by its id.
app.get('/:id([0-9]{3,})', function(req, res){
    var currMovie = movies.filter(function(movie){
       if(movie.id == req.params.id){
          return true;
       }
    });
    if(currMovie.length == 1){
       res.json(currMovie[0])
    } else {
       res.status(404);//Set status to 404 as movie was not found
       res.json({message: "Not Found"});
    }
 });


// ADD a Movie
app.post('/', (req, res)=>{
    //Check if all fields are provided and are valid:
    if(!req.body.name ||
       !req.body.year.toString().match(/^[0-9]{4}$/g) ||
       !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g)){
       
       res.status(400);
       res.json({message: "Bad Request"});
    } else {
       const newId = movies[movies.length-1].id+1;
       console.log(newId);
       movies.push({
          id: newId,
          name: req.body.name,
          year: req.body.year,
          rating: req.body.rating
       });
       res.json({message: "New movie created.", location: "/movies/" + newId});
    }
 });


// UPDATE a movie
app.put('/:id', (req, res)=>{
    //Check if all fields are provided and are valid:
    if(!req.body.name ||
       !req.body.year.toString().match(/^[0-9]{4}$/g) ||
       !req.body.rating.toString().match(/^[0-9]\.[0-9]$/g) ||
       !req.params.id.toString().match(/^[0-9]{3,}$/g)){
       
       res.status(400);
       res.json({message: "Bad Request"});
    } else {
       //Gets us the index of movie with given id.
       const updateIndex = movies.map((movie)=>{
          return movie.id;
       }).indexOf(parseInt(req.params.id));
       
       if(updateIndex === -1){
          //Movie not found, create new
          movies.push({
             id: req.params.id,
             name: req.body.name,
             year: req.body.year,
             rating: req.body.rating
          });
          res.json({message: "New movie created.", location: "/movies/" + req.params.id});
       } else {
          //Update existing movie
          movies[updateIndex] = {
             id: req.params.id,
             name: req.body.name,
             year: req.body.year,
             rating: req.body.rating
          };
          res.json({message: "Movie id " + req.params.id + " updated.", 
             location: "/movies/" + req.params.id});
       }
    }
 });


// DELETE a movie

app.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const removeIndex = movies.map((movie)=>{
       return movie.id;
    }).indexOf(Number(req.params.id)); //Gets us the index of movie with given id.

    if(removeIndex === -1){
       res.json({message: "Not found"});
    } else {
       movies.splice(removeIndex, 1);
       res.send({message: "Movie id " + req.params.id + " removed."});
    }


    // const filteredArray = movies.filter(movie => movie.id !== Number(req.params.id));
    // res.json(filteredArray);
});

app.listen(3000);