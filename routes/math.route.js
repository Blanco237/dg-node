const express = require("express");

const router = express.Router();

router.post("/add", (req, res) => {
  const data = req.body; // Recieve data

  const { x, y } = data; // Process data
  const result = x + y;

  res.send(String(result)); // Send response
});

router.post("/calculate", (req, res) => {
  const data = req.body;

  const { op, x, y } = data;

  let result = "";
  switch (op) {
    case "+":
      result = x + y;
      break;
    case "-":
      result = x - y;
      break;
    case "/":
      result = x / y;
      break;
    case "*":
      result = x * y;
      break;
    default:
      result = "Undefined Operation";
  }

  res.send(String(result));
});

module.exports = router;
