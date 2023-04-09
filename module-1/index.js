const express = require('express');
const thing = require('./things')

const app = express();
const port = 3005;


//both index.js and things.js should be in same directory
//app.set('/things', thing); //not working for some reason




app.get('/:id/:name', (req, res)=>{
    //res.send(req);
    res.send(`Hello: ${req.params.id} : ${req.params.name}`)
})

app.get('*', (req, res)=>{
    res.send('Sorry, this is an invalid URL.');
 });

app.listen(port, ()=>{
    console.log(`Server listening on ${port}`);
});