/*
PREREQUSITES:
- Install mongodb and start it
- Run compass 
- Create a test db
*/

// const mongoose = require('mongoose');
// const express = require('express');
// const hbs = require('handlebars')
// const bodyParser = require('body-parser');

// //Make sure mongodb engine is up and running in your terminal
// mongoose.connect('mongodb://127.0.0.1:27017/my-db-cts');


// //Setting up the app
// const app = express();
// app.set('view engine', 'hbs');
// app.set('views', './views');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true })); 

// const port = 3005;


// //Create schema
// const personSchema = mongoose.Schema({
//     name:String,
//     age:Number,
//     nationality:String
// })

// //Create Model
// const Person = mongoose.model("Person", personSchema);

// app.get('/person', (req, res)=>{
//     res.render('person');
//  });


// app.post('/person', async (req, res)=>{
//     var personInfo = req.body; //Get the parsed information
//     console.log(req);
//     if(!personInfo.name || !personInfo.age || !personInfo.nationality){
//        res.render('show_message', {
//           message: "Sorry, you provided worng info", type: "error"});
//     } 
//     else {
//        var newPerson = new Person({
//           name: personInfo.name,
//           age: personInfo.age,
//           nationality: personInfo.nationality
//        });
         
//        // Saving the document in db
//         try{
//             await newPerson.save();
//             res.render('show_message', {message: "New person added", type: "success", person: personInfo});
//         }
//         catch{
//             res.render('show_message', {message: "Database error", type: "error"});
//         }
//     }
    
// });

// app.listen(port, ()=>{
//     console.log(`Server listenong on port ${port}`);
// })






/////////////////////
/// COOKIES ////////
////////////////////

const mongoose = require('mongoose');
const express = require('express');
const hbs = require('handlebars')
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');


//Setting up the app
const app = express();
app.set('view engine', 'hbs');
app.set('views', './views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(cookieParser());

const port = 3005;

app.get('/', (req, res)=>{
    console.log('Cookies: ', req.cookies);
    //res.cookie('name', 'express').send('cookie set'); //Sets name = express
    //res.cookie('name', 'express',{expire:2000+Date.now()}).send('cookie set with expire');
    res.clearCookie('express').send('express cooki deleted.'); // deleting the cookies
    console.log('Cookies: ', req.cookies);
    
});


app.listen(port, ()=>{
    console.log(`Server listenong on port ${port}`);
})

/*
To check if your cookie is set or not, just go to your browser, fire up the console, and enter −

console.log(document.cookie);
You will get the output like (you may have more cookies set maybe due to extensions in your browser) −

"name = express"

--> Refere image in reference_images folder

Each time we reresh the browser it sends back cookies along with the request body.
We can see hat by adding printing it in server side. console.log('Cookies: ', req.cookies);

*/



