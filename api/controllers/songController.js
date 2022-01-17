const mongoose = require("mongoose");
const album = mongoose.model(process.env.DB_ALBUMS_MODEL);

const getAll = (req, res) => {
  let albumId = req?.params?.id;
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
    .findById(albumId)
    .select("songs")
    .skip(offset)
    .limit(count <= maxCount ? count : maxCount)
    .exec((err, songs) => {
      let status = 200;
      let message = songs;
      if (err) {
        status = 500;
        message = err;
      } else if (!songs) {
        status = 404;
        message = { message: process.env.CONTROLLER_ALBUM_NOT_FOUND_MSG };
      }
      res.status(status).json(message);
    });
};

// const getOne = (req, res) => {
//   const albumId = req?.params?.id;
//   console.log(req?.params?.id);
//   if (!mongoose.isValidObjectId(albumId)) {
//     res.status(400).json({ message: process.env.CONTROLLER_ALBUM_ID_MSG });
//     return;
//   }

//   album.findById(albumId).exec((err, album) => {
//     let status = 200;
//     let message = album;
//     if (err) {
//       status = 500;
//       message = err;
//     } else if (!album) {
//       status = 404;
//       message = { message: process.env.CONTROLLER_ALBUM_NOT_FOUND_MSG };
//     }

//     res.status(status).json(message);
//   });
// };

const addSong = (req, res, album) => {
  const { title, genre } = req?.body;

  if (!title || !genre) {
    res
      .status(500)
      .json({ message: process.env.CONTROLLER_SONG_TITLE_GENRE_MISSING });
    return;
  }

  album.songs.push({
    title,
    genre,
  });

  album.save((err, updatedSong) => {
    let status = 201;
    let message = updatedSong;

    if (err) {
      status = 500;
      message = err;
    }

    res.status(status).json(message);
  });
};

const addOne = (req, res) => {
  const albumId = req?.params?.id;

  if (!mongoose.isValidObjectId(albumId)) {
    res.status(400).json({ message: process.env.CONTROLLER_ALBUM_ID_MSG });
    return;
  }

  album
    .findById(albumId)
    .select("songs")
    .exec((err, album) => {
      let status = 201;
      let message = "";
      if (err) {
        status = 500;
        message = err;
      } else if (!album) {
        status = 404;
        message = process.env.CONTROLLER_SONG_NOT_FOUND;
      }
      if (album) {
        console.log("asdasdasda", Object.keys(album), album);

        addSong(req, res, album);
      } else {
        res.status(status).json(message);
      }
    });
};

// const deleteOne = (req, res) => {
//   const id = req.params.id;

//   if (!mongoose.isValidObjectId(id)) {
//     res.status(400).json({ message: process.env.CONTROLLER_ALBUM_ID_MSG });
//     return;
//   }

//   album.deleteOne({ _id: id }).exec((err) => {
//     let status = 200;
//     let message = process.env.CONTROLLER_ALBUM_DELETED_SUCCESS;
//     if (err) {
//       status = 500;
//       message = err;
//     }
//     res.status(status).json({ message: message });
//   });
// };

module.exports = {
  getAll,
  //   getOne,
  addOne,
  //   deleteOne,
};
