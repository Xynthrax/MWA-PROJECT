const mongoose = require("mongoose");
const album = mongoose.model(process.env.DB_ALBUMS_MODEL);

const getAll = (req, res) => {
  let { count, offset } = req?.query;

  if (!count) count = parseInt(process.env.DEFAULT_FIND_LIMIT);
  if (!offset) offset = parseInt(process.env.DEFAULT_FIND_OFFSET);
  const maxCount = parseInt(process.env.MAX_FIND_LIMIT);

  if (isNaN(offset) || isNaN(count)) {
    res
      .status(400)
      .json({ message: process.env.CONTROLLER_COUNT_OFFSET_INVALID_MSG });
    return;
  }

  console.log(offset, count);

  album
    .find()
    .skip(offset)
    .limit(count <= maxCount ? count : maxCount)
    .exec((err, albums) => {
      let status = 200;
      let message = albums;
      if (err) {
        status = 500;
        message = err;
      } else if (!albums) {
        status = 404;
        message = { message: process.env.CONTROLLER_ALBUM_NOT_FOUND_MSG };
      }
      res.status(status).json(message);
    });
};

const getOne = (req, res) => {
  const albumId = req?.params?.id;
  console.log(req?.params?.id);
  if (!mongoose.isValidObjectId(albumId)) {
    res.status(400).json({ message: process.env.CONTROLLER_ALBUM_ID_MSG });
    return;
  }

  album.findById(albumId).exec((err, album) => {
    let status = 200;
    let message = album;
    if (err) {
      status = 500;
      message = err;
    } else if (!album) {
      status = 404;
      message = { message: process.env.CONTROLLER_ALBUM_NOT_FOUND_MSG };
    }

    res.status(status).json(message);
  });
};

const addOne = (req, res) => {
  const { name, artist, price } = req?.body;

  console.log(name, artist, price);

  const alb = new album();

  alb.name = name;
  alb.artist = artist;
  alb.price = price;
  alb.songs = [];

  album.create(alb, (err, album) => {
    let status = 201;
    let message = album;

    if (err) {
      status = 500;
      message = err;
    }

    res.status(status).json(message);
  });
};

// const updateOne = (req, res) => {};

const deleteOne = (req, res) => {
  const id = req.params.id;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: process.env.CONTROLLER_ALBUM_ID_MSG });
    return;
  }

  album.deleteOne({ _id: id }).exec((err) => {
    let status = 200;
    let message = process.env.CONTROLLER_ALBUM_DELETED_SUCCESS;
    if (err) {
      status = 500;
      message = err;
    }
    res.status(status).json({ message: message });
  });
};

module.exports = {
  getAll,
  getOne,
  addOne,
  deleteOne,
};
