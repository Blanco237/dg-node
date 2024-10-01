const express = require('express');

const app = express();

app.get('/', function (req, res) {
    console.log("Request 2");
    res.send("Failure")
})

app.get('/hello', function (req, res ) {
    console.log("Hello World");
    res.sendStatus(201);
})

app.get('/data', function (req, res ) {
    res.json([9,38,329,49848])
})

app.post('/new', function () {

})

const PORT = 5500;

app.listen(PORT,function () {
    console.log(`Server is running on port: ${PORT}`);
})