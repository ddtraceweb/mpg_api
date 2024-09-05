import { connect, Cluster, Bucket, Collection } from 'couchbase';
import dotenv from 'dotenv';

import logger from '../utils/logger.js';

let cluster: Cluster;
let bucket: Bucket;
let collection: Collection;

dotenv.config();

async function initializeCouchbase() {
  try {
    cluster = await connect(`couchbase://${process.env.DB_HOST}`, {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
    });

    bucket = cluster.bucket(process.env.DB_BUCKET as string);
    collection = bucket.defaultCollection();

    logger.info('Connected to Couchbase successfully');
  } catch (error) {
    logger.error('Error connecting to Couchbase:', { error });
    process.exit(1);
  }
}

initializeCouchbase();

export { cluster, bucket, collection };
