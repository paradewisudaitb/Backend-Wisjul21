import aws from 'aws-sdk';
import config from '../config';

const endpoint = new aws.Endpoint('sgp1.digitaloceanspaces.com');
export default new aws.S3({
  endpoint,
  accessKeyId: config.AWS.KEY,
  secretAccessKey: config.AWS.SECRET,
});
