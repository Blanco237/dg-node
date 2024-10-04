const express = require('express');
const router = express.Router();
const { users } = require("../models")

router.post('/new', async (req, res) => {
    const userDetails = req.body;

    const newUser = await users.create(userDetails)

    res.status(201).send(newUser.id);
})

router.get('/', async (req, res) => {
    const allUsers = await users.findAll();

    res.json(allUsers)
})


router.get('/:id', async (req, res) => {
    const params = req.params;

    const user = await users.findByPk(params.id);

    res.json(user);
})

module.exports = router;