const PORT = 5500;
const express = require("express");
const cors = require('cors');
const app = express();
const db = require("./models");
const userRouter = require("./routes/user.route");
const bizRouter = require("./routes/business.route");

app.use(express.json());
app.use(cors());

app.use("/users", userRouter);
app.use("/business", bizRouter);

db.sequelize.sync().then(() => {
  console.log("Database Connected");

  app.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT}`);
  });
});
