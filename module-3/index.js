/*
What the above code does is, when a user visits the site, 
it creates a new session for the user and assigns them a cookie. 
Next time the user comes, the cookie is checked and the page_view session variable is updated accordingly.
*/

const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');

var app = express();

app.use(cookieParser());
app.use(session({secret: "Shh, its a secret!"}));

app.get('/', (req, res)=>{
   if(req.session.page_views){
      req.session.page_views++;
      res.send("You visited this page " + req.session.page_views + " times");
   } else {
      req.session.page_views = 1;
      res.send("Welcome to this page for the first time!");
   }
});
app.listen(3000, ()=>{
    console.log("Server is listening on port 3000.");
});


