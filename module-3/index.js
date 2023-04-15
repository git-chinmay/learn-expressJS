//// SESSIONS /////

/*
What the above code does is, when a user visits the site, 
it creates a new session for the user and assigns them a cookie. 
Next time the user comes, the cookie is checked and the page_view session variable is updated accordingly.
*/

// const express = require('express');
// const cookieParser = require('cookie-parser');
// const session = require('express-session');

// var app = express();

// app.use(cookieParser());
// app.use(session({secret: "Shh, its a secret!"}));

// app.get('/', (req, res)=>{
//    if(req.session.page_views){
//       req.session.page_views++;
//       res.send("You visited this page " + req.session.page_views + " times");
//    } else {
//       req.session.page_views = 1;
//       res.send("Welcome to this page for the first time!");
//    }
// });
// app.listen(3000, ()=>{
//     console.log("Server is listening on port 3000.");
// });




//// AUHENTICATION ////
/*
To create an authentication system, we will need to create a sign up page and a user-password store. 
The following code creates an account for us and stores it in memory. 
This is just for the purpose of demo; it is recommended that a persistent storage (database or files) 
is always used to store user information.

https://www.tutorialspoint.com/expressjs/expressjs_authentication.htm

*/

const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const hbs = require('handlebars');

const app = express();
const upload = multer();


app.set('view engine', 'hbs');
app.set('views','./views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); 
app.use(upload.array());
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));

var Users = [];

app.get('/signup', (req, res)=>{
   res.render('signup');
});


//Signing up a new user
app.post('/signup', (req, res)=>{
    if(!req.body.id || !req.body.password){
       res.status("400").send("Invalid details!");
    } else {
       Users.filter((user)=>{
          if(user.id === req.body.id){
             res.render('signup', {
                message: "User Already Exists! Login or choose another user id"});
          }
       });
       const newUser = {id: req.body.id, password: req.body.password};
       Users.push(newUser);
       req.session.user = newUser;
       res.redirect('/protected_page');
    }
 });


 const checkSignIn = (req, res, next) => {
    if(req.session.user){
       next();     //If session exists, proceed to page
    } else {
       const err = new Error("Not logged in!");
       console.log(req.session.user);
       next(err);  //Error, trying to access unauthorized page!
    }
 }

app.get('/protected_page', checkSignIn, (req, res)=>{
    res.render('protected_page', {id: req.session.user.id})
});


app.get('/login', (req, res)=>{
    res.render('login');
});


// Login existing user
app.post('/login', (req, res)=>{
    console.log(Users);
    if(!req.body.id || !req.body.password){
       res.render('login', {message: "Please enter both id and password"});
    } else {
       Users.filter((user)=>{
          if(user.id === req.body.id && user.password === req.body.password){
             req.session.user = user;
             res.redirect('/protected_page');
          }
       });
       res.render('login', {message: "Invalid credentials!"});
    }
});


// Logout
app.get('/logout', (req, res)=>{
    req.session.destroy(()=>{
       console.log("user logged out.")
    });
    res.redirect('/login');
 });


app.use('/protected_page', (err, req, res, next)=>{
    console.log(err);
       //User should be authenticated! Redirect him to log in.
       res.redirect('/login');
});


app.listen(3000,()=>{
    console.log("Server listening on 3000");
 })


/*
We have created a middleware function checkSignIn to check if the user is signed in. 
The protected_page uses this function. To log the user out, we destroy the session.
*/