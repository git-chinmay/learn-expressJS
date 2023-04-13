/*
PREREQUSITES:
- Install mongodb and start it
- Run compass 
- Create a test db
*/

const mongoose = require('mongoose');
const express = require('express');
const hbs = require('handlebars')
const bodyParser = require('body-parser');

//Make sure mongodb engine is up and running in your terminal
mongoose.connect('mongodb://127.0.0.1:27017/my-db-cts');


//Setting up the app
const app = express();
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 

const port = 3005;


//Create schema
const personSchema = mongoose.Schema({
    name:String,
    age:Number,
    nationality:String
})

//Create Model
const Person = mongoose.model("Person", personSchema);

app.get('/person', (req, res)=>{
    res.render('person');
 });


app.post('/person', async (req, res)=>{
    var personInfo = req.body; //Get the parsed information
    console.log(req);
    if(!personInfo.name || !personInfo.age || !personInfo.nationality){
       res.render('show_message', {
          message: "Sorry, you provided worng info", type: "error"});
    } 
    else {
       var newPerson = new Person({
          name: personInfo.name,
          age: personInfo.age,
          nationality: personInfo.nationality
       });
         
       // Saving the document in db
        try{
            await newPerson.save();
            res.render('show_message', {message: "New person added", type: "success", person: personInfo});
        }
        catch{
            res.render('show_message', {message: "Database error", type: "error"});
        }
    }
    
});

app.listen(port, ()=>{
    console.log(`Server listenong on port ${port}`);
})

