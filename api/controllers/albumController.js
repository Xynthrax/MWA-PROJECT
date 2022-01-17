const mongoose = require("mongoose");

const getAll = (req, res) => {
  console.log("here");

  let count = parseInt(process.env.DEFAULT_FIND_LIMIT);
  let offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
  const maxCount = parseInt(process.env.MAX_FIND_LIMIT);

  res.status(200).json({ msg: "hello" });
};

module.exports = {
  getAll: getAll,
};
