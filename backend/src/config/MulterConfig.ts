import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const tempFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 's3' | 'diskStorage';
  multer: {
    storage: multer.StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
  };

  directory: string;
}

export default {
  driver: process.env.STORAGE_DRIVER,
  directory: tempFolder,
  multer: {
    storage: multer.diskStorage({
      destination: tempFolder,
      filename(req, file, callback) {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;
        return callback(null, filename);
      },
    }),
  },
  config: {
    disk: {},
    aws: {
      bucket: 'lucca-gobarber',
    },
  },
} as IUploadConfig;
