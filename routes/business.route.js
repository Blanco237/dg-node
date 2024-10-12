const express = require("express");
const router = express.Router();
const {
  business,
  services,
  appointments,
  payments,
  reviews,
} = require("../models");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.send("Welcome to Business");
});

router.post("/new", async (req, res) => {
  const dets = req.body;

  const biz = await business.create(dets);

  res.status(201).send(biz.id);
});

router.get("/all", async (req, res) => {
  const allbusiness = await business.findAll();

  res.json(allbusiness);
});

router.get("/data-count", async (req, res) => {
  const biz = req.headers.biz;
  const { id } = JSON.parse(biz);

  const { count: serviceCount } = await services.findAndCountAll({
    where: { businessId: id },
  });
  const { count: apptCount } = await appointments.findAndCountAll({
    where: { businessId: id },
  });
  const { count: paymentCount } = await payments.findAndCountAll({
    where: { businessId: id },
  });
  const { count: reviewCount } = await reviews.findAndCountAll({
    where: { businessId: id },
  });

  const data = {
    services: serviceCount,
    appointments: apptCount,
    payments: paymentCount,
    reviews: reviewCount,
  };

  res.json(data);
});

router.get("/services", async (req, res) => {
  const biz = req.headers.biz;
  const { id } = JSON.parse(biz);

  const servs = await services.findAll(({
    where: {
      businessId: id
    }
  }))

  res.json(servs);
})

router.delete("/services/:id", async (req, res) => {
  const id = req.params.id;

  await services.destroy({
    where: {
      id: id
    }
  })

  res.sendStatus(203);
})

router.get("/:id", async (req, res) => {
  const params = req.params;

  const biz = await business.findByPk(params.id, {
    include: services,
  });

  res.json(biz);
});

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

router.post("/service/create", async (req, res) => {
  try {
    const serviceDets = req.body;

    await services.create(serviceDets);

    res.sendStatus(201);
  } catch {
    res.status(500).send("An Error Occured");
  }
});



module.exports = router;
