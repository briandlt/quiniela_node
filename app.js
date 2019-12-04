const express = require('express');
const pug = require('pug');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) =>{
    res.render("index");
});

app.listen(8080, () =>{
    console.log("Server on port 8080");
});