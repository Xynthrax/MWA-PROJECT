require("dotenv").config();
require("./api/model/database")
const express = require("express");
const app = express();
const routes = require("./api/routes/route");

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use("/api", routes);

app.listen(process.env, () =>
  console.log(`${process.env.SERVER_START_MSG} ${process.env.PORT}`)
);
