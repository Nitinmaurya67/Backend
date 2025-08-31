import multer from "multer"; // for handling multipart/form-data, primarily used for uploading files , helps to handle file uploads in express applications

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/temp"); // specify the destination directory for uploaded files
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const upload = multer({ 
    storage,
});