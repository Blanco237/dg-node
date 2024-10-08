const express = require('express');
const router = express.Router();
const { business } = require("../models")

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

module.exports = router;