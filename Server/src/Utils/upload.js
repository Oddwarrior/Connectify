const multer = require('multer');

const storage = multer.diskStorage({
    // destination: function (req, file, cb) {
    //     cb(null, 'public/'); // Define the destination folder for uploaded files
    // },
    // filename: function (req, file, cb) {
    //     cb(null, Date.now() + '-' + file?.originalname); // Set the filename to be unique
    // }
});

const upload = multer({ storage: storage });

module.exports = upload;
