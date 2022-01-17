const express = require("express");
const router = express.Router();
const albumsController = require("../controllers/albumController");

// router.get("/albums", (req, res) => res.send("Post request received"));
router.route("/albums").get(albumsController.getAll);

module.exports = router;
