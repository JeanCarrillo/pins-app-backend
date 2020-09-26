import * as multer from 'multer';
import * as fs from 'fs';

if (!fs.existsSync('public')) fs.mkdirSync('public');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public');
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

const upload = multer({ storage });

export { upload };
