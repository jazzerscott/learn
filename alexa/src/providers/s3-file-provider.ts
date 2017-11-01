import { injectable } from 'inversify';
import * as AWS from 'aws-sdk';
import { BucketParams } from '../model/bucket-params';
const s3 = new AWS.S3()

@injectable()
export class S3FileProvider {
    getObject(bucketParams: BucketParams): Promise<AWS.S3.GetObjectOutput> {
        return new Promise<any>((resolve, reject) =>{
            s3.getObject(bucketParams, (err, data) => {
                if(err) {
                    reject(err);
                } else {
                    resolve(data);
                }
            });
        });
    }
}