import multer from 'multer';
import aws from 'aws-sdk';
import config from '../config';

const storage = multer.memoryStorage();
export const uploader = multer({ storage });

const endpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
export const s3 = new aws.S3({
  endpoint,
  accessKeyId: config.AWS.KEY,
  secretAccessKey: config.AWS.SECRET,
});
