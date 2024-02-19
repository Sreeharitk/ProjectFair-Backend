const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "./Uploads"); //since this will be working inside index.js we are using that given path in index.js point of view
  },
  filename: (req, file, callback) => {
    const filename = `image-${Date.now()}-${file.originalname}`; //setting the file name for each stored files(must be unique)
    callback(null, filename);
  },
});

const multerConfig = multer({
  storage,
});

module.exports = multerConfig;
