const express = require("express");
const router = express.Router();
const albumsController = require("../controllers/albumController");
const songsController = require("../controllers/songController");

// router.get("/albums", (req, res) => res.send("Post request received"));
router
  .route("/albums")
  .get(albumsController.getAll)
  .post(albumsController.addOne);

router
  .route("/albums/:id")
  .get(albumsController.getOne)
  .post(albumsController.deleteOne);

router
  .route("/albums/:id/songs")
  .get(songsController.getAll)
  .post(songsController.addOne);

module.exports = router;
