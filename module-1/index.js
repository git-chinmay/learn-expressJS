const express = require('express');
const thing = require('./things')
const hbs = require('hbs');

const app = express();
const port = 3005;


//both index.js and things.js should be in same directory
//app.set('/things', thing); //not working for some reason


// app.get('/:id/:name', (req, res)=>{
//     //res.send(req);
//     res.send(`Hello: ${req.params.id} : ${req.params.name}`)
// })

// app.get('*', (req, res)=>{
//     res.send('Sorry, this is an invalid URL.');
//  });

// app.listen(port, ()=>{
//     console.log(`Server listening on ${port}`);
// });


// MIDDLEWARE //

// //1st MW before the route handle
// app.use((req, res, next)=>{
//     console.log("Start.")
//     next();
// })

// //Route handle
// app.get("/", (req, res, next)=>{
//     res.send("Middle");
//     next();
// })

// //Last MW after the route
// app.use("/", (req, res)=>{
//     console.log("End");
// })


// app.listen(port, ()=>{
//     console.log(`Server listening on ${port}`);
// });


/// TEMPLATING ENGINE ///
// Add templating engine in app
// app.set('view engine', 'pug')
// app.set('views', './views')
// app.set('view engine', 'hbs')
// app.set('views', './views')


// /// SERVING STATIC FILES ///
// app.use(express.static('./public'));


// app.get("/", (req, res)=>{
//     res.render('index')
// })


// app.listen(port, ()=>{
//     console.log(`Server listening on ${port}`);
// });



/// FORM DATA ///
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();


app.set('view engine', 'hbs');
app.set('views', './views');


// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-urlencoded
app.use(bodyParser.urlencoded({ extended: true })); 

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('./public'));

app.get('/', (req, res)=>{
   res.render('form');
});

app.post('/', (req, res)=>{
    console.log(`req: ${req}`)
   console.log(req.body);
   res.send("recieved your request!");
});


app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
});

/*
The req.body object contains your parsed request body. 
To use fields from that object, just use them like normal JS objects.
This is the most recommended way to send a request. 
*/