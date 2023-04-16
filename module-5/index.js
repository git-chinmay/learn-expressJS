const express = require('express');
const app = express();

app.get("/", (res, req)=>{
    const err = new Error("New custom error");
    next(err); //sends the error to error cathing mw function
})

/*
Let's consider here we have bunch of other routes for application
*/

//Our Mw error handeling
// Ctach the error sent by above '/' route
app.use((err, req, res, next)=>{
    console.log(`Error received ${err}`);
    res.status(500).send("MW function detected an error.");
})

app.listen(3000);