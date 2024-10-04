const express = require("express");
const mathRouter = require('./routes/math.route');

const app = express();

app.use(express.json());
app.use('/math', mathRouter);

app.get("/", function (req, res) {
  console.log("Request 2");
  res.send("Failure");
});

app.get('/user/:username', (req, res) => {
    const params = req.params;
    console.log(params);
    res.send(params.username)
})

app.get("/hello", function (req, res) {
  console.log("Hello World");
  res.sendStatus(201);
});

app.get("/data", function (req, res) {
  res.json([9, 38, 329, 49848]);
});

app.post("/new", function (req, res) {
  const incoming = req.body;
  console.log("Recieved ", incoming);
  res.sendStatus(200);
});



const PORT = 5500;

app.listen(PORT, function () {
  console.log(`Server is running on port: ${PORT}`);
});
