import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadFolder = path.resolve(__dirname,'..', '..', 'uploads');

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(req, file, callback) {
      const data = Date.now().toString();
      const filename = `${data}-${file.originalname}`;
      callback(null, filename);
    },
  }),
};
