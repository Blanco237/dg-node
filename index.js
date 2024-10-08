const PORT = 5500;
const express = require("express");
const app = express();
const db = require("./models");
const userRouter = require("./routes/user.route");

app.use(express.json());

app.use("/users", userRouter);

db.sequelize.sync().then(() => {
  console.log("Database Connected");

  app.listen(PORT, function () {
    console.log(`Server is running on port: ${PORT}`);
  });
});
