const mongoose = require("mongoose");
require("./model");
mongoose.connect(process.env.DB_URL);

mongoose.connection.on("connected", function () {
  console.log("Mongoose connected to ", process.env.DB_NAME);
});

mongoose.connection.on("disconnected", function () {
  console.log("Mongoose disconnected");
});

mongoose.connection.on("err", function () {
  console.log("Mongoose connection error ", err);
});

process.on("SIGINT", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application disconnect");
    process.exit(0);
  });
});

process.on("SIGTERM", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application termination");
    process.exit(0);
  });
});

process.once("SIGUSR2", function () {
  mongoose.connection.close(function () {
    console.log("Mongoose disconnected by application restart");
    process.kill(process.pid, "SIGUSR2");
  });
});
