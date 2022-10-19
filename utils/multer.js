const multer = require('multer');

// set multer(trekking)
exports.trekkingMulter = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/trekking');
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '.jpg';
      cb(null, uniqueName);
    },
  });
  return multer({ storage: storage });
};

// set multer(tour)
exports.tourMulter = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/destination');
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '.jpg';
      cb(null, uniqueName);
    },
  });
  return multer({ storage: storage });
};

// set multer(News)
exports.newsMulter = () => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images/news');
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '.jpg';
      cb(null, uniqueName);
    },
  });
  return multer({ storage: storage });
};
