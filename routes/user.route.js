const express = require("express");
const router = express.Router();
const { users } = require("../models");
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
  res.send("Welcome to Users");
});

router.post("/many", async (req, res) => {
  const bulkUsers = req.body;

  await users.createBulk(bulkUsers);

  res.sendStatus(201);
});

router.post("/new", async (req, res) => {
  const userDetails = req.body;

  const newUser = await users.create(userDetails);

  res.status(201).send(newUser.id);
});

router.get("/all", async (req, res) => {
  const allUsers = await users.findAll();

  res.json(allUsers);
});

router.get("/:id", async (req, res) => {
  const params = req.params;

  const user = await users.findByPk(params.id);

  res.json(user);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  await users.update(data, {
    where: {
      id: id,
    },
  });

  res.sendStatus(204);
});

router.post("/register", async (req, res) => {
  const userDetails = req.body;
  const password = userDetails.password;

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);

  userDetails.password = hashPassword;


  const newUser = await users.create(userDetails);

  res.status(201).send(newUser.id);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const userDetails = await users.findOne({
    where: {
      email: email,
    },
  });

  if (userDetails === null) {
    res.status(400).send("User does not exist");
    return;
  }


  const match = await bcrypt.compare(password, userDetails.password);
  if (match) {
    res.status(200).json(userDetails);
  } else {
    res.status(400).send("Invalid Password");
  }
});

module.exports = router;
