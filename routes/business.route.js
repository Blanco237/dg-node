const express = require('express');
const router = express.Router();
const { business } = require("../models")

router.post('/new', async (req, res) => {
    const dets = req.body;

    const newUser = await business.create(dets)

    res.status(201).send(newUser.id);
})

router.get('/', async (req, res) => {
    const allbusiness = await business.findAll();

    res.json(allbusiness)
})


router.get('/:id', async (req, res) => {
    const params = req.params;

    const business = await business.findByPk(params.id);

    res.json(business);
})

module.exports = router;