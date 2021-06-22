import s3 from '../../connections/cdn';
import { ManagedUpload } from 'aws-sdk/clients/s3';
import multer from 'multer';
import logger from '../../loaders/logger';

const storage = multer.memoryStorage();
export const multerUpload = multer({ storage });

export const uploader = (file: Express.Multer.File, path?: string): void => {
  const uploadParams = {
    Bucket: 'wisjul21',
    Body: file.buffer,
    ACL: 'public-read',
    Key: path ? path : Date.now().toString(), // filename
    ContentType: file.mimetype,
  };

  s3.upload(uploadParams, (err: Error, _: ManagedUpload.SendData) => {
    if (err) {
      throw err;
    }
    logger.info(`${uploadParams.Key} has been uploaded`);
  });
};
