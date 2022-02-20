const multer = require("multer");

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024, //5mb
    },
});

module.exports = fileUpload = upload.single("image");
