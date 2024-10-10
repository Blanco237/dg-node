const express = require('express');
const router = express.Router();
const { business } = require("../models")
const bcrypt = require('bcrypt');


router.get('/', (req, res) => {
    res.send("Welcome to Business")
})

router.post('/new', async (req, res) => {
    const dets = req.body;

    const biz = await business.create(dets)

    res.status(201).send(biz.id);
})

router.get('/all', async (req, res) => {
    const allbusiness = await business.findAll();

    res.json(allbusiness)
})


router.get('/:id', async (req, res) => {
    const params = req.params;

    const business = await business.findByPk(params.id);

    res.json(business);
})

router.post("/register", async (req, res) => {
    const busDetails = req.body;
    const password = busDetails.password;
  
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
  
    busDetails.password = hashPassword;
  
  
    const newBus = await business.create(busDetails);
  
    res.status(201).send(newBus.id);
  });
  
  router.post("/login", async (req, res) => {
    const { email, password } = req.body;
  
    const busDetails = await business.findOne({
      where: {
        email: email,
      },
    });
  
    if (busDetails === null) {
      res.status(400).send("User does not exist");
      return;
    }
  
    const match = await bcrypt.compare(password, busDetails.password);
    if (match) {
      res.status(200).json(busDetails);
    } else {
      res.status(400).send("Invalid Password");
    }
  });
  

module.exports = router;