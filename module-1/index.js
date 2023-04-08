const express = require('express');
const things = require('./things.js')

const app = express();

//var things = require('./things.js');

//both index.js and things.js should be in same directory
app.use('/things', things);

app.listen(3000, ()=>{
    console.log("Server listening on 3000.");
});