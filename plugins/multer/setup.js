const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB
}).fields([{ name: 'cardFront', maxCount: 1 }, { name: 'cardBack', maxCount: 1 }]);

module.exports = upload;
